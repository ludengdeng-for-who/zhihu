<template>
  <form class="validate-form-container" ref="form">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from "vue";
export default defineComponent({
  emits: ["form-submit"],
  setup(props, context) {
    const form = ref(null);
    const funcList: Function[] = [];
    let resultList: boolean[] = [];
    let count = 0;
    let flag = 0;
    const submitForm = () => {
      funcList.forEach((cb) => {
        resultList.push(cb());
      });
      resultList = resultList.slice(flag);
      flag = count;
      const result: boolean = resultList.every((item) => item);
      context.emit("form-submit", result);
    };
    const changeCount = () => {
      count++;
    };
    const listInit = (func: Function) => {
      funcList.push(func);
    };
    provide("listInit", listInit);
    provide("changeCount", changeCount);
    return {
      submitForm,
      form,
    };
  },
});
</script>
<style scoped>
</style>