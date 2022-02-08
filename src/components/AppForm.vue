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
            v-for="item in service1Opts"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </template>
      <template v-if="showServices2">
        <select required id="service2" name="service2" v-model="service2Model">
          <option value="" key="default">Выберите услугу</option>
          <option
            v-for="item in service2Opts"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </template>

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
      <AppModal v-model="dialog">
        <p>
          Вы записаны на прием Ваша запись в УЦПУ по адресу
          {{ curEcpu[ecpuModel]?.label }} {{ curDate[dateModel]?.label }} в
          время {{ timeModel }} подтверждена Обратите внимание, что вам может
          позвонить оператор для уточнения деталей. Чтобы получить талон на
          прием необходимо ввести код подтверждения в терминале электронной
          очереди. Код подтверждения: {{ finish.code }} Запись на прием:
          {{ curDate[dateModel]?.label }} {{ timeModel }}
        </p>
        <button @click="dialog = false">Закрыть</button>
      </AppModal>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import { getPrettyDate, getDayOfYear, getTimes, isHoliday } from '@/helpers';
import AppModal from './AppModal.vue';

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
      times: getTimes(),
      ecpuModel: '',
      serviceModel: '',
      service2Model: '',
      dateModel: '',
      timeModel: '',
      nameModel: '',
      cellphoneModel: '',
      emailModel: '',
      dialog: false,
      finish: {
        code: null,
        body: null,
      },
    };
  },
  watch: {
    ecpuModel(ecpuId) {
      if (ecpuId) {
        Promise.all([, /* this.getServices(ecpuId) */ this.getDates(ecpuId)]);
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
    serviceModel() {
      this.service2Model = '';
    },
    showServices(val) {
      if (!val) {
        this.services = null;
        this.serviceModel = '';
      }
    },
    showServices2(val) {
      if (!val) {
        this.service2Model = '';
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
    curEcpu() {
      return this.ecpuOpts.reduce((acc, item) => {
        acc[item.value] = item;
        return acc;
      }, {});
    },
    curDate() {
      return this.dateOpts.reduce((acc, item) => {
        acc[item.value] = item;
        return acc;
      }, {});
    },
    ecpuOpts() {
      if (!this.ecpu) return [];
      return this.ecpu.map((item) => ({
        label: item.name + ' ' + item.adress,
        value: item.id,
      }));
    },
    service1Opts() {
      return [
        { label: 'Газификация', value: 'gaz' },
        { label: 'Газоснабжение', value: 'gazsnab' },
        { label: 'Прочее', value: 'other' },
      ];
    },
    service2Opts() {
      if (!this.serviceModel) return [];
      const items = getService2();
      return items[this.serviceModel];
    },
    servicePivot() {
      return getServicePivot();
    },
    dateOpts() {
      if (!this.dates) return [];
      return this.getDateRange();
    },
    showServices() {
      return this.ecpuModel;
    },
    showServices2() {
      return this.showServices && this.serviceModel;
    },
    showDates() {
      return this.ecpuModel;
    },
    showTimes() {
      return this.showDates && this.dateModel && this.bookingTimes;
    },
    daysInclude() {
      if (!this.dates) return [];
      return this.dates
        .filter((date) => date.type === '56')
        .map((date) => date.date);
    },
    daysExclude() {
      if (!this.dates) return [];
      return this.dates
        .filter((date) => date.type === '57')
        .map((date) => date.date);
    },
  },
  methods: {
    getDateRange() {
      let current = new Date();
      const dates = [];

      for (let i = 0; i < 30; i++) {
        let skip = false;
        const weekday = current.getDay();
        const pretty = getPrettyDate(current);

        if (this.daysExclude.includes(pretty.value)) skip = true;
        if (isHoliday(weekday) && !this.daysInclude.includes(pretty.value))
          skip = true;

        if (!skip) dates.push(pretty);

        current.setDate(current.getDate() + 1);
      }

      return dates;
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
    },
    isBooking(time) {
      if (!this.bookingTimes) return true;
      return this.bookingTimes.includes(time);
    },
    getCode() {
      const ecpu = this.ecpu.find((item) => item.id === this.ecpuModel);

      if (!ecpu) return '';

      const ecpuNumber = ecpu.kod.substring(2);
      const dayOfYear = getDayOfYear(this.dateModel);

      let timeIndex = this.times.findIndex((t) => t === this.timeModel);
      if (timeIndex === -1) return '';
      timeIndex =
        timeIndex > 99
          ? timeIndex
          : timeIndex < 10
          ? `00${timeIndex}`
          : `0${timeIndex}`;

      return ecpuNumber + dayOfYear + timeIndex;
    },
    onSubmit() {
      this.dialog = true;

      const serviceKey = this.serviceModel + '-' + this.service2Model;
      const body = {
        ecpu: this.ecpuModel,
        service: this.servicePivot[serviceKey],
        date: this.dateModel,
        time: this.timeModel,
        name: this.nameModel,
        email: this.emailModel,
        cellphone: this.cellphoneModel,
      };

      this.finish.code = this.getCode();
      this.finish.body = body;

      console.log(body);
    },
  },
  components: {
    AppModal,
  },
};

function getService2() {
  return {
    gaz: [
      {
        label: 'Физические лица',
        value: 1,
      },
      {
        label: 'Юридические лица',
        value: 2,
      },
      {
        label: 'Газификация под ключ',
        value: 3,
      },
      {
        label: 'Выдача готовых документов (ГРО)',
        value: 4,
      },
    ],
    gazsnab: [
      {
        label: 'Заключение договора на поставку газа',
        value: 5,
      },
      {
        label: 'Заключение договора на техническое обслуживание',
        value: 6,
      },
      {
        label: 'Расчеты на газ',
        value: 7,
      },
      {
        label: 'Опломбировка приборов учета газа',
        value: 8,
      },
      {
        label: 'Выдача готовых документов (РГК)',
        value: 9,
      },
    ],
    other: [
      {
        label: 'Установка, замена приборов учета газа',
        value: 10,
      },
      {
        label: 'Прочие работы и услуги',
        value: 11,
      },
      {
        label: 'Касса',
        value: 12,
      },
    ],
  };
}

function getServicePivot() {
  return {
    'gaz-1': 44,
    'gaz-2': 45,
    'gaz-3': 46,
    'gaz-4': 47,
    'gazsnab-5': 48,
    'gazsnab-6': 49,
    'gazsnab-7': 50,
    'gazsnab-8': 51,
    'gazsnab-9': 52,
    'other-10': 53,
    'other-11': 54,
    'other-12': 55,
  };
}
</script>
