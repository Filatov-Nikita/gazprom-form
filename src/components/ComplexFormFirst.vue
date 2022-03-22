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
            Договор комплексного обслуживания:
          </p>
          <p>
            Комплекс услуг по газификации объекта капитального строительства,
            включающий в себя подключение (технологическое присоединение) к
            сетям газораспределения (газопровод-ввод до границ земельного
            участка заявителя), газификацию объекта в пределах границ земельного
            участка, инструктаж по безопасному пользованию газом, заключение
            договора поставки газа, договора о техническом обслуживании, пуск
            газа.
          </p>
        </div>

        <div>
          <p class="tw-font-medium tw-mb-2">
            Договор о подключении (технологическом присоединении):
          </p>
          <p>
            Совокупность организационных и технических действий, в т. ч.
            проектирование и строительство газопровода от газораспределительной
            сети (газопровод-ввод) до границы земельного участка, на котором
            располагается объект капитального строительства, позволяющая
            использовать газ, поступающий из сети газораспределения.
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
