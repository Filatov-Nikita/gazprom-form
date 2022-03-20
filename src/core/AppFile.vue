<template>
  <div>
    <AppLabel :label="label" :for="name" :required="hasRequiredRule" />
    <VField v-bind="{ name, rules, label }" v-slot="{ handleChange, errorMessage }">
      <AppButton class="tw-relative">
        <span>{{ fileName ? 'Изменить' : 'Прикрепить' }}</span>
        <input
          :id="name"
          class="app-file__input"
          type="file"
          @change="onChange($event, handleChange)"
        />
      </AppButton>
      <div>{{ fileName }}</div>
      <AppErrorMessage v-if="errorMessage" :msg="errorMessage" />
    </VField>
  </div>
</template>
<script>
import { Field } from 'vee-validate';
import useRules from '@/compositions/useRules';
import { toRef } from '@vue/reactivity';

export default {
  props: {
    ...Field.props,
  },
  setup(props) {
    const rules = toRef(props, 'rules');
    const { hasRequiredRule } = useRules(rules);
    return {
      hasRequiredRule,
    };
  },
  data() {
    return {
      fileName: '',
    };
  },
  methods: {
    onChange(e, handleChange) {
      const file = e.target.files[0];
      if (file) {
        handleChange(file);
        this.fileName = file.name;
      }
    },
  },
};
</script>

<style scoped>
.app-file__input {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: inherit;
}

.app-file__input::-webkit-file-upload-button {
  cursor: pointer;
}
</style>
