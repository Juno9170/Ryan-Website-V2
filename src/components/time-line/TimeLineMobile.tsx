import * as React from "react";
import { useState, useEffect } from "react";
import ProjectCard from "../experience/ProjectCard";
import { type CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface ProjectSchema {
  githubLink: string;
  projectLink: string;
  projectTitle: string;
  date: string;
  slug: string;
  technologies: Array<string>;
  shortDescription: string;
  primaryImage: {
    alt?: string;
    avifUrl?: string;
    webpUrl?: string;
    jpgUrl?: string;
    fallbackUrl: string;
  };
}

interface TimeLineProps {
  projects: Array<ProjectSchema>;
}
const TimeLineMobile: React.FC<TimeLineProps> = ({ projects }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  const formatDate = (input: Date | string): string => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Parse the input to a Date object
    const date = typeof input === "string" ? new Date(input) : input;

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }

    const fullMonthName = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${fullMonthName} ${day}, ${year}`;
  };
  return (
    <>
      <div className="flex justify-center roboto-regular py-1">
        {projects[current].date
          ? formatDate(projects[current].date)
          : "date unavailable"}
      </div>
      <div className="flex justify-center roboto-regular py-1">
        {current}/{projects.length}
      </div>
      <div className="flex justify-center">
        <Carousel
          className="w-full px-2 sm:p-0 sm:w-2/3 lg:w-1/2"
          setApi={setApi}
        >
          <CarouselContent>
            {projects.map((p, index) => (
              <CarouselItem key={index}>
                <ProjectCard
                  projectLink={p.projectLink}
                  projectTitle={p.projectTitle}
                  primaryImage={p.primaryImage}
                  technologies={p.technologies}
                  slug={p.slug}
                  date={p.date}
                  shortDescription={p.shortDescription}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default TimeLineMobile;
