import { atom } from "nanostores";

export const $cats = atom<Cat[]>([]);
export const $isLoadingCats = atom<boolean>(true);

export function setCats(data: Cat[]) {
  $cats.set(data);
}

export function setIsLoadingCats(value: boolean) {
  $isLoadingCats.set(value);
}

export function updateLike(catId: string, updatedLiked: boolean) {
  $cats.set(
    $cats.get().map((cat) => {
      if (cat._id === catId) {
        cat.liked = updatedLiked;
      }
      return cat;
    })
  );
}
