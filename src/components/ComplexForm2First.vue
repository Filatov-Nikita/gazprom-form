<template>
  <AppFormSection>
    <AppFormTitle>Вид договора</AppFormTitle>
    <div class="tw-space-y-1 tw-mb-4 tw-max-w-lg">
      <AppRadio
        rules="required"
        name="contract_kind.tp_contract_kind_radio"
        label="Договор комплексного обслуживания"
        value="1"
      />
      <AppRadio
        rules="required"
        name="contract_kind.tp_contract_kind_radio"
        label="Договор о подключении (технологическом присоединении)"
        value="2"
      />
      <AppErrorMessage name="contract_kind.tp_contract_kind_radio" />
    </div>
    <AppButton @click="modal = !modal">Подробнее</AppButton>
    <AppModal v-model="modal">
      <div class="tw-space-y-8">
        <div>
          <p class="tw-font-medium tw-mb-2">
            Догазификация:
          </p>
          <p>
            Догазификация – это обеспечение подключения (технологического
            присоединения) к сетям газораспределения индивидуальных жилых домов,
            расположенных в газифицированных на 1 июля 2021 года населённых

            пунктах и принадлежащих физическим лицам, которые в соответствии с
            критериями, установленными Правительством Российской Федерации
            относятся к категории лиц, которым подключение до границ земельного
            участка осуществляется без взимания платы. Населённый пункт в целях
            данного определения считается газифицированным, если в нём полностью
            или частично проложены внутригородские или внутрипоселковые
            газораспределительные сети.
          </p>
        </div>
      </div>
      <AppButton
        class="tw-mt-3"
        size="sm"
        color="red-700"
        @click="modal = false"
      >
        Закрыть
      </AppButton>
    </AppModal>
  </AppFormSection>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
    };
  },
};
</script>
