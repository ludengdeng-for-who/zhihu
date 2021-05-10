<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul
      class="dropdown-menu"
      style="display: block"
      aria-labelledby="dropdownMenuButton1"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import useClickOutside from "@/hooks/useClickOutside";
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    const dropdownRef = ref<null | HTMLElement>(null);
    const isOutSide = useClickOutside(dropdownRef);
    watch(isOutSide, () => {
      if (isOutSide.value && isOpen.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>
<style scoped>
</style>