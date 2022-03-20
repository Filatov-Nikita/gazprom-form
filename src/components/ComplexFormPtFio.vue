<template>
  <AppFormCard>
    <AppFieldset>
      <AppInput :name="`${path}.lastname`" rules="required" label="Фамилия" />
      <AppInput :name="`${path}.name`" rules="required" label="Имя" />
      <AppInput :name="`${path}.patronymic`" rules="required" label="Отчество" />
    </AppFieldset>
  </AppFormCard>
</template>

<script>
export default {
  props: {
    path: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
</style>
