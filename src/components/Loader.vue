<template>
  <teleport to="#back">
    <div
      class="loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || "Loading..." }}</span>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import useDOMCreate from "@/hooks/useDOMCreate";

export default defineComponent({
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  setup() {
    useDOMCreate("back");
  },
});
</script>
<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
</style>