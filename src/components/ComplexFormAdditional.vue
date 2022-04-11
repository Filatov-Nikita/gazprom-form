<template>
  <AppFormSection>
    <AppFormTitle>Выполнить дополнительные мероприятия:</AppFormTitle>
    <AppFieldset>
      <AppCheck :label="labels.add1" name="primary_information.add1" :value="true"/>
      <AppCheck :label="labels.add2" name="primary_information.add2" :value="true"/>
      <AppCheck :label="labels.add4" name="primary_information.add4" :value="true"/>
      <AppCheck :label="labels.add5" name="primary_information.add5" :value="true"/>
      <AppCheck :label="labels.add6" name="primary_information.add6" :value="true"/>
      <AppCheck :label="labels.add3" name="primary_information.add3" :value="true"/>
      <AppCheck :label="labels.add7" name="primary_information.add7" :value="true"/>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { markRaw } from 'vue';

export default {
  setup() {
    const labels = markRaw({
      add1: 'по подключению (технологическому присоединению) в пределах границ его земельного участка',
      add2: 'по проектированию сети газопотребления',
      add3: 'по установке газоиспользующего оборудования',
      add4: 'по строительству либо реконструкции внутреннего газопровода объекта капитального строительства',
      add5: 'по установке прибора учета газа',
      add6: 'по поставке прибора учета газа',
      add7: 'по поставке газоиспользующего оборудования',
    });

    return {
      labels,
    };
  },
};
</script>

<style>
</style>
