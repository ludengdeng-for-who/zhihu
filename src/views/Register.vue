<template>
  <validate-form @form-submit="onFormSubmit" class="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="user.email"
        placeholder="请输入邮箱"
        type="text"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">昵称</label>
      <validate-input
        :rules="nickRules"
        v-model="user.nickName"
        type="text"
        placeholder="请输入昵称"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">再次输入密码</label>
      <validate-input
        :rules="columnRules"
        v-model="user.repeatPassword"
        type="password"
        placeholder="请重新输入密码"
      ></validate-input>
    </div>
    <template v-slot:submit>
      <span class="btn btn-primary">注册</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { useRouter } from "vue-router";
import { createMessage } from "@/hooks/createMessage";
import axios from "axios";
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter();
    const user = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
    });
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱地址" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const nickRules: RulesProp = [
      { type: "required", message: "昵称不能为空" },
    ];
    const columnRules: RulesProp = [
      { type: "required", message: "重填密码不能为空" },
      {
        type: "column",
        message: "密码不一致",
        func: () => user.password === user.repeatPassword,
      },
    ];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        axios.post("/users", user).then((res) => {
          if (res.data.code === 0) {
            createMessage("注册成功", "success");
            router.push("/login");
          }
        });
      }
    };
    return {
      user,
      emailRules,
      passwordRules,
      nickRules,
      columnRules,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
</style>