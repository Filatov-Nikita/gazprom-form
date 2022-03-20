<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Первичная информация</AppFormTitle>
    <div class="tw-max-w-lg tw-space-y-2">
      <AppSelect
        cantEmpty
        name="primary.purpose"
        rules="required"
        label="Цель подключения"
        :options="purposeOpts"
      />
      <AppSelect
        name="primary.hasCalc"
        rules="required"
        label="Есть расчет планируемого максимального часового расхода газа?"
      />
      <AppSelect
        name="primary.plan"
        rules="required"
        label="Планируемый максимальный часовой расход газа"
        :options="planOpts"
      />
      <AppInput
        v-if="showGasMax"
        type="number"
        rules="required"
        name="primary.gasLoose"
        label="расход газа"
      />
      <AppSelect
        v-if="showGasMax && showTU"
        name="primary.hasTu"
        label="Есть ТУ?"
        rules="required"
      />
      <template v-if="showTUInputs">
        <AppInput rules="required" name="primary.tu.number" label="Номер ТУ" />
        <AppInput type="date" rules="required" name="primary.tu.date" label="Дата ТУ" />
      </template>
    </div>
  </AppFormSection>
</template>

<script>
import { useFormValues } from 'vee-validate';
import { computed, markRaw } from 'vue';

export default {
  setup() {
    const values = useFormValues();

    const purposeOpts = markRaw([
      { label: 'Изменение в схеме', value: '1' },
      { label: 'Увеличение объема', value: '2' },
      { label: 'Первичное подключение', value: '3' },
    ]);

    const planOpts = markRaw([
      { label: 'Указать', value: 'Yes' },
      { label: 'Не знаю', value: '?' },
    ]);

    const showGasMax = computed(
      () => values.value.primary.plan?.value === 'Yes'
    );

    const showTU = computed(() =>
      values.value.primary.gasLoose
        ? +values.value.primary.gasLoose >= 300
        : false
    );

    const showTUInputs = computed(
      () => showTU.value && values.value.primary.hasTu?.value === 'Yes'
    );

    return {
      showGasMax,
      showTU,
      showTUInputs,
      planOpts,
      purposeOpts,
    };
  },
};
</script>

<style>
</style>
