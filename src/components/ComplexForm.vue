<template>
  <div>
    <h1 class="tw-text-5xl tw-text-neutral-900 tw-font-medium tw-mb-4">
      Добавление заявки
    </h1>
    <form @submit.prevent="onSubmit">
      <ComplexFormFirst />
      <ComplexFormPrimary />
      <ComplexFormPersonal />
      <ComplexFormAngel />
      <ComplexFormBuilding />
      <ComplexFormUpload />
      <ComplexFormNotifyMethod />
      <ComplexFormGetMethod />
      <AppFormSection>
        <AppButton type="submit">Отправить</AppButton>
      </AppFormSection>
    </form>
  </div>
</template>

<script>
import ComplexFormFirst from '@/components/ComplexFormFirst';
import ComplexFormPrimary from '@/components/ComplexFormPrimary';
import ComplexFormPersonal from '@/components/ComplexFormPersonal';
import ComplexFormAngel from '@/components/ComplexFormAngel';
import ComplexFormBuilding from '@/components/ComplexFormBuilding';
import ComplexFormGetMethod from '@/components/ComplexFormGetMethod';
import ComplexFormNotifyMethod from '@/components/ComplexFormNotifyMethod';
import ComplexFormUpload from '@/components/ComplexFormUpload';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const initialValues = getInitVals();

    const { values, validate, handleSubmit } = useForm({
      initialValues,
    });

    const scrollToFirstError = (errors) => {
      const errList = Object.keys(errors);
      if (errList.length <= 0) return;
      const el = document.getElementById(errList[0]);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth' });
    };

    const perform = handleSubmit(async (values) => {
      const data = await store.dispatch('complexForm/create', { data: values });
      console.log(data);
      alert('success');
    });

    const onSubmit = async () => {
      const { errors, valid } = await validate();
      if (!valid) return scrollToFirstError(errors);
      perform();
    };

    return {
      onSubmit,
    };
  },
  components: {
    ComplexFormFirst,
    ComplexFormPrimary,
    ComplexFormPersonal,
    ComplexFormAngel,
    ComplexFormBuilding,
    ComplexFormNotifyMethod,
    ComplexFormGetMethod,
    ComplexFormUpload,
  },
};

function getInitVals() {
  return {
    t: '',
    dogovor: 'complex',
    primary: getPrimary(),
    profile: getProfile(),
    angel: getAngel(),
    building: getBuilding(),
    notifyMethod: getNotifyMethod(),
    upload: getUpload(),
    getMethod: getMethod(),
  };
}

function getAddress() {
  return {
    city: '',
    street: '',
    building: '',
    flat: '',
  };
}

function getPassport() {
  return {
    type: { label: 'Паспорт гражданина РФ', value: 'RF' },
    serial: '',
    number: '',
    kod: '',
    who: '',
    date: '',
  };
}

function getContacts() {
  return {
    fax: '',
    email: '',
    phone1: '',
    phone2: '',
  };
}

function getFio() {
  return {
    lastname: '',
    name: '',
    patronymic: '',
  };
}

function getPrimary() {
  return {
    purpose: { label: 'Первичное подключение', value: '3' },
    hasCalc: { label: 'Нет', value: 'No' },
    plan: { label: 'Не знаю', value: '?' },
    gasLoose: '',
    hasTu: { label: 'Нет', value: 'No' },
    tu: {
      number: '',
      date: '',
    },
  };
}

function getProfile() {
  return {
    type: { label: 'Юридическое лицо', value: '2' },
    people: {
      inn: '',
      passport: getPassport(),
      address: getAddress(),
      ...getFio(),
      ...getContacts(),
    },
    companies: {
      kpp: '',
      ogrn: '',
      shortName: '',
      fullName: '',
      inn: '',
      gasPotreb: { label: 'Коммерческие цели', value: 'commerc' },
      okved: '',
      address: getAddress(),
      passport: getPassport(),
      ...getContacts(),
    },
  };
}

function getAngel() {
  return {
    uncommerc: { label: 'Нет', value: 'No' },
    dov: { label: 'Нет', value: 'No' },
    dovData: {
      number: '',
      until: '',
      date: '',
    },
    address: getAddress(),
    passport: getPassport(),
    ...getFio(),
    ...getContacts(),
  };
}

function getBuilding() {
  return {
    name: '',
    type: { label: 'Индивидуальное жилищное строительство', value: '1' },
    number: '',
    address: getAddress(),
    input: { label: 'Объект построен', value: '1' },
    inputDate: '',
    inputDateAbout: '',
    plan: [''],
    max: [''],
    steps: [{ plan: '', date: '' }],
    s1: { label: 'Нет', value: 'No' },
    s2: { label: 'Нет', value: 'No' },
    s3: { label: 'Нет', value: 'No' },
    s4: { label: 'Нет', value: 'No' },
    s5: { label: 'Да', value: 'Yes' },
    s6: { label: 'Нет', value: 'No' },
  };
}

function getUpload() {
  return {
    s1: null,
    s2: null,
    s3: null,
    s4: null,
    s5: null,
    s6: null,
    s7: null,
    s8: null,
    s9: null,
    s10: null,
    s11: null,
  };
}

function getMethod() {
  return {
    type: { label: 'По почте', value: '1' },
    address: getAddress(),
    comment: '',
    attached: null,
  };
}

function getNotifyMethod() {
  return {
    sms: false,
    email: false,
    phone: '',
    emailAddress: '',
  };
}
</script>
