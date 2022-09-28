function getInitVals() {
  return {
    comment: 'test comment',
    files: null,
    contract_kind: { tp_contract_kind_radio: '1' },
    primary_information: getPrimary(),
    personal_data: getProfile(),
    proxy_data: getAngel(),
    object_data: getBuilding(),
    notifications_receiving: getNotifyMethod(),
    documents_obtaining: getObtaining(),
    documents_upload: getUpload()
  };
}

function getAddress() {
  return {
    city: 'г. Уфа',
    street: 'ул. Айская',
    house: 'д 64',
    flat: '8',
  };
}

function getPassport() {
  return {
    document_type: '1',
    document_series: '00 00',
    document_id: '000000',
    division_code: '000-000',
    issued_by: 'mvd',
    document_date_issue: '01.01.2020',
  };
}

function getContacts() {
  return {
    fax: 'fax',
    email: '1@1.ru',
    phone_number_1: '+7(917)444-85-17',
    phone_number_2: '+7(917)444-85-17',
  };
}

function getFio() {
  return {
    last_name: 'Антонов',
    name: 'Никита',
    second_name: 'Вячеславович',
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
  };
}

function getProfile() {
  return {
    organization_inn: '6449013711',
    kpp: '644901001',
    ogrn: '1026402000657',
    organization_brief_name: 'test name',
    organization_full_name: 'test name 2',
    consumption_character: '1',
    economic_activity_type: 'okved',
    inn: '781633333333',
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
    proxy_date: '01.01.2020',
    proxy_end: '01.01.2020',
    mailing_address: getAddress(),
    ...getPassport(),
    ...getFio(),
    ...getContacts(),
  };
}

function getBuilding() {
  return {
    name: 'house name',
    kind: '1',
    cadastral_number: '4040',
    address: getAddress(),
    commissioning: '1',
    commissioning_date: '01.01.2020',
    approximate_date: '01.01.2020',
    mchrg_stages: [{ stage: '1', value: '3' }],
    connection_points: [{ point: '1', value: '4' }],
    object_stages: [{ design_time: '01.01.2020', input_date: '01.01.2020' }],
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
  }
}

const blob = new File(['1'], 'test.pdf');

function getUpload() {
  return {
    identity_document: blob,
    registration_inn_kpp_certificate: blob,
    land_documents: blob,
    situational_plan: blob,
    topographic_map: blob,
    regulations_copy: blob,
    ogrn: blob,
    information_letter: blob,
    signatures_sample: blob,
    contract_signing_person: blob,
    sign_documents_right: blob,
    proxy: blob,
    general_meeting_resolution: blob,
    main_subscriber_consent: blob,
    infrastructure_facilities_contract: blob,
    right_to_use_power: blob,
    certified_right_to_use_power: blob,
    gas_consumption_reduction_document: blob,
    capital_construction_object_ownership: blob,
    mchrg_calculation: blob,
    gas_transportation_organization_conclusion: blob,
    ogrnip: blob
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

export default getInitVals();
