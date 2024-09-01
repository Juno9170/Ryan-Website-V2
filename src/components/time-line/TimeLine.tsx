import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import type { DraggableEvent, DraggableData } from "react-draggable";
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

const TimeLine: React.FC<TimeLineProps> = ({ projects }) => {
  projects = [
    {
      date: "2024-03-01",
      technologies: ["Tech1"],
      shortDescription: "Short description for proj beta",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2024-03-28",
      technologies: ["css"],
      shortDescription:
        "Short description for project omega, this is the second project this month.",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2024-03-01",
      technologies: ["Tech1"],
      shortDescription: "Short description for proj beta",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2024-05-01",
      technologies: ["css", "html"],
      shortDescription: "Test Short Description",
      primaryImage: {
        alt: "Placeholder Image",
        url: "https://www.datocms-assets.com/138973/1724288599-image-5-1.png",
      },
    },
    {
      date: "2024-07-31",
      technologies: ["Astro", "HTML", "CSS", "Tech 3"],
      shortDescription:
        "This is the short description of project alpha. This short description should include things that I did and the overarching goal of the project.",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2024-07-31",
      technologies: ["Astro", "HTML", "CSS", "Tech 3"],
      shortDescription:
        "This is the short description of project alpha. This short description should include things that I did and the overarching goal of the project.",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2025-07-31",
      technologies: ["Astro", "HTML", "CSS", "Tech 3"],
      shortDescription:
        "This is the short description of project alpha. This short description should include things that I did and the overarching goal of the project.",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
    {
      date: "2026-07-31",
      technologies: ["Astro", "HTML", "CSS", "Tech 3"],
      shortDescription:
        "This is the short description of project alpha. This short description should include things that I did and the overarching goal of the project.",
      primaryImage: {
        alt: undefined,
        url: "https://www.datocms-assets.com/138973/1725125156-16_9-2-width-2000.png",
      },
    },
  ];
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Function to update the viewport width
    if (typeof window === undefined) {
      return;
    }
    const updateWidth = () => setViewportWidth(window.innerWidth);

    // Set initial width
    setViewportWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener("resize", updateWidth);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const getTimeLineDataArray = (jsonArray: Array<ProjectSchema>) => {
    const data: Array<number> = [];
    let currentYearMonth: string = `${jsonArray[0].date.split("-")[0]}-${jsonArray[0].date.split("-")[1]}`;
    let currentCount: number = 0;
    jsonArray.forEach((item) => {
      const [year, month] = item.date.split("-"); // Split the date into year, month, day
      const yearMonth = `${year}-${month}`; // Combine year and month
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
  };

  const getSnappingOffsets = (sizes: Array<number>) => {
    const offsets: Array<number> = [];
    offsets.push(viewportWidth / 2 - 24);
    sizes.forEach((item, index) => {
      if (index === sizes.length - 1) {
        offsets.push(offsets[offsets.length - 1] - item * timeLineWidth - 52);
      } else {
        offsets.push(offsets[offsets.length - 1] - item * timeLineWidth - 48);
      }
    });
    return offsets;
  };
  function findClosestValue(snappingArray: number[], target: number): number {
    // Initialize the closest value with the first element of the array
    let closestValue = snappingArray[0];
    let smallestDifference = Math.abs(target - closestValue);

    // Iterate through the array to find the closest value
    for (const value of snappingArray) {
      const difference = Math.abs(target - value);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestValue = value;
      }
    }

    return closestValue;
  }

  const timeLineWidth = 400;
  const timeLineDataArray = getTimeLineDataArray(projects);
  const snappingOffsets = getSnappingOffsets(timeLineDataArray);

  const initOffset =
    timeLineDataArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    ) *
      timeLineWidth +
    timeLineDataArray.length * 48 +
    28;
  const draggedX = useRef<number>(0);
  const [finalX, setFinalX] = useState<number>(viewportWidth / 2 - initOffset);
  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    draggedX.current = data.x;
    setFinalX(findClosestValue(snappingOffsets, draggedX.current));
  };

  return (
    <div>
      <Draggable
        axis="x"
        onStop={handleStop}
        position={{ x: finalX, y: 0 }}
        defaultClassName="transition-all duration-700 ease-out"
        defaultClassNameDragging="transition-all !duration-100 ease-out"
      >
        <div className="w-fit h-6 flex items-center">
          <div className={`rounded-full bg-[#D9D9D9] h-4 w-4 mx-4 `} />
          {timeLineDataArray.map((lineData, index) => (
            <>
              <div
                className={`rounded-full bg-gradient-to-r h-1.5  ${index === timeLineDataArray.length - 1 ? "from-[#F8E9A6] to-[#F0F0ED] to-50%" : "from-[#F8E9A6] via-[#8DB9AA] to-[#F8E9A6]"} `}
                style={{ width: `${lineData * timeLineWidth}px` }}
              />
              {index !== timeLineDataArray.length - 1 ? (
                <div className={`rounded-full bg-[#D9D9D9] h-4 w-4 mx-4`} />
              ) : null}
            </>
          ))}
          <div className={`rounded-full bg-[#8DB9AA] h-full w-6 mx-4 `} />
        </div>
      </Draggable>
    </div>
  );
};

export default TimeLine;
