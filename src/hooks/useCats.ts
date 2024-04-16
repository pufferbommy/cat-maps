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

    fetch("/api/cats", {
      signal: abortController.signal,
    }).then(async (response) => {
      const _cats = await response.json();
      setCats(_cats);
      setIsLoading(false);
    });

    return () => abortController.abort();
  }, []);

  return {
    cats,
    isLoading,
  };
};

export { useCats };
