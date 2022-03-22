<template>
  <AppFormSection>
    <AppFormTitle class="tw-mb-2">Загрузка документов</AppFormTitle>
    <AppFieldset>
      <AppFormCard>
        <AppFieldset>
          <AppFile name="documents_upload.identity_document" rules="required" label="Копия документа, удостоверяющего личность Заявителя/Представителя"/>
          <AppFile name="documents_upload.registration_inn_kpp_certificate" rules="required" label="Свидетельство о регистрации в налоговом органе (ИНН)"/>
          <AppFile name="documents_upload.land_documents" rules="required" label="Копии правоустанавливающих документов на земельный участок, на котором располагается (будет располагаться) принадлежащий заявителю объект капитального строительства (земельный участок) (свидетельство, договор аренды и т.п.) и (или) договор о комплексном освоении территории"/>
          <AppFile name="documents_upload.situational_plan" rules="required" label="Ситуационный план"/>
          <AppFile name="documents_upload.topographic_map" label="Топографическая карта участка в масштабе 1:500 (со всеми наземными и подземными коммуникациями и сооружениями), согласованная с организациями, эксплуатирующими указанные коммуникации и сооружения (не прилагается, если заказчик физическое лицо, осуществляющее создание (реконструкцию) объекта индивидуального жилищного строительства)"/>
        </AppFieldset>
      </AppFormCard>
      <AppFormCard v-if="type === '2'">
        <AppFormTitle level="3">Регистрационные документы юридического лица</AppFormTitle>
        <AppFieldset>
          <AppFile name="documents_upload.regulations_copy" rules="required" label="Копия Устава (копии листов с расшифровкой наименования, полномочия директора)"/>
          <AppFile name="documents_upload.ogrn" rules="required" label="Копия свидетельства о государственной регистрации юридического лица (ОГРН)"/>
          <AppFile name="documents_upload.information_letter" rules="required" label="Копия информационного письма Государственного комитета РБ по статистике"/>
          <AppFile name="documents_upload.signatures_sample" rules="required" label="Карточка с образцом подписей руководителя предприятия и уполномоченных лиц, которые будут подписывать документы"/>
          <AppFile name="documents_upload.contract_signing_person" rules="required" label="Копии документов, подтверждающих полномочия лица, подписывающего договор (решение собрания участников общества, приказ о назначении руководителя, доверенность)"/>
          <AppFile name="documents_upload.sign_documents_right" rules="required" label="Справка за подписью руководителя организации, с указанием лиц и образцами подписей, имеющих право подписывать бухгалтерские документы, акты выполненных работ"/>
        </AppFieldset>
      </AppFormCard>
      <AppFormCard>
        <AppFieldset>
          <AppFile v-if="type === '3'" name="documents_upload.ogrnip" label="Копия свидетельства о государственной регистрации в качестве Индивидуального предпринимателя (ОГРНИП)"/>
          <AppFile v-if="tu === '2'" name="documents_upload.gas_transportation_organization_conclusion" label="Копии заключений газотранспортной организации и газораспределительной организации, сет газораспределения которой технологически связана с сетью газораспределения исполнителя (при наличии такой сети), о наличии или об отсутствии технической возможности подключения"/>
          <AppFile v-if="mchrg === '2'" name="documents_upload.mchrg_calculation" label="Расчет планируемого максимального часового расхода газа (не требуется в случае планируемого максимального часового расхода газа более 5 куб. метров)"/>
          <AppFile v-if="proxy === '2'" name="documents_upload.proxy" label="Доверенность или иные документы, подтверждающие полномочия представителя заявителя"/>
          <AppFile v-if="profit === '2'" name="documents_upload.general_meeting_resolution" label="Решение общего собрания членов некоммерческого объединения о назначении уполномоченного лица на подачу запроса о предоставлении ТУ"/>
          <AppFile v-if="commissioning === '1'" name="documents_upload.capital_construction_object_ownership" label="Копия документа, подтверждающего право собственности или иное предусмотренное законом право на объект капитального строительства"/>
          <AppFile v-if="network === '2'" name="documents_upload.main_subscriber_consent" rules="required" label="Согласие основного абонента на подключение (ТП) к сетям газораспределения и (или) газопотребления основного абонента, а также на строительство газопровода на з/у основного абонента"/>
          <AppFile v-if="infrastucture === '2'" name="documents_upload.infrastructure_facilities_contract" rules="required" label="Заверенная в установленном порядке копия договора о пользовании объектами инфраструктуры и другим имуществом общего пользования в соответствии с Федеральным законом 'О садоводческих, огороднических и дачных некоммерческих объединениях граждан' (в случае, если подключение осуществляется с использованием объектов инфраструктуры и другого имущества общего пользования) некоммерческого объединения"/>
          <AppFile v-if="connection === '2'" name="documents_upload.territory_planning_documentation" rules="required" label="Копия документации по планировке территории (проект планировки территории и проект межевания территории), предусматривающей строительство сети газопротребления в пределах территории подлежащей комплексному освоению"/>
          <template v-if="rightPower === '2'">
            <AppFile name="documents_upload.right_to_use_power" rules="required" label="Копия акта (-ов) о подключении объекта КС лиц (-а), которое уступает право на использование мощности или иной документ подтверждающий параметры его подключения"/>
            <AppFile name="documents_upload.certified_right_to_use_power" rules="required" label="Заверенная сторонами копия соглашения об уступе права на использование мощности"/>
            <AppFile name="documents_upload.gas_consumption_reduction_document" label="Документ, удостоверяющий размер снижения потребления газа потребителем"/>
          </template>
        </AppFieldset>
      </AppFormCard>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { useFieldValue } from 'vee-validate';
export default {
  setup() {
    const rightPower = useFieldValue('object_data.right_to_use_power');
    const connection = useFieldValue('object_data.connection_integrated_development');
    const infrastucture = useFieldValue('object_data.connection_using_infrastructure');
    const network = useFieldValue('object_data.networks_belong_third_parties');
    const commissioning = useFieldValue('object_data.commissioning');
    const profit = useFieldValue('proxy_data.non_profit_association_representative');
    const proxy = useFieldValue('proxy_data.proxy');
    const mchrg = useFieldValue('primary_information.mchrg');
    const tu = useFieldValue('primary_information.tu');
    const type = useFieldValue('primary_information.ownership_type');

    return {
      rightPower,
      connection,
      infrastucture,
      network,
      commissioning,
      profit,
      proxy,
      mchrg,
      tu,
      type
    }
  }
};
</script>

<style>
</style>
