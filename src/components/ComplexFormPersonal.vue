<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Данные заявителя</AppFormTitle>
    <AppFieldset>
      <AppSelect
        cantEmpty
        name="primary_information.ownership_type"
        rules="required"
        label="Тип заявителя"
        :options="typeOpts"
      />
      <template v-if="type === '2'">
        <AppInput name="personal_data.organization_inn" rules="required|numeric|length:10" label="ИНН" v-maska="'##########'" />
        <AppInput name="personal_data.kpp" rules="required|numeric" label="КПП" v-maska="'#########'" />
        <AppInput name="personal_data.ogrn" label="ОГРН" v-maska="'#############'" />
        <AppInput name="personal_data.organization_brief_name" rules="required" label="Краткое наименование организации" />
        <AppInput name="personal_data.organization_full_name" rules="required" label="Полное наименование организации" />
        <ComplexFormPtAddrress allRegions path="personal_data.mailing_address" title="Почтовый адрес"/>
        <ComplexFormPtContacts path="personal_data"/>
        <AppSelect
          cantEmpty
          name="personal_data.consumption_character"
          label="Характер потребления газа"
          :options="gasPotrebOpts"
        />
        <AppInput name="personal_data.economic_activity_type" label="Вид экономической деятельности (Код ОКВЭД)" v-maska="'##.##.##.##'" />
      </template>
      <template v-else>
        <ComplexFormPtFio path="personal_data"/>
        <ComplexFormPtPassport path="personal_data"/>
        <AppInput name="personal_data.inn" rules="required|numeric|length:12" label="ИНН" v-maska="'############'"/>
        <ComplexFormPtAddrress allRegions path="personal_data.mailing_address" title="Почтовый адрес"/>
        <ComplexFormPtContacts path="personal_data"/>
        <template v-if="type === '3'">
          <AppSelect
            cantEmpty
            name="personal_data.consumption_character"
            label="Характер потребления газа"
            :options="gasPotrebOpts"
          />
          <AppInput name="personal_data.economic_activity_type" label="Вид экономической деятельности (Код ОКВЭД)" v-maska="'##.##.##.##'" />
        </template>
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
    const type = useFieldValue('primary_information.ownership_type');

    const typeOpts = markRaw([
      { label: 'Физическое лицо', value: '1' },
      { label: 'Юридическое лицо', value: '2' },
      { label: 'Индивидуальный предприниматель', value: '3' },
    ]);

     const gasPotrebOpts = markRaw([
        { label: 'Коммерческие цели', value: '1' },
        { label: 'Иные цели', value: '2' },
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
