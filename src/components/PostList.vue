<template>
  <div class="post-list">
    <article
      v-for="post in list"
      :key="post._id"
      class="card mb-3 shadow-sm"
      @click="goPostDetail(post._id)"
    >
      <div class="card-body">
        <h4>
          {{ post.title }}
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img
              :src="post.image.url"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-9': post.image }" class="text-muted">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PostProps } from "@/views/testData";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup() {
    const router = useRouter();
    const goPostDetail = (_id: string) => {
      router.push(`/postDetail/${_id}`);
    };
    return {
      goPostDetail,
    };
  },
});
</script>

<style scoped>
.post-list {
  cursor: pointer;
}
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
</style>
