<template>
  <div class="tw-flex tw-items-center tw-space-x-3">
    <input
      class="tw-w-auto"
      :id="name"
      type="checkbox"
      :value="value"
      :checked="checked"
      @change="handleChange"
    />
    <AppLabel
      class="tw-mt-1"
      :required="hasRequiredRule"
      :for="name"
      v-bind="{ label }"
    />
    <!-- <AppErrorMessage v-if="errorMessage" :msg="errorMessage" /> -->
  </div>
</template>

<script>
import { toRefs } from 'vue';
import useRules from '@/compositions/useRules';
import { Field, useField } from 'vee-validate';

export default {
  props: {
    ...Field.props,
    value: {
      type: null,
    },
  },
  setup(props) {
    const { rules } = toRefs(props);
    const { hasRequiredRule } = useRules(rules);
    const { errorMessage, handleChange, checked } = useField(
      props.name,
      props.rules,
      {
        type: 'checkbox',
        checkedValue: props.value,
      }
    );

    return {
      hasRequiredRule,
      errorMessage,
      checked,
      handleChange,
    };
  },
};
</script>
