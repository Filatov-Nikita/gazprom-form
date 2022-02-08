<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="ecpu">Выберите ЕЦПУ</label>
      <select required id="ecpu" name="ecpu" v-model="ecpuModel">
        <option value="" key="default">Выберите ецпу</option>
        <option v-for="opt in ecpuOpts" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <template v-if="showDates">
        <label for="date">Выберите дату</label>
        <select required id="date" name="date" v-model="dateModel">
          <option value="" key="default">Выберите дату</option>
          <option
            v-for="item in dateOpts"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </template>

      <template v-if="showServices">
        <label for="service1">Выберите Услугу</label>
        <select required id="service1" name="service1" v-model="serviceModel">
          <option value="" key="default">Выберите услугу</option>
          <option
            v-for="item in serviceOpts"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </template>
      <!-- <select name="service2"></select> -->

      <template v-if="showTimes">
        <label for="time">Выберите время</label>
        <select required id="time" v-model="timeModel">
          <option value="" key="default">Выберите время</option>
          <option
            v-for="time in times"
            :key="time"
            :value="time"
            :disabled="isBooking(time)"
          >
            {{ time }}
          </option>
        </select>
      </template>

      <label for="fio">ФИО</label>
      <input required name="fio" id="fio" type="text" v-model="nameModel" />

      <label for="cellphone">Телефон</label>
      <input
        v-mask="'+7(###) ### ##-##'"
        required
        name="cellphone"
        id="cellphone"
        type="text"
        v-model="cellphoneModel"
      />

      <label for="email">Адрес электронной почты</label>
      <input
        required
        name="email"
        id="email"
        type="email"
        v-model="emailModel"
      />
      <button type="submit">Записаться</button>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export default {
  directives: { mask },
  created() {
    this.getEcpu();
  },
  data() {
    return {
      base: 'http://mrg.danat.su/services/priem/api/',
      ecpu: null,
      services: null,
      dates: null,
      bookingTimes: null,
      times: this.getTimes(),
      ecpuModel: '',
      serviceModel: '',
      dateModel: '',
      timeModel: '',
      nameModel: '',
      cellphoneModel: '',
      emailModel: '',
    };
  },
  watch: {
    ecpuModel(ecpuId) {
      if (ecpuId) {
        Promise.all([this.getServices(ecpuId), this.getDates(ecpuId)]);
      }

      this.dateModel = '';
      this.serviceModel = '';
    },
    dateModel(date) {
      if (this.showDates && date) {
        this.getBookingTimes(this.ecpuModel, date);
      }

      this.timeModel = '';
    },
    showServices(val) {
      if (!val) {
        this.services = null;
        this.serviceModel = '';
      }
    },
    showDates(val) {
      if (!val) {
        this.dates = null;
        this.dateModel = '';
      }
    },
    showTimes(val) {
      if (!val) {
        this.bookingTimes = null;
        this.timeModel = '';
      }
    },
  },
  computed: {
    ecpuOpts() {
      if (!this.ecpu) return [];
      return this.ecpu.map((item) => ({
        label: item.name + ' ' + item.adress,
        value: item.id,
      }));
    },
    serviceOpts() {
      if (!this.services) return [];
      return this.services.map((item) => ({
        label: item,
        value: item,
      }));
    },
    dateOpts() {
      if (!this.dates) return [];
      return this.getDateRange(this.dates);
    },
    showServices() {
      return this.ecpuModel;
    },
    showDates() {
      return this.ecpuModel;
    },
    showTimes() {
      return this.showDates && this.dateModel && this.bookingTimes;
    },
  },
  methods: {
    getDateRange(filter = []) {
      let current = new Date();
      const dates = [];

      for (let i = 0; i < 30; i++) {
        const pretty = this.getPrettyDate(current);
        const weekDay = current.getDay();
        current.setDate(current.getDate() + 1);

        const isAdding = filter.find((fItem) => fItem.type === '56' && fItem.date === pretty.value) !== undefined;
        const isRemoving = filter.find((fItem) => fItem.type === '57' && fItem.date === pretty.value) !== undefined;

        if(weekDay === 0 || weekDay === 6) {
          if(!isAdding) continue;
        }

        if(isRemoving) continue;

        dates.push(pretty);
      }

      return dates;
    },
    formatDateVal(val) {
      return val < 10 ? `0${val}` : val;
    },
    getPrettyDate(date) {
      const dateStr = `${this.formatDateVal(
        date.getDate()
      )}.${this.formatDateVal(date.getMonth() + 1)}.${date.getFullYear()}`;

      return { label: `${weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1]} ${dateStr}`, value: dateStr };
    },
    async getEcpu() {
      const url = new URL('ecpu_list.php', this.base);
      const result = await fetch(url);
      const data = await result.json();
      this.ecpu = data;
    },
    async getServices(ecpuId) {
      const url = new URL('services_in_ecpu.php', this.base);
      url.searchParams.append('id', ecpuId);
      const result = await fetch(url);
      const data = await result.json();
      this.services = data[0].services;
    },
    async getDates(ecpuId) {
      const url = new URL('additional_dates_in_ecpu.php', this.base);
      url.searchParams.append('id', ecpuId);
      const result = await fetch(url);
      const data = await result.json();
      this.dates = data;
    },
    async getBookingTimes(ecpuId, date) {
      const url = new URL('booking_ecpu_on_date.php', this.base);
      url.searchParams.append('ecpu', ecpuId);
      url.searchParams.append('date', date);
      const result = await fetch(url);
      const data = await result.json();
      this.bookingTimes = data.map((item) => item.time_booked);
      // this.bookingTimes = ['08:30'];
    },
    getTimes() {
      return [
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
      ];
    },
    isBooking(time) {
      if (!this.bookingTimes) return true;
      return this.bookingTimes.includes(time);
    },
    onSubmit() {
      const body = {
        ecpu: this.ecpuModel,
        service: this.serviceModel,
        date: this.dateModel,
        time: this.timeModel,
        name: this.nameModel,
        email: this.emailModel,
        cellphone: this.cellphoneModel,
      };

      console.log(body);
    },
  },
};
</script>
