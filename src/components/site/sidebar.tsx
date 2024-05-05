"use client";

import CountUp from "react-countup";
import { useStore } from "@nanostores/react";

import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { $isLoadingCats, $cats } from "@/store/cats";

const Sidebar = () => {
  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  return (
    <div className="max-w-[300px] w-full flex flex-col h-full">
      <div className="flex px-4 h-20 flex-shrink-0 justify-between items-center">
        <h2 className="font-bold">Cats</h2>
        <h3 className="before:mr-2 before:content-['🐱']">
          <CountUp start={0} end={cats.length} />
        </h3>
      </div>
      <div className="flex px-4 pb-4 overflow-y-auto flex-col gap-4 h-full">
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
