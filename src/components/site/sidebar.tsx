"use client";

import CountUp from "react-countup";
import { useStore } from "@nanostores/react";

import CatCard from "../cat/cat-card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { $isLoadingCats, $cats } from "@/store/cats";
import Logo from "./logo";

const Sidebar = () => {
  const cats = useStore($cats);
  const isLoadingCats = useStore($isLoadingCats);

  return (
    <div className="max-w-[300px] w-full shadow flex flex-col h-full">
      <div className="flex px-4 h-[72px] flex-shrink-0 justify-between items-center">
        <h1 className="inline-flex items-center gap-2 font-bold bg-gradient-to-br text-transparent bg-clip-text from-orange-500 to-pink-500">
          <Logo />
          Cat Maps
        </h1>
        <h2 className="before:mr-2 before:content-['🐱']">
          <CountUp start={0} end={cats.length} />
        </h2>
      </div>
      <Separator />
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
