import React, { useMemo, useCallback, useState, useEffect } from "react";
import TimeLine from "./TimeLine";
import TimeLineMobile from "./TimeLineMobile";
interface ProjectSchema {
  githubLink: string;
  projectLink: string;
  projectTitle: string;
  date: string;
  startDate?: string;
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

const TimeLineSection: React.FC<TimeLineProps> = ({ projects }) => {
  const timeLineWidth = 150;
  const projectsFiltered = projects;
  projectsFiltered.sort((a: ProjectSchema, b: ProjectSchema) => {
    const aStartDate = new Date(a.startDate || a.date);
    const bStartDate = new Date(b.startDate || b.date);

    return aStartDate.getTime() - bStartDate.getTime();
  });

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  function calculateDateDifferences(dates: string[]): number[] {
    const daysInMonth = 30;
    const daysInYear = 12 * daysInMonth;

    const differences: number[] = [];

    for (let i = 0; i < dates.length - 1; i++) {
      const [year1, month1, day1] = dates[i].split("-").map(Number);
      const [year2, month2, day2] = dates[i + 1].split("-").map(Number);

      // Calculate total days for both dates from the start of the calendar
      const totalDays1 = year1 * daysInYear + month1 * daysInMonth + day1;
      const totalDays2 = year2 * daysInYear + month2 * daysInMonth + day2;

      // Calculate the difference in days between the two dates
      const difference = totalDays2 - totalDays1;

      differences.push(difference);
    }

    return differences;
  }

  const timeLineDataArray = useMemo(() => {
    const dates = projects.map((obj) =>
      obj.startDate ? obj.startDate : obj.date,
    );
    console.log(dates);
    return calculateDateDifferences(dates);
  }, [projects]);

  const snappingOffsets = useMemo(() => {
    const offsets: Array<number> = [];
    offsets.push(viewportWidth / 2 - 24);
    timeLineDataArray.forEach((item, index) => {
      if (index === timeLineDataArray.length - 1) {
        offsets.push(
          offsets[offsets.length - 1] -
            Math.pow(item * timeLineWidth, 2 / 3) -
            52,
        );
      } else {
        offsets.push(
          offsets[offsets.length - 1] -
            Math.pow(item * timeLineWidth, 2 / 3) -
            48,
        );
      }
    });
    return offsets;
  }, [timeLineDataArray, viewportWidth, timeLineWidth]);

  return (
    <div className="w-full overflow-clip">
      {viewportWidth >= 1024 ? (
        <>
          <p className="text-6xl font-Anderson px-20 py-10">Time Line</p>
          <TimeLine
            projects={projectsFiltered}
            timeLineWidth={timeLineWidth}
            viewportWidth={viewportWidth}
            initOffset={snappingOffsets[snappingOffsets.length - 1]}
            snappingOffsets={snappingOffsets}
            timeLineDataArray={timeLineDataArray}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center w-full overflow-clip">
          <p className="text-3xl font-AndersonBold px-6 pt-10">Time Line</p>
          <TimeLineMobile projects={projectsFiltered} />
        </div>
      )}
    </div>
  );
};

export default TimeLineSection;
