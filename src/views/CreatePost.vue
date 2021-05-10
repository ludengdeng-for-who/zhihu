<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      action="/upload"
      class="upload-body bg-light text-secondary"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
    >
      <h2>点击上传头像</h2>
      <template #loading>
        <h2>loading...</h2>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" width="500" />
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          placeholder="请输入文章标题"
          :rules="rules"
          v-model="title"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          :rules="rules"
          v-model="content"
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <button class="btn btn-primary btn-large">发表文章</button>.
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { useRouter } from "vue-router";
import { createMessage } from "@/hooks/createMessage";
import Uploader from "@/components/Uploader.vue";

import axios from "axios";
export default defineComponent({
  components: { ValidateForm, ValidateInput, Uploader },
  setup() {
    const title = ref("");
    const content = ref("");
    const store = useStore();
    const router = useRouter();
    let imageId = "";
    const rules: RulesProp = [{ type: "required", message: "内容不能为空" }];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost = {
            title: title.value,
            content: content.value,
            column,
            author: _id,
            image: "",
          };
          if (imageId) {
            newPost.image = imageId;
          }
          store.dispatch("createPost", newPost).then(()=>{
            createMessage("创建成功！","success");
            router.push(`/columnDetail/${column}`);
          })
        }
      }
    };
    const beforeUpload = (file: File) => {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        createMessage("只能上传jpg格式", "error");
      }
      return isJPG;
    };
    const onFileUploaded = (data: any) => {
      if (data.data._id) {
        imageId = data.data._id;
      }
      createMessage(`上传图片ID：${data.data._id}`, "success");
    };
    return {
      onFormSubmit,
      title,
      content,
      rules,
      beforeUpload,
      onFileUploaded,
    };
  },
});
</script>
<style>
.upload-body {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 200px;
}
.upload-body img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>