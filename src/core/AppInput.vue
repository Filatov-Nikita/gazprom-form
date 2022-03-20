<script>
import {
  h,
  computed,
  toRefs,
  resolveComponent,
  resolveDirective,
  withDirectives,
} from 'vue';
import { Field, useField } from 'vee-validate';
import useRules from '@/compositions/useRules';

export default {
  props: {
    ...Field.props,
    type: {
      default: 'text',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { expose }) {
    const AppErrMsg = resolveComponent('AppErrorMessage');
    const AppLabel = resolveComponent('AppLabel');
    const vmaska = resolveDirective('maska');

    const { type, label, rules, name, disabled } = toRefs(props);
    const { value, errorMessage, handleChange } = useField(name, rules, {
      validateOnValueUpdate: false,
      label: props.label,
    });

    expose({ handleChange });

    const isTextArea = computed(() => type.value === 'textarea');
    const { hasRequiredRule } = useRules(rules);

    return () => {
      const inputSrc = h(isTextArea.value ? 'textarea' : 'input', {
        disabled: disabled.value,
        id: props.name,
        class: ['app-input', { 'app-input--textarea': isTextArea.value }],
        type: type.value,
        value: value.value,
        onInput: handleChange,
      });

      let input = inputSrc;

      if (props.type === 'tel') {
        input = withDirectives(inputSrc, [[vmaska, '+7 (###) ### ## ##']]);
      }

      return h('div', [
        h(AppLabel, {
          required: hasRequiredRule.value,
          label: label.value,
          for: props.name,
        }),
        input,
        errorMessage.value ? h(AppErrMsg, { msg: errorMessage.value }) : null,
      ]);
    };
  },
};
</script>

<style scoped>
.app-input {
  @apply tw-border tw-border-gray-400 tw-rounded-lg tw-h-8 tw-px-2 tw-block tw-w-full;
}

.app-input--textarea {
  min-height: 84px;
}

.app-input--textarea {
  @apply tw-h-16;
}

.app-input:hover,
.app-input:focus {
  @apply tw-border-primary;
}
</style>
