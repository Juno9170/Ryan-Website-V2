import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import type { DraggableEvent, DraggableData } from "react-draggable";
import TimeLineProject from "./TimeLineProject";
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

const TimeLine: React.FC<TimeLineProps> = ({ projects }) => {
  
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
      <div>
        <TimeLineProject project={projects[0]} index={0}/>
      </div>
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
