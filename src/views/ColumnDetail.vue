<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center" v-if="column.avatar">
        <img
          :src="column.avatar.url"
          :alt="column.title"
          class="rounded-circle border image"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { testData, testPosts } from "./testData";
import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const currentId = route.params.id;
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    const column = computed(()=>store.getters.getColumnById(currentId))
    const list = computed(()=>store.getters.getPostsById(currentId))
    return {
      list,
      column,
    };
  },
});
</script>
<style scoped>
.image {
  width: 100px;
}
</style>