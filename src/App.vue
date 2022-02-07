<template>
  <AppForm />
</template>

<script>
import AppForm from '@/components/AppForm.vue';

export default {
  name: 'App',
  components: {
    AppForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

label,
select,
button,
input {
  display: block;
  width: 100%;
  margin-bottom: 2px;
  height: 30px;
  box-sizing: border-box;
}

form {
  display: block;
  width: 100%;
}

button {
  margin-top: 20px;
}
</style>
