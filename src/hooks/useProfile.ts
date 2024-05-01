"use client";

import * as authService from "@/services/auth";
import { setIsLoadingProfile, setProfile } from "@/store/profile";

const useProfile = () => {
  const getProfile = async (signal?: AbortSignal) => {
    try {
      setIsLoadingProfile(true);
      const profile = await authService.getProfile(signal);
      setProfile(profile);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  return {
    getProfile,
  };
};

export { useProfile };
