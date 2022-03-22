<template>
  <AppFormCard>
    <AppFieldset>
      <AppInput :name="`${path}.last_name`" rules="required" label="Фамилия" />
      <AppInput :name="`${path}.name`" rules="required" label="Имя" />
      <AppInput :name="`${path}.second_name`" rules="required" label="Отчество" />
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
