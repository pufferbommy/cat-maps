"use client";

import { useEffect, useState } from "react";

const useCats = () => {
  const [cats, setCats] = useState<
    {
      id: string;
      position: {
        lat: number;
        lng: number;
      };
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
