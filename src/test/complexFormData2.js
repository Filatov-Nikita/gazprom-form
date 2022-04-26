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
    city: 'г Уфа',
    street: 'ул Айская',
    house: '64',
    flat: '8',
  };
}

function getPassport() {
  return {
    document_type: '1',
    document_series: '00 00',
    document_id: '000000',
    division_code: '000-000',
    issued_by: 'мвд',
    document_date_issue: '01.01.2020',
  };
}

function getContacts() {
  return {
    fax: '',
    email: '1@1.ru',
    phone_number_1: '+7(917)444-85-17',
    phone_number_2: '',
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
    ownership_type: '1',
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
    inn: '781633333333',
    soc: '111-111-111 11',
    mailing_address: getAddress(),
    ...getFio(),
    ...getContacts(),
    ...getPassport(),
  };
}

function getAngel() {
  return {
    proxy: '1',
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
    cadastral_number: '4040',
    cadastral_numberigs: '4041',
    address: getAddress(),
    mchrg_stages: [{ point: '1', value: 'тест' }]
  };
}

function getObtaining() {
  return {
    obtaining_method: '1',
    mailing_address: getAddress(),
  };
}

const blob = new File(['1'], 'test.png', {type: 'image/png'});

function getUpload() {
  return {
    inn: blob,
    snils: blob,
    identity_document_prav: blob,
    identity_document_prav_igz: blob,
    situational_plan: blob,
    mchrg_calculation: blob,
    proxy: blob,
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
