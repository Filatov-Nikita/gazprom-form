import flatten from 'flat';
import useEmail from '@/compositions/useEmail';
import usePreloadForm from '@/compositions/usePreloadForm';
import { useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { nextTick, ref, provide } from 'vue';

function scrollToFirstError(errors) {
  const errList = Object.keys(errors);

  if (errList.length <= 0) return;
  const el = document.getElementById(errList[0]);

  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
}

export default function (initialValues = {}, { social = false } = {}) {
  const loading = ref(false);
  const submitModal = ref(false);
  const store = useStore();

  const { values, validate, setErrors, resetForm, setFieldValue, setValues } = useForm();

  nextTick(() => resetForm({ values: initialValues }));

  const id = usePreloadForm(setValues);

  provide('pasteAddress', () => {
    const { city, street, house, flat } = values.personal_data.mailing_address;
    setFieldValue('documents_obtaining.mailing_address.city', city);
    setFieldValue('documents_obtaining.mailing_address.street', street);
    setFieldValue('documents_obtaining.mailing_address.house', house);
    setFieldValue('documents_obtaining.mailing_address.flat', flat);
  });

  const { getEmail } = useEmail();
  const handleEmail = (email) => {
    setFieldValue('personal_data.email', email);
    setFieldValue('proxy_data.email', email);
  }

  getEmail(handleEmail);

  const handleResponse = (data) => {
    if (!Array.isArray(data.errors)) {
      const errors = flatten(data.errors);
      setErrors(errors);
      scrollToFirstError(errors);
    } else {
      submitModal.value = false;
      console.log('данные ответа', data);
      alert('Форма успешно отправлена');

      // if(social) location.href = '/preconditionsrequests/techconnectionsocial/';
      // else location.href = '/preconditionsrequests/techconnection/';
    }
  };

  const onSubmit = async (opts = {}) => {
    const { is_draft = 0, is_sign = 0, is_letter = 0, request_id = 0 } = opts;

    submitModal.value = false;

    if (is_draft === 0) {
      const { errors, valid } = await validate();
      if (!valid) return scrollToFirstError(errors);
    }

    loading.value = true;

    const data = await store.dispatch('complexForm/create', {
      id,
      edit: id === undefined ? false : true,
      social,
      data: values,
      meta: { is_draft, is_sign, is_letter, request_id },
    });

    handleResponse(data);

    loading.value = false;
  };

  return {
    onSubmit,
    submitModal,
    loading,
  };
}
