import { atom } from "nanostores";

export const $isLoading = atom<boolean>(true);

export function setFullLoader(newValue: boolean) {
  $isLoading.set(newValue);
}
