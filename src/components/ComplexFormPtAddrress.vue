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
        :name="`${path}.city`"
        :fetcher="fetchCities"
        :option="optionCity"
      />
      <AppFilterSelect
        ref="streetRef"
        :disabled="!city"
        :name="`${path}.street`"
        rules="required"
        label="Улица"
        :fetcher="fetchStreets"
        :option="optionStreet"
      />
      <AppFilterSelect
        ref="buildingRef"
        :disabled="!street"
        :name="`${path}.house`"
        rules="required"
        label="Дом"
        :fetcher="fetchBuildings"
        :option="optionBuilding"
      />
      <AppInput
        ref="flatRef"
        :disabled="!building"
        :name="`${path}.flat`"
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
    const city = useFieldValue(`${props.path}.city`);
    const cityMeta = useFieldValue(`${props.path}.city-s`);
    const street = useFieldValue(`${props.path}.street`);
    const streetMeta = useFieldValue(`${props.path}.street-s`);
    const building = useFieldValue(`${props.path}.house`);
    const buildingMeta = useFieldValue(`${props.path}.house-s`);
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
