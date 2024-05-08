"use client";

import { useStore } from "@nanostores/react";

import { Badge } from "../ui/badge";
import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { $isLoadingCats, $cats } from "@/store/cats";

const Sidebar = () => {
  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  return (
    <div className="h-1/2 sm:h-full sm:max-w-[300px] w-full flex flex-col border-r border-r-gray-100">
      <div className="flex p-4 border-b border-gray-100 flex-shrink-0 justify-between items-center">
        <h2>Cats</h2>
        <Badge variant="secondary">{cats.length}</Badge>
      </div>
      <div className="flex p-4 overflow-y-auto items-center flex-col gap-4 h-full">
        {isLoadingCats
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full shrink-0 aspect-square rounded-lg"
              />
            ))
          : cats.map((cat) => <CatCard key={cat._id} cat={cat} />)}
      </div>
    </div>
  );
};

export { Sidebar };
