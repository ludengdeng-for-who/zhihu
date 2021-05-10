<template>
  <teleport to="#message">
    <div
      class="alert message message-info fixed-top mx-auto"
      role="alert"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType, onUnmounted, ref } from "vue";
export type MessageType = "success" | "error" | "default";
import useDOMCreate from "@/hooks/useDOMCreate";
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: "default",
    },
  },
  emits: ["claose-message"],
  setup(props, context) {
    useDOMCreate("message");
    const isVisible = ref(true);
    const classObject = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default",
    };
    const hide = () => {
      isVisible.value = false;
      context.emit("claose-message", true);
    };
    return {
      classObject,
      hide,
      isVisible,
    };
  },
});
</script>
<style scoped>
.message {
  display: flex;
  width: 500px;
  justify-content: space-between;
}
</style>