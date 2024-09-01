import React, { useRef, useState } from "react";
import TimeLine from "./TimeLine";
interface ProjectSchema {
  date: string;
  technologies: Array<string>;
  shortDescription: string;
  primaryImage: {
    alt?: string;
    url: string;
  };
}

interface TimeLineProps {
  projects: Array<ProjectSchema>;
}

const TimeLineSection: React.FC<TimeLineProps> = ({ projects }) => {
  const projectsFiltered = projects;
  return (
    <div>
      hello
      <TimeLine projects={projectsFiltered} />
    </div>
  );
};

export default TimeLineSection;
