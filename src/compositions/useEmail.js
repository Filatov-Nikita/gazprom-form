import { useStore } from 'vuex';

export default function () {
  const store = useStore();

  const getEmail = async (cb = () => {}) => {
    try {
      const data = await store.dispatch('complexForm/getEmail');
      if (!data?.email) throw 'Email is invalid';
      else {
        cb(data.email);
      }
    } catch(e) {
      console.log(e);
      alert('не удалось загрузить email пользователя. Впишите email вручную');
    }
  };

  return {
    getEmail,
  };
}
