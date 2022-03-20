<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Данные заявителя</AppFormTitle>
    <AppFieldset>
      <AppSelect
        cantEmpty
        name="profile.type"
        rules="required"
        label="Тип заявителя"
        :options="typeOpts"
      />
      <template v-if="type?.value === '2'">
        <AppInput name="profile.companies.inn" rules="required|numeric" label="ИНН" />
        <AppInput name="profile.companies.kpp" rules="required|numeric" label="КПП" />
        <AppInput name="profile.companies.ogrn" label="ОГРН" />
        <AppInput name="profile.companies.shortName" rules="required" label="Краткое наименование организации" />
        <AppInput name="profile.companies.fullName" rules="required" label="Полное наименование организации" />
        <ComplexFormPtAddrress path="profile.companies" title="Почтовый адрес"/>
        <ComplexFormPtContacts path="profile.companies"/>
        <AppSelect cantEmpty name="profile.companies.gasPotreb" label="Характер потребления газа" :options="gasPotrebOpts" />
        <AppInput name="profile.companies.okved" label="Вид экономической деятельности (Код ОКВЭД)" />
      </template>
      <template v-else>
        <ComplexFormPtFio path="profile.people"/>
        <ComplexFormPtPassport path="profile.people"/>
        <AppInput name="profile.people.inn" rules="required|numeric" label="ИНН" />
        <ComplexFormPtAddrress path="profile.people" title="Почтовый адрес"/>
        <ComplexFormPtContacts path="profile.people"/>
      </template>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { useFieldValue } from 'vee-validate';
import { markRaw } from 'vue';
import ComplexFormPtFio from '@/components/ComplexFormPtFio';
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import ComplexFormPtContacts from '@/components/ComplexFormPtContacts';
import ComplexFormPtPassport from '@/components/ComplexFormPtPassport';

export default {
  setup() {
    const type = useFieldValue('profile.type');

    const typeOpts = markRaw([
      { label: 'Физическое лицо', value: '1' },
      { label: 'Юридическое лицо', value: '2' },
      { label: 'Индивидуальный предприниматель', value: '3' },
    ]);

     const gasPotrebOpts = markRaw([
        { label: 'Коммерческие цели', value: 'commerc' },
        { label: 'Иные цели', value: 'other' },
      ]);

    return {
      type,
      typeOpts,
      gasPotrebOpts
    };
  },
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
