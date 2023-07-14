import localforage from "localforage";
import { onMounted, ref } from "vue";

export const useStorageState = <T>(key: string, defaultValue?: T) => {
  const data = ref(defaultValue);
  const pending = ref<boolean>(true);
  onMounted(async () => {
    const res = await localforage.getItem(key);
    if (!!res) {
      data.value = res as T;
    }

    pending.value = false;
  });

  function mutate(v) {
    data.value = v;
    localforage.setItem(key, v);
  }

  return { data, pending, mutate };
};
