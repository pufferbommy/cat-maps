import { atom } from "nanostores";

export const $previewCats = atom<PreviewCat[]>([]);
export const $isLoadingPreviewCats = atom<boolean>(true);

export function setPreviewCats(data: PreviewCat[]) {
  $previewCats.set(data);
}

export function setIsLoadingPreviewCats(value: boolean) {
  $isLoadingPreviewCats.set(value);
}
