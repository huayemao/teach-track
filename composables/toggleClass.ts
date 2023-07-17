export const useToggleClass = <T>(
  state: Ref<T>,
  className: string,
  shouldKeep: (v: T, prev: T) => boolean
) => {
  watch(
    () => state.value,
    (v, prevV) => {
      if (shouldKeep(v, prevV)) {
        document
          .querySelector("#__nuxt")
          ?.firstElementChild?.classList.remove(className);
      } else {
        document
          .querySelector("#__nuxt")
          ?.firstElementChild?.classList.add(className);
      }
    }
  );
};
