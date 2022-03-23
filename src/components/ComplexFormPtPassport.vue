<template>
  <AppFormCard>
    <AppFieldset>
      <AppSelect
        cantEmpty
        :name="`${path}.document_type`"
        rules="required"
        label="Наименование документа"
        :options="typeOpts"
      />
      <AppInput
        v-maska="'## ##'"
        :name="`${path}.document_series`"
        rules="required"
        label="Серия"
      />
      <AppInput
        v-maska="'######'"
        :name="`${path}.document_id`"
        rules="required|digits:6"
        label="Номер"
      />
      <AppInput
        v-maska="'###-###'"
        :name="`${path}.division_code`"
        rules="required|length:7"
        label="Код подразделения"
      />
      <AppInput
        :name="`${path}.issued_by`"
        rules="required"
        label="Кем выдан"
      />
      <AppDatePicker
        :name="`${path}.document_date_issue`"
        rules="required"
        label="Дата выдачи документа"
      />
    </AppFieldset>
  </AppFormCard>
</template>

<script>
import { markRaw } from 'vue';

export default {
  props: {
    path: {
      required: true,
      type: String,
    },
  },
  setup() {
    const typeOpts = markRaw([{ label: 'Паспорт гражданина РФ', value: '1' }]);

    return {
      typeOpts,
    };
  },
};
</script>

<style>
</style>
