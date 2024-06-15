import { atom } from "nanostores";

export const $profile = atom<Profile | null>(null);
export const $isLoadingProfile = atom<boolean>(true);

export function setProfile(data: Profile) {
  $profile.set(data);
}

export function clearProfile() {
  $profile.set(null);
}

export function setIsLoadingProfile(value: boolean) {
  $isLoadingProfile.set(value);
}
