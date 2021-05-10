<template>
  <nav class="navbar navbar-dark bg-primary mb-4">
    <div class="row">
      <div class="col-8 ml-3">
        <a class="navbar-brand" href="#">者也专栏</a>
      </div>
    </div>
    <div class="tr mr-3">
      <ul v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好，${user.nickName}`">
            <dropdown-item>
              <router-link class="dropdown-item" to="/create"
                >新建文章</router-link
              >
            </dropdown-item>
            <dropdown-item>
              <a class="dropdown-item" href="#">编辑资料</a>
            </dropdown-item>
            <dropdown-item>
              <a class="dropdown-item" href="#">退出登录</a>
            </dropdown-item>
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { UserProps } from "@/store";
export default defineComponent({
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },  
});
</script>
<style scoped>
</style>