<template>
  <AppFormSection>
    <AppFormTitle>Данные доверенного лица</AppFormTitle>
    <AppFieldset>
      <AppSelect
        name="angel.dov"
        rules="required"
        label="Заявку подаю по доверенности"
      />

      <template v-if="dov?.value === 'Yes'">
        <ComplexFormPtFio path="angel" />
        <ComplexFormPtPassport path="angel" />
        <AppInput name="angel.dovData.number" rules="required" label="Номер доверенности" />
        <AppInput type="date" name="angel.dovData.date" rules="required" label="Дата доверенности" />
        <AppInput type="date" name="angel.dovData.until" rules="required" label="Действительна до" />
        <ComplexFormPtAddrress path="angel" title="Почтовый адрес" />
        <ComplexFormPtContacts path="angel" />
      </template>

      <AppSelect
        name="angel.uncommerc"
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
    const dov = useFieldValue('angel.dov');

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
