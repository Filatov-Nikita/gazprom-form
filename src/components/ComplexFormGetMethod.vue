<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">
      Способ получения оригиналов документов
    </AppFormTitle>
    <AppFieldset>
      <AppSelect
        cantEmpty
        name="getMethod.type"
        :options="typeOpts"
        label="Выберите способ получения оригиналов документов"
      />
      <p v-if="type?.value === '2'" class="tw-rounded-xl tw-bg-yellow-300 tw-p-4 tw-text-sm tw-text-slate-800">
        Адрес Единого центра обслуживания, для получения документов, будет
        сообщен дополнительно.
      </p>
      <ComplexFormPtAddrress
        v-if="type?.value === '1'"
        path="getMethod"
        title="Почтовый адрес"
      />
      <AppInput type="textarea" name="getMethod.comment" label="Комментарий:" />
      <AppFile name="getMethod.attached" label="Вложения:" />
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import { useFieldValue } from 'vee-validate';
import { markRaw } from '@vue/reactivity';

export default {
  setup() {
    const type = useFieldValue('getMethod.type');
    const typeOpts = markRaw([
      { label: 'По почте', value: '1' },
      { label: 'Самостоятельно', value: '2' },
    ]);

    return {
      type,
      typeOpts,
    };
  },
  components: {
    ComplexFormPtAddrress,
  },
};
</script>

<style>
</style>
