import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import type { TypesafeStructuredTextGraphQlResponse } from "react-datocms";
import { activeSkill } from "@/funcs/atoms";
import { useStore } from "@nanostores/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
interface PropsSchema {
  skills: Array<SkillSchema>;
}
interface SkillSchema {
  name: string;
  relatedSkills: String[];
  fullBodyDescription: 
    TypesafeStructuredTextGraphQlResponse,
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
    api.on("slidesChanged", () => {
      
    });
  }, [api]);

  return (
    <div className="flex max-h-screen">
      <div className="flex flex-col justify-center pr-5 ">
        <div className="flex-1 flex flex-col justify-center">
          <ChevronUp
            onClick={() => {api?.scrollPrev();activeSkill.set(api?.selectedScrollSnap() || 0);}}
            width={30}
            height={30}
            className=" hover:stroke-[#8DB9AA] transition-colors duration-150 ease-in-out stroke-[#86887B]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <ChevronDown
            onClick={() => {api?.scrollNext();activeSkill.set(api?.selectedScrollSnap() || 0);}}
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
          className="w-96 bg-white"
        >
          <CarouselContent
            className="-mt-1 h-[90vh]
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
                      <div className=" translate-y-2 hover:translate-y-0 transition-transform duration-300 group" style={{transitionTimingFunction: "var(--ease-spring-3)"}}>
                      <ChevronUp strokeWidth={2}/>
                      <div className="rounded-full px-[3px]">
                      <div className="w-full h-[2px] bg-[#0f0f0f] opacity-0 -translate-y-1 group-hover:opacity-100 delay-100 transition-all duration-300"/> 
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
