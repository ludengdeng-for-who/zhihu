import { Commit, createStore } from "vuex";
import axios from "axios";

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: number;
  column?: string;
  email?: string;
}
interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface PostProps {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: ImageProps |string;
  createdAt: string;
  column: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface GlobalErrorProps {
  status: boolean;
  message: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  token: string;
}
const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
};

const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: Object
) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data);
  return data;
};
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false, message: "" },
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false },
    token: localStorage.getItem("token") || "",
  },
  getters: {
    getColumnById(state) {
      return function(id: string) {
        return state.columns.find((item: any) => item._id === id);
      };
    },
    getPostsById(state) {
      return function(cid: string) {
        return state.posts.filter((item: any) => item.column === cid);
      };
    },
  },
  mutations: {
    logut(state) {
      state.token = "";
      localStorage.removeItem("token");
      Reflect.deleteProperty(axios.defaults.headers.common, "Authorization");
    },
    setLoading(state, flag) {
      state.loading = flag;
    },
    // login(state) {
    //   state.user = { ...state.user, isLogin: true, name: "luqing" };
    // },
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, payload) {
      state.columns = payload.data.list;
    },
    fetchColumn(state, payload) {
      state.columns = [payload.data];
    },
    fetchPosts(state, payload) {
      state.posts = payload.data.list;
    },
    login(state, payload) {
      state.token = payload.data.token;
      localStorage.setItem("token", payload.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${payload.data.token}`;
    },
    fetchCurrentUser(state, payload) {
      state.user = { isLogin: true, ...payload.data };
    },
    setError(state, payload: GlobalErrorProps) {
      state.error = payload;
    },
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit("/columns", "fetchColumns", commit);
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, "fetchColumn", commit);
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit);
    },
    login({ commit }, payload) {
      return postAndCommit("/user/login", "login", commit, payload);
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit(`/user/current`, "fetchCurrentUser", commit);
    },
    async loginAndFetch({ dispatch }, loginData) {
      const _ = await dispatch("login", loginData);
      return await dispatch("fetchCurrentUser");
    },
    createPost({ commit }, payload) {
      return postAndCommit("/posts", "createPost", commit, payload);
    },
  },
});

export default store;
