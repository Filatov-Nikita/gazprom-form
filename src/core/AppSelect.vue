<template>
  <div>
    <AppLabel v-bind="{ label }" :for="name" :required="hasRequiredRule" />
    <select v-bind="$attrs" :id="name" class="app-select" @change="onChange">
      <option :selected="currentVal === ''" :disabled="cantEmpty" value="">Выберите из списка</option>
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        :selected="currentVal === option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <AppErrorMessage v-if="errorMessage" :msg="errorMessage" />
  </div>
</template>

<script>
import { useField, Field } from 'vee-validate';
import { computed, toRefs, watch } from 'vue';
import useRules from '@/compositions/useRules';

export default {
  props: {
    ...Field.props,
    cantEmpty: {
      default: false,
      type: Boolean
    },
    options: {
      default() {
        return [
          { label: 'Да', value: 'Yes' },
          { label: 'Нет', value: 'No' },
        ];
      },
      type: Array,
    },
  },
  setup(props) {
    const { rules } = toRefs(props);
    const { value, errorMessage, handleChange } = useField(
      props.name,
      props.rules,
      {
        label: props.label,
      }
    );
    const { hasRequiredRule } = useRules(rules);

    const optionsMap = computed(() => {
      return props.options.reduce((acc, opt) => {
        acc[opt.value] = opt;
        return acc;
      }, {});
    });

    const currentVal = computed(() => value.value?.value || '');

    const onChange = (e) => {
      const val = optionsMap.value[e.target.value] || '';
      handleChange(val);
    };

    return {
      onChange,
      currentVal,
      errorMessage,
      hasRequiredRule,
    };
  },
};
</script>

<style scoped>
.app-select {
  @apply tw-border tw-border-gray-400 tw-rounded-lg tw-h-8;
}

.app-select:hover,
.app-select:focus {
  @apply tw-border-primary tw-cursor-pointer;
}
</style>
