<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Данные заявителя</AppFormTitle>
    <AppFieldset>
      <ComplexFormPtFio path="personal_data"/>
      <ComplexFormPtPassport path="personal_data"/>
      <AppInput name="personal_data.inn" rules="required|numeric|length:12" label="ИНН" v-maska="'############'" />
      <AppInput name="personal_data.soc" rules="required" label="СНИЛС" v-maska="'###-###-###-##'"/>
      <ComplexFormPtAddrress path="personal_data.mailing_address" title="Почтовый адрес"/>
      <ComplexFormPtContacts path="personal_data"/>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtFio from '@/components/ComplexFormPtFio';
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import ComplexFormPtContacts from '@/components/ComplexFormPtContacts';
import ComplexFormPtPassport from '@/components/ComplexFormPtPassport';

export default {
  components: {
    ComplexFormPtFio,
    ComplexFormPtAddrress,
    ComplexFormPtContacts,
    ComplexFormPtPassport
  }
};
</script>

<style>
</style>
