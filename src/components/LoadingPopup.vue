<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <v-progress-circular indeterminate color="#36a498"></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
}

.modal-content {
  padding: 20px;
  border-radius: 4px;
  width: auto;
}
</style>
