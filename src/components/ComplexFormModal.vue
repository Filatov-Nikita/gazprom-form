<template>
  <div class="tw-text-3xl tw-mb-6">
    Вы хотите подписать заявку с помощью электронной подписи?
  </div>

  <div class="tw-mb-4">
    Если вы выберете "Да", Вам понадобится электронная подпись. Если вы
    выберете "Нет", после отправки Вам необходимо прийти в офис лично и
    подписать заявку.
  </div>

  <div class="tw-flex tw-space-x-3">
    <AppButton class="tw-w-1/3" @click="$emit('submit', { is_sign: 1 })">Да</AppButton>
    <AppButton class="tw-w-1/3" @click="$emit('submit')">Нет</AppButton>
    <AppButton class="tw-w-1/3" @click="$emit('hideModal')">Отмена</AppButton>
  </div>
</template>

<script>
export default {
  emits: ['submit', 'hideModal']
};
</script>

<style>
</style>
