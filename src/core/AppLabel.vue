<template>
  <label class="tw-text-platina tw-text-sm tw-mb-1">
    <slot>{{ label }}</slot>
    <abbr v-if="required" class="tw-text-primary" title="Обязательное поле">*</abbr>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      default: undefined,
      type: String,
    },
    required: {
      default: false,
      type: Boolean
    }
  },
};
</script>
