import { atom } from "nanostores";

export const $isLoading = atom<boolean>(false);

export function setFullLoader(newValue: boolean) {
  $isLoading.set(newValue);
}
