<template>
  <div>
    <AppLabel :label="label" :for="name" :required="hasRequiredRule" />
    <VField v-bind="{ name, rules, label }" v-slot="{ handleChange, errorMessage }">
      <AppButton class="tw-relative">
        <span>{{ fileName.length > 0 ? 'Изменить' : 'Прикрепить' }}</span>
        <input
          v-bind="$attrs"
          :id="name"
          class="app-file__input"
          type="file"
          @change="onChange($event, handleChange)"
        />
      </AppButton>
      <div>
        {{ fileName.join(', ') }}
      </div>
      <AppErrorMessage v-if="errorMessage" :msg="errorMessage" />
    </VField>
  </div>
</template>
<script>
import { Field } from 'vee-validate';
import useRules from '@/compositions/useRules';
import { toRef, ref } from '@vue/reactivity';

export default {
  inheritAttrs: false,
  props: {
    ...Field.props,
  },
  setup(props) {
    const fileName = ref([]);
    const rules = toRef(props, 'rules');
    const { hasRequiredRule } = useRules(rules);

    return {
      hasRequiredRule,
      fileName
    };
  },
  methods: {
    onChange(e, handleChange) {
      const files = e.target.files;
      if(!files || files.length <= 0) return;

      this.fileName = [];
      for(let file of files) {
        this.fileName.push(file.name);
      }
      handleChange(files.length === 1 ? files[0] : files);
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
