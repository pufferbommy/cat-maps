"use client";

import { useEffect, useState } from "react";

const useCats = () => {
  const [cats, setCats] = useState<
    {
      _id: string;
      description: string;
      latitude: number;
      longitude: number;
      comments: any[];
      imageUrl: string;
      createdByUser: {
        _id: string;
        displayName: string;
      };
      createdAt: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getCats = async (signal: AbortSignal) => {
      fetch("/api/cats", {
        signal,
      }).then(async (response) => {
        const _cats = await response.json();
        setCats(_cats);
        setIsLoading(false);
      });
    };

    getCats(abortController.signal);

    return () => {
      const reason = new DOMException("Fetch aborted", "AbortError");
      abortController.abort(reason);
    };
  }, []);

  return {
    cats,
    isLoading,
  };
};

export { useCats };
