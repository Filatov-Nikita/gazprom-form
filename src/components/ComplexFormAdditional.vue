<template>
  <AppFormSection>
    <AppFormTitle>Дополнительные мероприятия:</AppFormTitle>
    <AppFieldset>
      <AppCheck :label="labels.add1" name="primary_information.add1" :value="true"/>
      <AppCheck :label="labels.add2" name="primary_information.add2" :value="true"/>
      <AppCheck :label="labels.add3" name="primary_information.add3" :value="true"/>
      <AppCheck :label="labels.add4" name="primary_information.add4" :value="true"/>
      <AppCheck :label="labels.add5" name="primary_information.add5" :value="true"/>
      <AppCheck :label="labels.add6" name="primary_information.add6" :value="true"/>
      <AppCheck :label="labels.add7" name="primary_information.add7" :value="true"/>
    </AppFieldset>
  </AppFormSection>
</template>

<script>
import { markRaw } from '@vue/reactivity';
export default {
  setup() {
    const labels = markRaw({
      add1: 'Дополнительно выполнить мероприятия по подключению (технологическому присоединению) в пределах границ его земельного участка',
      add2: 'Дополнительно выполнить мероприятия по установке газоиспользующего оборудования',
      add3: 'Дополнительно выполнить мероприятия по проектированию сети газопотребления',
      add4: 'Дополнительно выполнить мероприятия по строительству либо реконструкции внутреннего газопровода объекта капитального строительства',
      add5: 'Дополнительно выполнить мероприятия по поставке газоиспользующего оборудования',
      add6: 'Дополнительно выполнить мероприятия по установке прибора учета газа',
      add7: 'Дополнительно выполнить мероприятия по поставке прибора учета газа',
    });

    return {
      labels,
    };
  },
};
</script>

<style>
</style>
