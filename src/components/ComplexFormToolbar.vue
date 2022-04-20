<template>
  <AppFormSection>
    <div class="tw-flex tw-space-x-3">
      <AppButton @click="$emit('showModal')">Отправить</AppButton>
      <AppButton @click="$emit('submit', { is_draft: 1 })">
        Сохранить черновик
      </AppButton>
      <AppButton @click="$emit('submit', { is_draft: 1, is_sign: 1, is_letter: 1 })">
        Сформировать проект заявки
      </AppButton>
      <a href="/preconditionsrequests/techconnection/" alt="закрыть">
        <AppButton>Закрыть</AppButton>
      </a>
    </div>
  </AppFormSection>
</template>

<script>
export default {
  emits: ['submit', 'showModal'],
};
</script>
