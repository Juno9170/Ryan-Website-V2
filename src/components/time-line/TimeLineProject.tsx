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
  return (
    <div>
      <img src={project.primaryImage.avifUrl}/>
    </div>
  );
};

export default TimeLineProject;
