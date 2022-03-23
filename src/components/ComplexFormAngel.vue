<template>
  <AppFormSection>
    <AppFormTitle>Данные доверенного лица</AppFormTitle>
    <AppFieldset>
      <AppSelect
        name="proxy_data.proxy"
        rules="required"
        label="Заявку подаю по доверенности"
      />

      <template v-if="dov === '2'">
        <ComplexFormPtFio path="proxy_data" />
        <ComplexFormPtPassport path="proxy_data" />
        <AppInput name="proxy_data.proxy_number" rules="required" label="Номер доверенности" />
        <AppDatePicker name="proxy_data.proxy_date" rules="required" label="Дата доверенности" />
        <AppDatePicker name="proxy_data.proxy_end" rules="required" label="Действительна до" />
        <ComplexFormPtAddrress path="proxy_data.mailing_address" title="Почтовый адрес" />
        <ComplexFormPtContacts path="proxy_data" />
      </template>

      <AppSelect
        name="proxy_data.non_profit_association_representative"
        label="Являюсь представителем некоммерческого объединения"
      />
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtFio from '@/components/ComplexFormPtFio';
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import ComplexFormPtContacts from '@/components/ComplexFormPtContacts';
import ComplexFormPtPassport from '@/components/ComplexFormPtPassport';

import { useFieldValue } from 'vee-validate';
export default {
  setup() {
    const dov = useFieldValue('proxy_data.proxy');

    return {
      dov,
    };
  },
  components: {
    ComplexFormPtFio,
    ComplexFormPtAddrress,
    ComplexFormPtContacts,
    ComplexFormPtPassport,
  },
};
</script>

<style>
</style>
