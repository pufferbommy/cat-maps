import { atom } from "nanostores";

export const $cats = atom<Cat[]>([]);
export const $isLoadingCats = atom<boolean>(true);
export const $focusedCatId = atom<string | null>(null);

export function setFocusedCatId(catId: string) {
  $focusedCatId.set(catId);
}

export function setCats(data: Cat[]) {
  $cats.set(data);
}

export function setIsLoadingCats(value: boolean) {
  $isLoadingCats.set(value);
}

export function clearMyLikedCats() {
  $cats.set(
    $cats.get().map((cat) => {
      cat.liked = false;
      return cat;
    })
  );
}

export function updateLike(catId: string, updatedLiked: boolean) {
  $cats.set(
    $cats.get().map((cat) => {
      if (cat._id === catId) {
        cat.liked = updatedLiked;
        cat.totalLikes += updatedLiked ? 1 : -1;
      }
      return cat;
    })
  );
}
