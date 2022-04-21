<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Загрузка документов</AppFormTitle>
    <AppFieldset>
      <AppFormCard>
        <AppFieldset>
          <AppFile :accept="$accept" v-bind="fileAttrs('inn', 'ИНН')" />
          <AppFile :accept="$accept" v-bind="fileAttrs('snils', 'СНИЛС')" />
          <AppFile :accept="$accept" v-bind="fileAttrs('identity_document_prav', pravLabel)" />
          <AppFile :accept="$accept" v-bind="fileAttrs('identity_document_prav_igz', pravIgzLabel)" />
          <AppFile :accept="$accept" v-bind="fileAttrs('mchrg_calculation', landDocsLabel, true)" />
          <AppFile :accept="$accept" v-bind="fileAttrs('situational_plan', 'Ситуационный план')" />
          <AppFile :accept="$accept" v-if="proxy === '2'" v-bind="fileAttrs('proxy', proxyLabel, true)" />
        </AppFieldset>
      </AppFormCard>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { useFieldValue } from 'vee-validate';
export default {
  setup() {
    const proxy = useFieldValue('proxy_data.proxy');
    const filename = useFieldValue('uploadedFiles.docs');

    const fileAttrs = (key, label, optional = false) => {
      return {
        rules: (optional || filename.value?.[key]) ? '' : 'required',
        filename: filename.value?.[key],
        name: `documents_upload.${key}`,
        multiple: true,
        label
      }
    }

    return {
      proxy,
      fileAttrs,
      proxyLabel: 'Доверенность или иные документы, подтверждающие полномочия представителя заявителя',
      landDocsLabel: 'Расчет максимального часового расхода газа (не прилагается, если планируемый максимальный часовой расход газа не более 7 куб.метров в час',
      pravLabel: 'Копия правоустанавливающего документа на земельный участок, на котором располагается принадлежащий заявителю объект индивидуального жилищного строительства.',
      pravIgzLabel: 'Копия документа, подтверждающего право собственности на объект индивидуального жилищного строительства.'
    }
  }
};
</script>

<style>
</style>
