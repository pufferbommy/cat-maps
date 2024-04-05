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
    fetch("/api/cats").then(async (response) => {
      const result = await response.json();
      setCats(result);
    });
  }, []);

  return {
    cats,
  };
};

export { useCats };
