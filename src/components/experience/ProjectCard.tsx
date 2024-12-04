import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Info } from "lucide-react";

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

interface ProjectCardProps {
  projectTitle: string;
  date: string | Date;
  shortDescription: string;
  technologies: string[];
  slug: string;
  projectLink: string;
  primaryImage: ImageSchema;
}
interface ImageSchema {
  alt?: string;
  avifUrl?: string;
  webpUrl?: string;
  jpgUrl?: string;
  fallbackUrl: string;
}

const ProjectCard = ({
  projectTitle,
  date,
  shortDescription,
  technologies,
  slug,
  projectLink,
  primaryImage,
}: ProjectCardProps) => {
  const dateObject = new Date(date);
  return (
    <div className="flex flex-col lg:flex-row overflow-hidden shadow-lg bg-transparent rounded-3xl hover:border-neutral-500 hover:shadow-2xl transition-all duration-200 ease-in border-neutral-100 border-2">
      <div className=" lg:w-[30%] relative h-64 lg:h-auto">
        <picture>
          <source srcSet={primaryImage.avifUrl} type="image/avif" />
          <source srcSet={primaryImage.webpUrl} type="image/webp" />
          <source srcSet={primaryImage.jpgUrl} type="image/jpg" />
          <img
            src={primaryImage.fallbackUrl}
            alt={primaryImage.alt}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
        </picture>
      </div>
      <Card className="lg:w-[70%] border-none bg-[#8DB9AA80] rounded-none backdrop-blur-[3px] p-5">
        <CardHeader className="p-2 lg:p-6 ">
          <CardTitle>{projectTitle}</CardTitle>
          <CardDescription>{`${formatDate(dateObject)}`}</CardDescription>
        </CardHeader>
        <CardContent className="py-0 px-2 lg:px-6 ">
          <p className="mb-4">{shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <div
                aria-label={tech}
                className="group cursor-pointer relative inline-flex py-2 items-center justify-center overflow-hidden rounded-full bg-[#55766bbd] px-4 lg:px-6 font-medium text-neutral-50"
                id={`${index}`}
              >
                <span className="absolute h-56 w-32 rounded-full bg-[#55766bbd] transition-all duration-300 group-hover:h-0 group-hover:w-0"></span>
                <span className="relative text-xs md:text-sm lg:text-base">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between py-2 lg:py-6">
          <a href={`/experience/${slug.trim()}`}>
            <Button variant="outline" className="px-2 lg:px-4">
              <Info className="mr-2 h-4 w-4" />
              Read More
            </Button>
          </a>
          <Button variant="outline" className="px-2 lg:px-4">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
