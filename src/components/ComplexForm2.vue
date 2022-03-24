<template>
  <div>
    <h1 class="tw-text-5xl tw-text-neutral-900 tw-font-medium tw-mb-4">
      Добавление заявки
    </h1>
    <form>
      <ComplexForm2First />
      <ComplexForm2Personal />
      <ComplexForm2Angel />
      <ComplexForm2Building />
      <ComplexForm2Upload />
      <ComplexFormAdditional />
      <ComplexFormNotifyMethod />
      <ComplexFormGetMethod />
      <AppFormSection>
        <div class="tw-flex tw-space-x-3">
          <AppButton @click="submitModal = true">Отправить</AppButton>
          <AppButton @click="onSubmit({ is_draft: 1 })">Сохранить черновик</AppButton>
          <AppButton @click="onSubmit({ is_draft: 1, is_sign: 1 })">Сформировать проект заявки</AppButton>
          <a href="http://mrg.danat.su/preconditionsrequests/techconnection/" alt="закрыть">
            <AppButton>Закрыть</AppButton>
          </a>
        </div>
      </AppFormSection>
    </form>
    <AppModal v-model="submitModal">
      <div class="tw-text-3xl tw-mb-6">Вы хотите подписать заявку с помощью электронной подписи?</div>
      <div class="tw-mb-4">
        Если вы выберете "Да", Вам понадобится электронная подпись.
        Если вы выберете "Нет", после отправки Вам необходимо прийти в офис лично и подписать заявку.
      </div>
      <div class="tw-flex tw-space-x-3">
        <AppButton class="tw-w-1/3" @click="onSubmit({ is_sign: 1 })">Да</AppButton>
        <AppButton class="tw-w-1/3" @click="onSubmit">Нет</AppButton>
        <AppButton class="tw-w-1/3" @click="submitModal = false">Отмена</AppButton>
      </div>
    </AppModal>
    <teleport to="body">
      <div v-if="loading" style="z-index: 99999" class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
        <div class=" tw-text-5xl tw-text-white">Идёт отправка, подождите...</div>
      </div>
    </teleport>
  </div>
</template>

<script>
import ComplexForm2First from '@/components/ComplexForm2First';
import ComplexForm2Personal from '@/components/ComplexForm2Personal';
import ComplexForm2Angel from '@/components/ComplexForm2Angel';
import ComplexForm2Building from '@/components/ComplexForm2Building';
import ComplexFormGetMethod from '@/components/ComplexFormGetMethod';
import ComplexFormNotifyMethod from '@/components/ComplexFormNotifyMethod';
import ComplexForm2Upload from '@/components/ComplexForm2Upload';
import ComplexFormAdditional from '@/components/ComplexFormAdditional';

import flatten from 'flat';
import useEmail from '@/compositions/useEmail';
import { useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { nextTick, ref } from 'vue';
import complexFormData2 from '@/test/complexFormData2';

export default {
  setup() {
    const loading = ref(false);
    const submitModal = ref(false);
    const store = useStore();
    const initialValues = getInitVals();

    const { values, validate, setErrors, resetForm, setFieldValue } = useForm();

    nextTick(() => {
      resetForm({ values: initialValues });
    });

    const { getEmail } = useEmail();
    getEmail(email => {
      const fields = ['personal_data.email', 'proxy_data.email'];
      fields.forEach(field => setFieldValue(field, email));
    });

    const scrollToFirstError = (errors) => {
      const errList = Object.keys(errors);
      if (errList.length <= 0) return;
      const el = document.getElementById(errList[0]);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth' });
    };

    const onSubmit = async ({
      is_draft = 0,
      is_sign = 0,
      is_letter = 0,
      request_id = 0
    }) => {

      if(is_draft === 0) {
        const { errors, valid } = await validate();
        if (!valid) return scrollToFirstError(errors);
      }

      const perform = async () => {
        loading.value = true;

        const data = await store.dispatch('complexForm/create',
          { social: true, data: values, meta: { is_draft, is_sign, is_letter, request_id } }
        );

        if (!Array.isArray(data.errors)) {
          const errors = flatten(data.errors);
          setErrors(errors)
          scrollToFirstError(errors);
        } else {
          console.log(data);
          submitModal.value = false;
          alert('Форма успешно отправлена');
        }

        loading.value = false;
      };


      perform();
    };

    return {
      onSubmit,
      submitModal,
      loading
    };
  },
  components: {
    ComplexForm2First,
    ComplexForm2Personal,
    ComplexForm2Angel,
    ComplexForm2Building,
    ComplexFormNotifyMethod,
    ComplexFormGetMethod,
    ComplexForm2Upload,
    ComplexFormAdditional
  },
};

function getInitVals() {
  return {
    comment: '',
    files: null,
    contract_kind: { tp_contract_kind_radio: '1' },
    primary_information: getPrimary(),
    personal_data: getProfile(),
    proxy_data: getAngel(),
    object_data: getBuilding(),
    notifications_receiving: getNotifyMethod(),
    documents_obtaining: getObtaining(),
    documents_upload: getUpload(),
  };
}

function getAddress() {
  return {
    city: '',
    street: '',
    house: '',
    flat: '',
  };
}

function getPassport() {
  return {
    document_type: '1',
    document_series: '',
    document_id: '',
    division_code: '',
    issued_by: '',
    document_date_issue: '',
  };
}

function getContacts() {
  return {
    fax: '',
    email: '',
    phone_number_1: '',
    phone_number_2: '',
  };
}

function getFio() {
  return {
    last_name: '',
    name: '',
    second_name: '',
  };
}

function getPrimary() {
  return {
    add1: false,
    add2: false,
    add3: false,
    add4: false,
    add5: false,
    add6: false,
    add7: false,
  };
}

function getProfile() {
  return {
    inn: '',
    soc: '',
    mailing_address: getAddress(),
    ...getFio(),
    ...getContacts(),
    ...getPassport(),
  };
}

function getAngel() {
  return {
    proxy: '1',
    proxy_date: '',
    proxy_end: '',
    mailing_address: getAddress(),
    ...getPassport(),
    ...getFio(),
    ...getContacts(),
  };
}

function getBuilding() {
  return {
    name: '',
    cadastral_number: '',
    cadastral_numberigs: '',
    address: getAddress(),
    connection_points: [{ point: '1', value: '' }]
  };
}

function getObtaining() {
  return {
    obtaining_method: '1',
    mailing_address: getAddress(),
  };
}

function getUpload() {
  return {
    inn: null,
    snils: null,
    identity_document_prav: null,
    identity_document_prav_igz: null,
    situational_plan: null,
    land_documents: null,
    proxy: null,
  };
}

function getNotifyMethod() {
  return {
    sms_checkbox: false,
    email_checkbox: false,
    sms: '',
    email: '',
  };
}
</script>
