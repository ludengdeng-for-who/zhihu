<template>
  <div class="row">
    <div v-for="item in list" :key="item.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar.url" :alt="item.title" class="images" />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <router-link
            :to="`/columnDetail/${item._id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ColumnProps } from "@/store/index";
export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true,
    },
  },
  setup(props) {},
});
</script>
<style scoped>
.text-left {
  text-align: left;
}
.images {
  width: 60px;
  margin: 20px 0;
  border-radius: 50%;
}
</style>