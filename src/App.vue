<template>
  <ComplexForm />
</template>

<script>
import AppForm from '@/components/AppForm.vue';
import ComplexForm from '@/components/ComplexForm.vue';

export default {
  name: 'App',
  components: {
    AppForm,
    ComplexForm,
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  label,
  select,
  input {
    display: block;
    width: 100%;
    margin-bottom: 2px;
    height: 30px;
    box-sizing: border-box;
  }

  select option:disabled {
    color: #d3d3d3;
  }

  form {
    display: block;
    width: 100%;
  }

  button {
    margin-top: 20px;
  }
}
</style>
