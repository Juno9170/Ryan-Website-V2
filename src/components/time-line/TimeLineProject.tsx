import React from "react";
interface ProjectSchema {
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
  index: number;
}

const TimeLineProject: React.FC<Props> = ({ project, index }) => {
  const primary = project.primaryImage
  const avifUrl = primary.avifUrl || "";
  const webpUrl = primary.webpUrl || "";
  const jpgUrl = primary.jpgUrl || "";
  const fallbackUrl = primary.fallbackUrl;
  const alt = primary.alt || "primary project image";
  return (
    <div className="w-64 h-80 overflow-clip relative rounded-2xl xl:rounded-[3rem] ">
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
        <div className="w-full h-[200%] transition-all duration-200 ease-out bg-gradient-to-t hover:-translate-y-[15%] from-[#8DB9AA] from-65% to-[#D9D9D910] z-20"></div>    </div>
  );
};

export default TimeLineProject;
