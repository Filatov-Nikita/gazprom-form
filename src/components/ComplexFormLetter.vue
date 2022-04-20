<template>
  <AppModal v-model="show">
    <div>
      <p class="tw-text-2xl tw-mb-4">Проект письма сформирован</p>
      <p class="tw-mb-6">Заполните оставшиеся поля, прикрепите скан-копию документа и отправьте заявку.</p>
      <AppButton class="tw-w-full" @click="getLetter">ок</AppButton>
    </div>
  </AppModal>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex'

export default {
  setup() {
    const params = new URLSearchParams(window.location.search);
    const store = useStore();
    const show = ref(params.has('letter'));

    const getLetter = async () => {
      try {
        const { request_file: { filename, href } } = await store.dispatch('complexForm/getLetter', { id: params.get('id') });
        download(filename, href);
        show.value = false;
      } catch(e) {
        alert('Не удалось сформировать документ');
        console.log(e);
      }
    }

    const download = (name, href) => {
      const a = document.createElement('a');
      a.href = href;
      a.download = name;
      a.style.display = 'none';
      document.body.append(a);
      a.click();
      a.remove();
    }

    return {
      show,
      getLetter,
    }
  }
}
</script>

<style>

</style>
