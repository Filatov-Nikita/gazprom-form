<template>
  <ComplexForm2 />
</template>

<script>
import AppForm from '@/components/AppForm';
import ComplexForm from '@/components/ComplexForm';
import ComplexForm2 from '@/components/ComplexForm2';

export default {
  name: 'App',
  components: {
    AppForm,
    ComplexForm,
    ComplexForm2,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply tw-font-roboto tw-text-base tw-p-8 tw-bg-gray-100;
  }

  abbr {
    text-decoration: none;
  }

  input,
  select,
  button {
    outline: none;
  }

  label,
  input,
  select {
    display: block;
    width: 100%;
  }
}
</style>
