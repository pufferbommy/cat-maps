"use client";

import { useStore } from "@nanostores/react";

import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { $isLoadingCats, $cats } from "@/store/cats";
import { Badge } from "../ui/badge";

const Sidebar = () => {
  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  return (
    <div className="max-w-[300px] w-full flex flex-col h-full border-r border-r-gray-100">
      <div className="flex p-4 border-b border-gray-100 flex-shrink-0 justify-between items-center">
        <h2>Cats</h2>
        <Badge variant="secondary">{cats.length}</Badge>
      </div>
      <div className="flex p-4 overflow-y-auto flex-col gap-4 h-full">
        {isLoadingCats
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full shrink-0 aspect-square rounded-lg"
              />
            ))
          : cats.map((cat) => <CatCard key={cat._id} cat={cat} />)}
      </div>
    </div>
  );
};

export { Sidebar };
