<template>
  <validate-form @form-submit="onFormSubmit" class="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱"
        type="text"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="password"
        type="password"
        placeholder="请输入密码"
      ></validate-input>
    </div>
    <template v-slot:submit>
      <span class="btn btn-primary">登录</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {createMessage} from "@/hooks/createMessage";

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup(props) {
    const router = useRouter();
    const emailVal = ref("111@test.com");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱地址" },
    ];
    const password = ref("111111");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const store = useStore();
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: password.value,
        };
        store
          .dispatch("loginAndFetch", payload)
          .then((res) => {
            createMessage("登录成功","success")
            router.push(`/`);
          })
          .catch((err) => {});
      }
    };
    return {
      emailRules,
      passwordRules,
      emailVal,
      password,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
</style>