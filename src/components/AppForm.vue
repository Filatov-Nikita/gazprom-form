<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="flex-select">
        <label class="lb1" for="ecpu">Выберите ЕЦПУ</label>
        <div class="sel">
          <select
            class="select-services"
            required
            id="ecpu"
            name="ecpu"
            v-model="ecpuModel"
          >
            <option value="" key="default">Выберите ецпу</option>
            <option v-for="opt in ecpuOpts" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>

      <template v-if="showDates">
        <div class="flex-select">
          <label class="lb1" for="date">Выберите дату</label>
          <div class="sel">
            <select
              class="select-services"
              required
              id="date"
              name="date"
              v-model="dateModel"
            >
              <option value="" key="default">Выберите дату</option>
              <option
                v-for="item in dateOpts"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>
      </template>

      <template v-if="showServices">
        <div class="flex-select">
          <label class="lb1" for="service1">Выберите Услугу</label>
          <div class="sel">
            <select
              class="select-services"
              required
              id="service1"
              name="service1"
              v-model="serviceModel"
            >
              <option value="" key="default">Выберите услугу</option>
              <option
                v-for="item in service1Opts"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>
      </template>
      <template v-if="showServices2">
        <div class="flex-select">
          <label class="lb1" for="service1"></label>
          <div class="sel">
            <select
              class="select-services"
              required
              id="service2"
              name="service2"
              v-model="service2Model"
            >
              <option value="" key="default">Выберите услугу</option>
              <option
                v-for="item in service2Opts"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>
      </template>

      <template v-if="showTimes">
        <div class="flex-select">
          <label class="lb1" for="time">Выберите время</label>
          <div class="sel">
            <select
              class="select-services"
              required
              id="time"
              v-model="timeModel"
            >
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
          </div>
        </div>
      </template>
      <div class="flex-select">
        <label class="lb1" for="fio">ФИО</label>
        <input
          class="input input--list"
          required
          name="fio"
          id="fio"
          type="text"
          v-model="nameModel"
        />
      </div>
      <div class="flex-select">
        <label class="lb1" for="cellphone">Телефон</label>
        <input
          class="input input--list"
          v-mask="'+7(###) ### ##-##'"
          required
          name="cellphone"
          id="cellphone"
          type="text"
          v-model="cellphoneModel"
        />
      </div>
      <div class="flex-select">
        <label class="lb1" for="email">Адрес электронной почты</label>
        <input
          class="input input--list"
          required
          name="email"
          id="email"
          type="email"
          v-model="emailModel"
        />
      </div>
      <br />
      <button class="button button--color" type="submit">Записаться</button>
      <AppModal v-model="dialog">
        <div class="okno">
          <h2>Вы записаны на прием</h2>
          <div style="clear: both"></div>
          <p>
            Ваша запись в УЦПУ по адресу
            <span id="ad1"
              >{{ curEcpu[ecpuModel]?.label }}
              {{ curDate[dateModel]?.label }}</span
            >
            в время <span id="ad2">{{ timeModel }}</span> подтверждена
          </p>
          <p>
            Обратите внимание, что вам может позвонить оператор для уточнения
            деталей.
          </p>
          <p>
            Чтобы получить талон на прием необходимо ввести код подтверждения в
            терминале электронной очереди.
          </p>
          <h2>
            Код подтверждения: <span id="ad3">{{ finish.code }}</span>
          </h2>
          <h3>
            Запись на прием:
            <span id="ad4">{{ curDate[dateModel]?.label }}</span>
            <span id="ad5">&nbsp;{{ timeModel }}</span>
          </h3>
          <a class="close" @click="closeDialog">Закрыть</a>
        </div>
      </AppModal>
    </form>
  </div>
</template>
<!-- /public_html/local/templates/gas/css window.location.reload() -->

<script>
import { mask } from "vue-the-mask";
import { getPrettyDate, getDayOfYear, getTimes, isHoliday } from "@/helpers";
import AppModal from "./AppModal.vue";

