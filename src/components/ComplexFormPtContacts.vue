<template>
  <AppFormCard>
    <AppFieldset>
      <AppInput type="tel" :name="`${path}.phone_number_1`" rules="required" label="Телефон 1" />
      <AppInput type="tel" :name="`${path}.phone_number_2`" label="Телефон 2" />
      <AppInput :name="`${path}.fax`" label="Факс" />
      <AppInput type="email" :name="`${path}.email`" rules="required|email" label="Адрес электронной почты" />
    </AppFieldset>
  </AppFormCard>
</template>

<script>
export default {
  props: {
    path: {
      required: true,
      type: String
    }
  }
}
</script>

<style>

</style>
