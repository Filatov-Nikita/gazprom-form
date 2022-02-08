<template>
  <teleport to="body">
    <div class="app-modal" v-if="modelValue">
      <slot />
    </div>
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
  height: 80vh;
  overflow-x: hidden;
  padding: 20px;
  background: white;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
}
</style>