export default {
  directives: { mask },
  created() {
    this.getEcpu();
  },
  data() {
    return {
      base: "http://mrg.danat.su/services/priem/api/",
      ecpu: null,
      services: null,
      dates: null,
      bookingTimes: null,
      times: getTimes(),
      ecpuModel: "",
      serviceModel: "",
      service2Model: "",
      dateModel: "",
      timeModel: "",
      nameModel: "",
      cellphoneModel: "",
      emailModel: "",
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
        Promise.all([this.getServices(ecpuId), this.getDates(ecpuId)]);
      }

      this.dateModel = "";
      this.serviceModel = "";
    },
    dateModel(date) {
      if (this.showDates && date) {
        this.getBookingTimes(this.ecpuModel, date);
      }

      this.timeModel = "";
    },
    serviceModel() {
      this.service2Model = "";
    },
    showServices(val) {
      if (!val) {
        this.services = null;
        this.serviceModel = "";
      }
    },
    showServices2(val) {
      if (!val) {
        this.service2Model = "";
      }
    },
    showDates(val) {
      if (!val) {
        this.dates = null;
        this.dateModel = "";
      }
    },
    showTimes(val) {
      if (!val) {
        this.bookingTimes = null;
        this.timeModel = "";
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
        label: item.name + " " + item.adress,
        value: item.id,
      }));
    },
    service1Opts() {
      return [
        { label: "Газификация", value: "gaz" },
        { label: "Газоснабжение", value: "gazsnab" },
        { label: "Прочее", value: "other" },
      ];
    },
    service2Opts() {
      if (!this.serviceModel) return [];
      const items = getService2();
      let newItems = this.services.map((i) => {
        for (let key in this.servicePivot) {
          if (i == this.servicePivot[key]) return key;
        }
      });
      let arr = [];
      newItems.map((i) => {
        let first = i.split("-")[0];
        let last = i.split("-")[1];
        if (this.serviceModel == first) {
          arr.push(items[first].find((j) => j.value == last));
        }
      });
      return arr;

      // return items[this.serviceModel];
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
        .filter((date) => date.type === "56")
        .map((date) => date.date);
    },
    daysExclude() {
      if (!this.dates) return [];
      return this.dates
        .filter((date) => date.type === "57")
        .map((date) => date.date);
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      window.location.reload();
    },
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
      const url = new URL("ecpu_list.php", this.base);
      const result = await fetch(url);
      const data = await result.json();
      this.ecpu = data;
    },
    async getServices(ecpuId) {
      const url = new URL("services_in_ecpu.php", this.base);
      url.searchParams.append("id", ecpuId);
      const result = await fetch(url);
      const data = await result.json();

      this.services = data[0].services;
    },
    async getDates(ecpuId) {
      const url = new URL("additional_dates_in_ecpu.php", this.base);
      url.searchParams.append("id", ecpuId);
      const result = await fetch(url);
      const data = await result.json();
      this.dates = data;
    },
    async getBookingTimes(ecpuId, date) {
      const url = new URL("booking_ecpu_on_date.php", this.base);
      url.searchParams.append("ecpu", ecpuId);
      url.searchParams.append("date", date);
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

      if (!ecpu) return "";

      const ecpuNumber = ecpu.kod.substring(2);
      const dayOfYear = getDayOfYear(this.dateModel);

      let timeIndex = this.times.findIndex((t) => t === this.timeModel);
      if (timeIndex === -1) return "";
      timeIndex =
        timeIndex > 99
          ? timeIndex
          : timeIndex < 10
          ? `00${timeIndex}`
          : `0${timeIndex}`;

      return ecpuNumber + dayOfYear + timeIndex;
    },
    async onSubmit() {
      this.dialog = true;
      this.finish.code = this.getCode();
      this.finish.body = body;
      const url = new URL("http://mrg.danat.su/services/priem/send_to_db.php");
      url.searchParams.append(
        "Col_depart",
        this.ecpu.find((i) => i.id == this.ecpuModel).kod
      );
      url.searchParams.append("col_usluga", this.service2Model);
      url.searchParams.append("col_suokey", this.cellphoneModel);
      url.searchParams.append("col_code", this.finish.code);
      url.searchParams.append("col_email", this.emailModel);
      url.searchParams.append("col_ctime", `${this.timeModel}:00`);
      url.searchParams.append(
        "col_cdate",
        this.dateModel.split(".").reverse().join("-")
      );
      const result = await fetch(url);
      const data = await result.json();

      const serviceKey = this.serviceModel + "-" + this.service2Model;
      const body = {
        ecpu: this.ecpuModel,
        service: this.servicePivot[serviceKey],
        date: this.dateModel,
        time: this.timeModel,
        name: this.nameModel,
        email: this.emailModel,
        cellphone: this.cellphoneModel,
      };

      // this.ecpu = data;

      console.log(data);
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
        label: "Физические лица",
        value: 1,
      },
      {
        label: "Юридические лица",
        value: 2,
      },
      {
        label: "Газификация под ключ",
        value: 3,
      },
      {
        label: "Выдача готовых документов (ГРО)",
        value: 4,
      },
    ],
    gazsnab: [
      {
        label: "Заключение договора на поставку газа",
        value: 5,
      },
      {
        label: "Заключение договора на техническое обслуживание",
        value: 6,
      },
      {
        label: "Расчеты на газ",
        value: 7,
      },
      {
        label: "Опломбировка приборов учета газа",
        value: 8,
      },
      {
        label: "Выдача готовых документов (РГК)",
        value: 9,
      },
    ],
    other: [
      {
        label: "Установка, замена приборов учета газа",
        value: 10,
      },
      {
        label: "Прочие работы и услуги",
        value: 11,
      },
      {
        label: "Касса",
        value: 12,
      },
    ],
  };
}

function getServicePivot() {
  return {
    "gaz-1": 44,
    "gaz-2": 45,
    "gaz-3": 46,
    "gaz-4": 47,
    "gazsnab-5": 48,
    "gazsnab-6": 49,
    "gazsnab-7": 50,
    "gazsnab-8": 51,
    "gazsnab-9": 52,
    "other-10": 53,
    "other-11": 54,
    "other-12": 55,
  };
}
</script>
<style scoped>
.flex-select {
  display: flex;
}
.okno {
  height: 400px;
  text-align: center;
  padding: 40px;
  color: #000000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: #fff;
  z-index: 998;
}
</style>
