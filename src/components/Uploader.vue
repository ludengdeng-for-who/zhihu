<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  inheritAttrs:false,
  emits: ["file-uploaded", "file-uploaded-error"],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const uploadData = ref();
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;

      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) return;
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.action, formData)
          .then((res: any) => {
            fileStatus.value = "success";
            uploadData.value = res.data;
            context.emit("file-uploaded", res.data);
          })
          .catch((err) => {
            fileStatus.value = "error";
            context.emit("file-uploaded-error", { err });
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      triggerUpload,
      fileInput,
      fileStatus,
      uploadData,
      handleFileChange,
    };
  },
});
</script>
<style scoped>
</style>