import React, { useMemo, useCallback, useState, useEffect } from "react";
import TimeLine from "./TimeLine";
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

interface TimeLineProps {
  projects: Array<ProjectSchema>;
}

const TimeLineSection: React.FC<TimeLineProps> = ({ projects }) => {
  const timeLineWidth = 500;
  const projectsFiltered = projects;

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const timeLineDataArray = useMemo(() => {
    const data: Array<number> = [];
    let currentYearMonth: string = `${projects[0].date.split("-")[0]}-${projects[0].date.split("-")[1]}`;
    let currentCount: number = 0;
    projects.forEach((item) => {
      const [year, month] = item.date.split("-");
      const yearMonth = `${year}-${month}`;
      if (yearMonth === currentYearMonth) {
        currentCount++;
      } else {
        data.push(currentCount);
        currentYearMonth = yearMonth;
        currentCount = 1;
      }
    });
    data.push(currentCount);
    return data;
  }, [projects]);

  const snappingOffsets = useMemo(() => {
    const offsets: Array<number> = [];
    offsets.push(viewportWidth / 2 - 24);
    timeLineDataArray.forEach((item, index) => {
      if (index === timeLineDataArray.length - 1) {
        offsets.push(offsets[offsets.length - 1] - item * timeLineWidth - 52);
      } else {
        offsets.push(offsets[offsets.length - 1] - item * timeLineWidth - 48);
      }
    });
    return offsets;
  }, [timeLineDataArray, viewportWidth, timeLineWidth]);

  const initOffset = useMemo(() => {
    return (
      timeLineDataArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      ) *
        timeLineWidth +
      timeLineDataArray.length * 48 +
      28
    );
  }, [timeLineDataArray, timeLineWidth]);
  return (
    <div>
      <TimeLine
        projects={projectsFiltered}
        timeLineWidth={timeLineWidth}
        viewportWidth={viewportWidth}
        initOffset={initOffset}
        snappingOffsets={snappingOffsets}
        timeLineDataArray={timeLineDataArray}
      />
    </div>
  );
};

export default TimeLineSection;
