"use client";

import { useEffect, useState } from "react";

import axios from "@/lib/axios";

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
  const [isLoadingCats, setIsLoadingCats] = useState<boolean>(true);

  useEffect(() => {
    const getCats = async () => {
      const response = await axios.get("cats");
      setCats(response.data);
      setIsLoadingCats(false);
    };

    getCats();
  }, []);

  return {
    cats,
    isLoadingCats,
  };
};

export { useCats };
