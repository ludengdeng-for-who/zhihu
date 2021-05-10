import { onMounted, onUnmounted, Ref, ref } from "vue";

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isOutside = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isOutside.value = false;
      } else {
        isOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.addEventListener("click", handler);
  });
  return isOutside;
};

export default useClickOutside;