"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";

const usePreviewCats = () => {
  const [previewCats, setPreviewCats] = useState<PreviewCat[]>([]);
  const [isLoadingPreviewCats, setIsLoadingPreviewCats] =
    useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getPreviewCats = async (signal: AbortSignal) => {
      try {
        const response = await axios.get<BaseResponse<PreviewCat[]>>("cats", {
          signal,
        });
        setPreviewCats(response.data.data!);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingPreviewCats(false);
      }
    };

    getPreviewCats(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    previewCats,
    isLoadingPreviewCats,
  };
};

export { usePreviewCats };
