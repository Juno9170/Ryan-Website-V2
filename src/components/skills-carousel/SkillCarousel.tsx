import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const SkillCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop:true
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[400px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="py-5 basis-1/3">
            <div className="w-full h-full py-10 bg-red-200">
              PP
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default SkillCarousel