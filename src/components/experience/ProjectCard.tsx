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
    <div className="flex flex-col md:flex-row overflow-hidden shadow-lg bg-transparent rounded-3xl border-neutral-100 border-2">
      <div className=" md:w-[30%] relative h-64 md:h-auto">
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
      <Card className="md:w-[70%] border-none bg-[#8DB9AA80] rounded-none">
        <CardHeader>
          <CardTitle>{projectTitle}</CardTitle>
          <CardDescription>{`${formatDate(dateObject)}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-[#55766bbd] text-white font-AndersonLight px-3 py-2 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Read More
          </Button>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
