"use client";

import { useEffect, useState } from "react";

const useCats = () => {
  const [cats, setCats] = useState<
    {
      _id: string;
      nickname: string;
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

  useEffect(() => {
    const abortController = new AbortController();

    fetch("/api/cats", {
      signal: abortController.signal,
    }).then(async (response) => {
      const result = await response.json();
      setCats(result);
    });

    return () => abortController.abort();
  }, []);

  return {
    cats,
  };
};

export { useCats };
