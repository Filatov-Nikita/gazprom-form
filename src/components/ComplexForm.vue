<template>
  <ComplexFormLayout>
    <form>
      <ComplexFormFirst />
      <ComplexFormPrimary @save="onSubmit({ is_draft: 1 })" />
      <ComplexFormPersonal />
      <ComplexFormAngel />
      <ComplexFormBuilding />
      <ComplexFormUpload />
      <ComplexFormAdditional />
      <ComplexFormNotifyMethod />
      <ComplexFormGetMethod />
      <ComplexFormToolbar @submit="onSubmit" @showModal="submitModal = true"/>
    </form>
    <AppModal v-model="submitModal">
      <ComplexFormModal @submit="onSubmit" @hideModal="submitModal = false" />
    </AppModal>
    <ComplexFormLetter />
    <AppLoading :showing="loading" />
  </ComplexFormLayout>
</template>

<script>
import useComplexForm from '@/compositions/useComplexForm';
// import complexFormData from '@/test/complexFormData';

export default {
  setup() {
    const initialValues = getInitVals();
    const { onSubmit, submitModal, loading } = useComplexForm(initialValues);

    return {
      onSubmit,
      submitModal,
      loading
    };
  },
  components: {
    ComplexFormFirst: require('@/components/ComplexFormFirst').default,
    ComplexFormPrimary: require('@/components/ComplexFormPrimary').default,
    ComplexFormPersonal: require('@/components/ComplexFormPersonal').default,
    ComplexFormAngel: require('@/components/ComplexFormAngel').default,
    ComplexFormBuilding: require('@/components/ComplexFormBuilding').default,
    ComplexFormNotifyMethod: require('@/components/ComplexFormNotifyMethod').default,
    ComplexFormGetMethod: require('@/components/ComplexFormGetMethod').default,
    ComplexFormUpload: require('@/components/ComplexFormUpload').default,
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
    ownership_type: '2',
    connection_purpose: '3',
    mchrg: '1',
    mchrg_radio: '2',
    mchrg_value: '',
    tu: '1',
    tu_number: '',
    tu_date: '',
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
    organization_inn: '',
    kpp: '',
    ogrn: '',
    organization_brief_name: '',
    organization_full_name: '',
    consumption_character: '1',
    economic_activity_type: '',
    inn: '',
    mailing_address: getAddress(),
    ...getFio(),
    ...getContacts(),
    ...getPassport(),
  };
}

function getAngel() {
  return {
    proxy: '1',
    non_profit_association_representative: '1',
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
    kind: '1',
    cadastral_number: '',
    address: getAddress(),
    commissioning: '1',
    commissioning_date: '',
    approximate_date: '',
    mchrg_stages: [{ stage: '1', value: '' }],
    connection_points: [{ point: '1', value: '' }],
    object_stages: [{ design_time: '', input_date: '' }],
    networks_belong_third_parties: '1',
    connection_using_infrastructure: '1',
    connection_integrated_development: '1',
    right_to_use_power: '1',
    gasification_contract: '2',
    gas_equipment: '1',
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
    identity_document: null,
    registration_inn_kpp_certificate: null,
    land_documents: null,
    situational_plan: null,
    topographic_map: null,
    regulations_copy: null,
    ogrn: null,
    information_letter: null,
    signatures_sample: null,
    contract_signing_person: null,
    sign_documents_right: null,
    capital_construction_object_ownership: null,
    proxy: null,
    general_meeting_resolution: null,
    main_subscriber_consent: null,
    infrastructure_facilities_contract: null,
    right_to_use_power: null,
    certified_right_to_use_power: null,
    gas_consumption_reduction_document: null,
    capital_construction_object_ownership: null,
    mchrg_calculation: null,
    gas_transportation_organization_conclusion: null,
    ogrnip: null,
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
