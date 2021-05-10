<template>
  <div>
    <div class="text-center body">
      <div class="top"></div>
      <div class="bottom">
        <h2 class="mb-3">随心写作，自由表达</h2>
        <span class="btn btn-primary">开始写文章</span>
      </div>
    </div>
    <h4 class="text-center more"><strong>发现精彩</strong></h4>
    <Column :list="list" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import Column from "@/components/ColumnList.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Column,
  },
  setup() {
    const store = useStore();
    const list = computed(() => store.state.columns);
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    return {
      list,
    };
  },
});
</script>
<style scoped>
.home {
  justify-content: center;
}
.body {
  height: 500px;
  background: url(https://static.zhihu.com/heifetz/assets/patterns.c72a480c.png)
    center no-repeat;
}
.top {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  transform: translate(0, 160px);
  background: url(https://static.zhihu.com/heifetz/assets/logo.84666bea.png) 50%
    no-repeat;
}
.bottom {
  margin-top: 150px;
}
.more {
  margin-top: 100px;
}
</style>