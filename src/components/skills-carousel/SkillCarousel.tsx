import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import type { TypesafeStructuredTextGraphQlResponse } from "react-datocms";
import { activeSkill } from "@/funcs/atoms";
import { useStore } from "@nanostores/react";
import "./skillCarousel.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";
import SkillPagination from "./SkillPagination";
interface PropsSchema {
  skills: Array<SkillSchema>;
}
interface SkillSchema {
  name: string;
  relatedSkills: String[];
  fullBodyDescription: TypesafeStructuredTextGraphQlResponse;
  icon: {
    avifUrl?: string;
    webpUrl?: string;
    fallbackUrl: string;
  };
}
const SkillCarousel: React.FC<PropsSchema> = ({ skills }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const $activeSkill = useStore(activeSkill);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    api.on("pointerDown", () => {
      setDragging(true);
    });
    api.on("pointerUp", () => {
      setDragging(false);
      activeSkill.set(api.selectedScrollSnap());
    });
    api.on("slidesChanged", () => {});
    api.scrollTo($activeSkill);
  }, [api, $activeSkill]);

  return (
    <div className="flex max-h-[80vh]">
      <div className="flex flex-col justify-evenly pr-5 items-center pl-10">
        <div className="">
          <ChevronUp
            onClick={() => {
              api?.scrollPrev();
              activeSkill.set(api?.selectedScrollSnap() || 0);
            }}
            width={30}
            height={30}
            className=" hover:stroke-[#8DB9AA] transition-colors duration-150 ease-in-out stroke-[#86887B]"
          />
        </div>
        <SkillPagination size={skills.length} />
        <div className="">
          <ChevronDown
            onClick={() => {
              api?.scrollNext();
              activeSkill.set(api?.selectedScrollSnap() || 0);
            }}
            width={30}
            height={30}
            className="hover:stroke-[#8DB9AA] transition-colors duration-150 ease-in-out stroke-[#86887B]"
          />
        </div>
      </div>
      <div
        className="flex justify-center px-1 "
        style={{
          background:
            "linear-gradient(to top, transparent, #8DB9AA, transparent)",
        }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: true,
            dragThreshold: 200,
          }}
          orientation="vertical"
          className=" w-72 xl:w-96 bg-white"
        >
          <CarouselContent
            className="-mt-1 h-[80vh]
        "
          >
            {skills.map((skill, index) => (
              <CarouselItem key={index} className="basis-1/5 pt-0 ">
                <div
                  className={`w-full h-full flex items-center transition-all duration-100 ${dragging ? "border-t" : ""} ${index === (current + 2) % skills.length && !dragging ? "border-t" : ""} ${index === (current - 2 < 0 ? current - 2 + skills.length : current - 2) && !dragging ? "border-b" : ""} ${!dragging && index === current ? " border-y" : ""} `}
                >
                  <div className=" mx-auto">
                    <picture>
                      <source srcSet={skill.icon.avifUrl} type="image/avif" />
                      <source srcSet={skill.icon.webpUrl} type="image/webp" />
                      <img
                        src={skill.icon.fallbackUrl}
                        alt={`${skill.name || ""} Skill Icon`}
                        loading="eager"
                        decoding="async"
                        className=" h-20 xxl:h-28"
                      />
                    </picture>
                  </div>
                  <div
                    className=" xl: rotate-90 pt-20"
                    onClick={() => {
                      api?.scrollTo(index);
                      activeSkill.set(index);
                    }}
                  >
                    <div className="overflow-clip">
                      <div
                        className=" translate-y-2 hover:translate-y-0 transition-transform duration-300 group"
                        style={{
                          transitionTimingFunction: "var(--ease-spring-3)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-up chevron-icon"
                        >
                          <path
                            d="M17 15L12 10L7 15"
                            className="chevron-path"
                          />
                        </svg>

                        <div className="flex justify-center items center w-full">
                          <div className="rounded-full h-[5px] w-[5px] bg-[#797979] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:delay-100 duration-0 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default SkillCarousel;
