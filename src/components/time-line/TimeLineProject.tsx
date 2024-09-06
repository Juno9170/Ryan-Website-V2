import React from "react";
interface ProjectSchema {
  projectTitle:string;
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
  console.log(JSON.stringify(project,null,3));
  const primary = project.primaryImage
  const avifUrl = primary.avifUrl || "";
  const webpUrl = primary.webpUrl || "";
  const jpgUrl = primary.jpgUrl || "";
  const fallbackUrl = primary.fallbackUrl;
  const alt = primary.alt || "primary project image";
  return (
    <div className=" w-72 h-80 overflow-clip relative rounded-2xl xl:rounded-[1.25rem] flex group">
      
        
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
        <div className="w-full flex flex-col will-change-transform justify-center h-[200%] transition-all duration-200 ease-out bg-gradient-to-t group-hover:-translate-y-[15%] from-[#8DB9AA] from-65% to-[#D9D9D910] z-20">
          <div className="px-8 pb-24">
            <h4 className=" font-Anderson text-3xl text-white">{project.projectTitle}</h4>
            <div className=" font-AndersonLight text-white text-sm hidden group-hover:block">{project.shortDescription}</div>
            <div className="flex justify-evenly">
              <div>Button1</div>
              <div>Button2</div>
              <div>Button3</div>
              
            </div>
          </div>
        </div>
        
        </div>
  );
};

export default TimeLineProject;
