<template>
  <AppFormCard>
    <AppFormTitle v-if="title" level="3" class="tw-mb-2">
      {{ title }}
    </AppFormTitle>
    <AppFieldset>
      <AppFilterSelect
        ref="cityRef"
        rules="required"
        label="Город / н.п."
        :name="`${path}.address.city`"
        :fetcher="fetchCities"
        :option="optionCity"
      />
      <AppFilterSelect
        ref="streetRef"
        :disabled="!city"
        :name="`${path}.address.street`"
        rules="required"
        label="Улица"
        :fetcher="fetchStreets"
        :option="optionStreet"
      />
      <AppFilterSelect
        ref="buildingRef"
        :disabled="!street"
        :name="`${path}.address.building`"
        rules="required"
        label="Дом"
        :fetcher="fetchBuildings"
        :option="optionBuilding"
      />
      <AppInput
        ref="flatRef"
        :disabled="!building"
        :name="`${path}.address.flat`"
        rules="required"
        label="Квартира"
      />
    </AppFieldset>
  </AppFormCard>
</template>

<script>
import { useFieldValue } from 'vee-validate';
import { useStore } from 'vuex';
import { watch, ref } from 'vue';

export default {
  props: {
    path: {
      required: true,
      type: String,
    },
    title: {
      default: undefined,
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const city = useFieldValue(`${props.path}.address.city`);
    const cityMeta = useFieldValue(`${props.path}.address.city-s`);
    const street = useFieldValue(`${props.path}.address.street`);
    const streetMeta = useFieldValue(`${props.path}.address.street-s`);
    const building = useFieldValue(`${props.path}.address.building`);
    const buildingMeta = useFieldValue(`${props.path}.address.building-s`);
    const cityRef = ref(null);
    const streetRef = ref(null);
    const buildingRef = ref(null);
    const flatRef = ref(null);

    watch(buildingMeta, () => {
      flatRef.value.handleChange('', false);
    });
    watch(streetMeta, () => {
      buildingRef.value.handleChange('', false);
      buildingRef.value.selectChange(null, false);
    });
    watch(cityMeta, () => {
      streetRef.value.handleChange('', false);
      streetRef.value.selectChange(null, false);
    });

    return {
      city,
      street,
      building,
      cityRef,
      streetRef,
      buildingRef,
      flatRef,
      fetchCities: async (query) => store.dispatch('getCity', { query }),
      fetchStreets: async (query) =>
        store.dispatch('getStreet', {
          query,
          meta: cityMeta.value,
        }),
      fetchBuildings: async (query) =>
        store.dispatch('getBuilding', {
          query,
          meta: streetMeta.value,
        }),
      optionCity: (option) => ({
        label: option.value,
        value: option.data.city_with_type || option.data.settlement_with_type,
      }),
      optionStreet: (option) => ({
        label: option.value,
        value: option.data.street_with_type,
      }),
      optionBuilding: (option) => ({
        label: option.value,
        value: option.value,
      }),
    };
  },
};
</script>

<style>
</style>
