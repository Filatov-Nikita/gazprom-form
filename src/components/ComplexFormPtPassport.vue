<template>
  <AppFormCard>
    <AppFieldset>
      <AppSelect
        cantEmpty
        :name="`${path}.passport.type`"
        rules="required"
        label="Наименование документа"
        :options="typeOpts"
      />
      <AppInput
        v-maska="'####'"
        :name="`${path}.passport.serial`"
        rules="required|digits:4"
        label="Серия"
      />
      <AppInput
        v-maska="'######'"
        :name="`${path}.passport.number`"
        rules="required|digits:6"
        label="Номер"
      />
      <AppInput
        v-maska="'###-###'"
        :name="`${path}.passport.kod`"
        rules="required|length:7"
        label="Код подразделения"
      />
      <AppInput
        :name="`${path}.passport.who`"
        rules="required"
        label="Кем выдан"
      />
      <AppInput
        type="date"
        :name="`${path}.passport.date`"
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
    const typeOpts = markRaw([{ label: 'Паспорт гражданина РФ', value: 'RF' }]);

    return {
      typeOpts,
    };
  },
};
</script>

<style>
</style>
