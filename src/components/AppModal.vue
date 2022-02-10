<template>
  <teleport to="body">
    <div class="app-modal" v-if="modelValue">
      <slot />
    </div>
    <div v-if="modelValue" class="zatemnenie"></div>
  </teleport>
</template>

<script>
export default {
  props: {
    modelValue: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.app-modal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 100%;
  max-width: 500px;
  height: 340px;
  overflow-x: hidden;
  padding: 20px;
  background: white;
  z-index: 999;
  /* box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2); */
}
.zatemnenie {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  top: 0;
  left: 0;
  z-index: 998;
}
</style>
