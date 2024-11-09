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
const SkillCarouselMobile: React.FC<PropsSchema> = ({ skills }) => {
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
    <div className="flex">
      <div
        className="flex justify-center pt-1"
        style={{
          background:
            "linear-gradient(to right, transparent, #8DB9AA, transparent)",
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
          orientation="horizontal"
          className="w-full bg-white py-6"
        >
          <CarouselContent
            className="-mt-1
        
        "
          >
            {skills.map((skill, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 pt-0 h-fit lg:h-auto "
              >
                <div
                  className={`w-full flex items-center transition-all duration-100 ${dragging ? "border-l" : ""} ${index === (current + 2) % skills.length && !dragging ? "border-l" : ""} ${index === (current - 2 < 0 ? current - 2 + skills.length : current - 2) && !dragging ? "border-r" : ""} ${!dragging && index === current ? " border-x" : ""} `}
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
                        className=" h-12 lg:h-20 xxl:h-28"
                      />
                    </picture>
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

export default SkillCarouselMobile;
