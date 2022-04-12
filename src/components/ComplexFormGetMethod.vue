<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">
      Способ получения оригиналов документов
    </AppFormTitle>
    <AppFieldset>
      <AppSelect
        cantEmpty
        name="documents_obtaining.obtaining_method"
        :options="typeOpts"
        label="Выберите способ получения оригиналов документов"
      />
      <p v-if="type === '2'" class="tw-rounded-xl tw-bg-yellow-300 tw-p-4 tw-text-sm tw-text-slate-800">
        Адрес Единого центра обслуживания, для получения документов, будет
        сообщен дополнительно.
      </p>
      <AppButton v-if="showBtn" @click="pasteAdreess">Скопировать адрес из блока "Данные заявителя"</AppButton>
      <ComplexFormPtAddrress
        v-if="type === '1'"
        path="documents_obtaining.mailing_address"
        title="Почтовый адрес"
      />
      <AppInput type="textarea" name="comment" label="Комментарий:" />
      <AppFile name="files" label="Вложения:" multiple />
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import ComplexFormPtAddrress from '@/components/ComplexFormPtAddrress';
import { useFieldValue } from 'vee-validate';
import { markRaw, computed, inject } from 'vue';

export default {
  setup() {
    const type = useFieldValue('documents_obtaining.obtaining_method');
    const address = useFieldValue('personal_data.mailing_address');

    const typeOpts = markRaw([
      { label: 'По почте', value: '1' },
      { label: 'Самостоятельно', value: '2' },
    ]);

    const showBtn = computed(() => {
      const { city, street, house } = address.value;
      return city && street && house && type.value === '1';
    });

    const pasteAddress = inject('pasteAddress');

    return {
      type,
      typeOpts,
      showBtn,
      pasteAdreess: () => pasteAddress()
    };
  },
  components: {
    ComplexFormPtAddrress,
  },
};
</script>

<style>
</style>
