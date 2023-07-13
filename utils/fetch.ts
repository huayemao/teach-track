import pickBy from "lodash/pickBy";
import { $fetch } from "ofetch";

// todo: 不为 200 时在这里抛错
export const fetchWithAuth = $fetch.create({
  baseURL: process.env.API_BASE_URL,
  onRequest({ request, options }) {
    const jwt = localStorage.getItem("jwt");
    const headers = pickBy(
      {
        Authorization: "Bearer " + jwt,
      },
      (v) => !!v
    ) as HeadersInit;

    options.headers = { ...headers, ...options.headers };
  },
  onResponseError(e) {
    ElMessage.error("服务器开小差了~，请联系系统管理员");
  },
});
