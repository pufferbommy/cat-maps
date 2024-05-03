"use client";

import * as catsService from "@/services/cats";
import { setCats, setIsLoadingCats } from "@/store/cats";

const useCats = () => {
  const getCats = async (signal?: AbortSignal) => {
    try {
      setIsLoadingCats(true);
      const cats = await catsService.getCats(signal);
      setCats(cats);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCats(false);
    }
  };

  return { getCats };
};

export { useCats };
