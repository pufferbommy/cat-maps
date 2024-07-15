"use client";

import { useQuery } from "@tanstack/react-query";

import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { useCatQuery } from "@/hooks/use-cat-query";

const Sidebar = () => {
  const { data: cats, isLoading } = useQuery(useCatQuery());

  return (
    <div className="p-4 w-[calc(77px*4)] space-y-4 flex-shrink-0 overflow-auto">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-square" />
          ))
        : cats?.map((cat) => <CatCard key={cat.id} cat={cat} />)}
    </div>
  );
};

export { Sidebar };
