import { atom } from "nanostores";

export const $profile = atom<Profile | null>(null);
export const $isLoading = atom<boolean>(true);

export function setProfile(data: Profile) {
  $profile.set(data);
}

export function clearProfile() {
  $profile.set(null);
}

export function setIsLoading(value: boolean) {
  $isLoading.set(value);
}
