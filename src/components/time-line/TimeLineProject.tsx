import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button.tsx";
import { ArrowRight, Github } from "lucide-react";
import "open-props/easings";
interface ProjectSchema {
  githubLink?: string;
  projectLink?: string;
  projectTitle: string;
  date: string;
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
interface Props {
  project: ProjectSchema;
  index?: number;
  hoverable: boolean;
}

const TimeLineProject: React.FC<Props> = ({ project, index, hoverable }) => {
  const primary = project.primaryImage;
  const avifUrl = primary.avifUrl || "";
  const webpUrl = primary.webpUrl || "";
  const jpgUrl = primary.jpgUrl || "";
  const fallbackUrl = primary.fallbackUrl;
  const alt = primary.alt || "primary project image";
  const [isInViewport, setIsInViewport] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("Entry:", entry); // Log the entry to debug
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null, // The viewport
        rootMargin: "150px", // Adjust rootMargin if necessary
        threshold: 0, // Trigger as soon as any part is in view
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isInViewport ? (
        <div
          className={`w-72 h-80 overflow-clip relative rounded-2xl xl:rounded-[1.25rem] flex ${hoverable ? "group" : ""}`}
        >
          <picture>
            <source srcSet={avifUrl} type="image/avif" />
            <source srcSet={webpUrl} type="image/webp" />
            <source srcSet={jpgUrl} type="image/jpg" />
            <img
              src={fallbackUrl}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover absolute -z-10 inset-0"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-t from-[#8db9aab2] from-25% to-[#d9d9d96c] z-10 group-hover:brightness-50 transition-all duration-500 ease-in-out" />

          <div className="relative z-20 h-full flex flex-col justify-end p-6  text-white w-full">
            <h2 className="text-2xl font-bold mb-2 transition-all ease-in-out translate-y-0 duration-700 group-hover:-translate-y-6">
              {project.projectTitle}
              <br />
              <p className=" text-xs font-AndersonLight">{project.date}</p>
            </h2>
            <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-full">
              <p className="">{project.shortDescription}</p>
              <div className="flex justify-between pt-5">
                <Button
                  variant="link"
                  className="text-white hover:text-green-900 p-0"
                >
                  View More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <a href={project.githubLink} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-trasparant hover:bg-green-950 hover:border-none"
                  >
                    <Github className="h-4 w-4 text-white" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-72 invisible"></div>
      )}
    </div>
  );
};

export default TimeLineProject;
