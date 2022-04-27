<template>
  <ComplexFormLayout>
    <form>
      <ComplexForm2First />
      <ComplexForm2Personal />
      <ComplexForm2Angel />
      <ComplexForm2Building />
      <ComplexForm2Upload />
      <ComplexFormAdditional />
      <ComplexFormNotifyMethod />
      <ComplexFormGetMethod />
      <ComplexFormToolbar @submit="onSubmit" @showModal="submitModal = true"/>
    </form>
    <AppModal v-model="submitModal">
      <ComplexFormModal @submit="onSubmit" @hideModal="submitModal = false" />
    </AppModal>
    <ComplexFormLetter social />
    <AppLoading :showing="loading" />
  </ComplexFormLayout>
</template>

<script>
import useComplexForm from '@/compositions/useComplexForm';
// import complexFormData2 from '@/test/complexFormData2';

export default {
  setup() {
    const initialValues = getInitVals();
    const { onSubmit, submitModal, loading } = useComplexForm(initialValues, { social: true });

    return {
      onSubmit,
      submitModal,
      loading
    };
  },
  components: {
    ComplexForm2First: require('@/components/ComplexForm2First').default,
    ComplexForm2Personal: require('@/components/ComplexForm2Personal').default,
    ComplexForm2Angel: require('@/components/ComplexForm2Angel').default,
    ComplexForm2Building: require('@/components/ComplexForm2Building').default,
    ComplexFormNotifyMethod: require('@/components/ComplexFormNotifyMethod').default,
    ComplexFormGetMethod: require('@/components/ComplexFormGetMethod').default,
    ComplexForm2Upload: require('@/components/ComplexForm2Upload').default,
    ComplexFormAdditional: require('@/components/ComplexFormAdditional').default,
    ComplexFormLayout: require('@/components/ComplexFormLayout').default,
    ComplexFormToolbar: require('@/components/ComplexFormToolbar').default,
    ComplexFormModal: require('@/components/ComplexFormModal').default,
    ComplexFormLetter: require('@/components/ComplexFormLetter').default
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
    ownership_type: '1',
    add1: false,
    add2: false,
    add3: false,
    add4: false,
    add5: false,
    add6: false,
    add7: false,
    uploadedFiles: null
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
    mchrg_stages: [{ point: '1', value: '' }]
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
    registration_inn_kpp_certificate: null,
    snils: null,
    identity_document_prav: null,
    identity_document_prav_igz: null,
    situational_plan: null,
    mchrg_calculation: null,
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
