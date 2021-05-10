<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      :="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      :="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, reactive } from "vue";
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

interface RuleProp {
  type: "required" | "email" | "column";
  message: string;
  func?: () => boolean;
}
export type RulesProp = RuleProp[];
export type tagType = "input" | "textarea";
export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RulesProp>,
    },
    modelValue: String,
    tag: {
      type: String as PropType<tagType>,
      default: "input",
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            case "column":
              passed = (rule.func as Function)();
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const listInit: Function | undefined = inject("listInit");
    const changeCount: Function | undefined = inject("changeCount");
    (listInit as Function)(validateInput);
    (changeCount as Function)();
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
<style scoped>
</style>