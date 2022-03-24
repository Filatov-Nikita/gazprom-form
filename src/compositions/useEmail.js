import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  const getEmail = async (cb = () => {}) => {
    const data = await store.dispatch('complexForm/getEmail');
    if (!data?.email)
      alert('не удалось загрузить email пользователя. Впишите email вручную');
    else {
      cb(data.email);
    }
  };

  return {
    getEmail,
  };
}
