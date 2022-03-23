<template>
  <AppFormSection>
    <AppFormTitle>Данные об объекте капитального строительства</AppFormTitle>
    <AppFieldset>
      <AppInput name="object_data.name" rules="required" label="Наименование" />
      <AppInput
        name="object_data.cadastral_number"
        rules="required"
        label="Кадастровый номер участка"
      />
      <AppInput
        name="object_data.cadastral_numberigs"
        rules="required"
        label="Кадастровый номер участка ИЖС"
      />

      <ComplexFormPtAddrress
        path="object_data.address"
        title="Адрес объекта газификации"
      />

      <FieldArray name="object_data.connection_points" v-slot="{ fields }">
        <AppFormCard>
          <AppFormTitle level="3">Планируемое распределение МЧРГ по этапам и очередям</AppFormTitle>
          <AppFieldset>
            <div v-for="(field, idx) in fields" :key="field.key">
              <AppInput
                type="hidden"
                :name="`object_data.connection_points[${idx}].point`"
              />
              <AppInput
                rules="required"
                :name="`object_data.connection_points[${idx}].value`"
                :label="`${idx + 1} этап - расход`"
              />
            </div>
          </AppFieldset>
        </AppFormCard>
      </FieldArray>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';

export default {
  components: {
    ComplexFormPtAddrress,
  },
};
</script>

<style>
</style>
