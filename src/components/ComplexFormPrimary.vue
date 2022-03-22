<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Первичная информация</AppFormTitle>
    <div class="tw-max-w-lg tw-space-y-2">
      <AppSelect
        cantEmpty
        name="primary_information.connection_purpose"
        rules="required"
        label="Цель подключения"
        :options="purposeOpts"
      />
      <AppSelect
        name="primary_information.mchrg"
        rules="required"
        label="Есть расчет планируемого максимального часового расхода газа?"
      />
      <button v-if="mchrg === '1'" @click="modal = true" type="button" class="tw-text-primary tw-underline">Заказать расчет максимального часового расхода газа</button>
      <AppModal v-model="modal">
        <div class="tw-text-xl tw-mb-6">Сохранить заявку и перейти к заявке на расчёт МЧРГ?</div>
        <div class="tw-flex tw-space-x-3">
          <AppButton type="button" class="tw-w-1/2" @click="save">Да</AppButton>
          <AppButton type="button" class="tw-w-1/2" @click="modal = false">Нет</AppButton>
        </div>
      </AppModal>
      <AppSelect
        name="primary_information.mchrg_radio"
        rules="required"
        label="Планируемый максимальный часовой расход газа"
        :options="planOpts"
      />
      <AppInput
        v-if="showGasMax"
        type="number"
        rules="required"
        name="primary_information.mchrg_value"
        label="расход газа"
      />
      <AppSelect
        v-if="showGasMax && showTU"
        name="primary_information.tu"
        label="Есть ТУ?"
        rules="required"
      />
      <template v-if="showTUInputs">
        <AppInput rules="required" name="primary_information.tu_number" label="Номер ТУ" />
        <AppInput type="date" rules="required" name="primary_information.tu_date" label="Дата ТУ" />
      </template>
    </div>
  </AppFormSection>
</template>

<script>
import { useFieldValue } from 'vee-validate';
import { computed, markRaw, ref } from 'vue';

export default {
  emits: ['save'],
  setup(props, {emit}) {
    const modal = ref(false);
    const radio = useFieldValue('primary_information.mchrg_radio');
    const val = useFieldValue('primary_information.mchrg_value');
    const tu = useFieldValue('primary_information.tu');
    const mchrg = useFieldValue('primary_information.mchrg');

    const purposeOpts = markRaw([
      { label: 'Изменение в схеме', value: '1' },
      { label: 'Увеличение объема', value: '2' },
      { label: 'Первичное подключение', value: '3' },
    ]);

    const planOpts = markRaw([
      { label: 'Указать', value: '1' },
      { label: 'Не знаю', value: '2' },
    ]);

    const showGasMax = computed(
      () => radio.value === '1'
    );

    const showTU = computed(() =>
      val.value
        ? +val.value >= 300
        : false
    );

    const showTUInputs = computed(
      () => showTU.value && tu.value === '2'
    );

    const save = () => {
      emit('save');
      modal.value = false;
      window.open('http://mrg.danat.su/preconditionsrequests/mchrgcalculation/0/edit/', '_blank');
    }

    return {
      showGasMax,
      showTU,
      showTUInputs,
      planOpts,
      purposeOpts,
      val,
      mchrg,
      modal,
      save
    };
  },
};
</script>

<style>
</style>
