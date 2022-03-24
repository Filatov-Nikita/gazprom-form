<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Загрузка документов</AppFormTitle>
    <AppFieldset>
      <AppFormCard>
        <AppFieldset>
          <AppFile :accept="$accept" name="documents_upload.inn" rules="required" label="ИНН"/>
          <AppFile :accept="$accept" name="documents_upload.snils" rules="required" label="СНИЛС"/>
          <AppFile :accept="$accept" name="documents_upload.identity_document_prav" rules="required" label="Копия правоустанавливающего документа на земельный участок, на котором располагается принадлежащий заявителю объект индивидуального жилищного строительства."/>
          <AppFile :accept="$accept" name="documents_upload.identity_document_prav_igz" rules="required" label="Копия документа, подтверждающего право собственности на объект индивидуального жилищного строительства."/>
          <AppFile :accept="$accept" name="documents_upload.land_documents" label="Расчет максимального часового расхода газа (не прилагается, если планируемый максимальный часовой расход газа не более 7 куб.метров в час"/>
          <AppFile :accept="$accept" name="documents_upload.situational_plan" rules="required" label="Ситуационный план"/>
          <AppFile :accept="$accept" v-if="proxy === '2'" name="documents_upload.proxy" label="Доверенность или иные документы, подтверждающие полномочия представителя заявителя"/>
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

    return {
      proxy,
    }
  }
};
</script>

<style>
</style>
