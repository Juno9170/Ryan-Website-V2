import React, { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";
interface PropsSchema {
  skills: Array<SkillSchema>;
}
interface SkillSchema {
  name: string;
  relatedSkills: String[];
  value: Record<string, any>;
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
    });
  }, [api]);

  return (
    <div className="flex">
      <div className="flex flex-col justify-center pr-5 ">
        <div className="flex-1 flex flex-col justify-center">
          <ChevronUp
            onClick={() => api?.scrollPrev()}
            width={30}
            height={30}
            className=" hover:stroke-[#8DB9AA] transition-colors duration-150 ease-in-out stroke-[#86887B]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <ChevronDown
            onClick={() => api?.scrollNext()}
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
                        className=" xxl:h-28"
                      />
                    </picture>
                  </div>
                  <div className="">show</div>
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
