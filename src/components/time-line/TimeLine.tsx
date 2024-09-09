import React, { useRef, useState, useCallback } from "react";
import Draggable from "react-draggable";
import type { DraggableEvent, DraggableData } from "react-draggable";
import TimeLineProject from "./TimeLineProject";
interface ProjectSchema {
  githubLink: string;
  projectLink: string;
  projectTitle: string;
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
  initOffset: number;
  viewportWidth: number;
  snappingOffsets: number[];
  timeLineDataArray: number[];
  timeLineWidth: number;
}
const TimeLine: React.FC<TimeLineProps> = ({
  projects,
  initOffset,
  viewportWidth,
  snappingOffsets,
  timeLineDataArray,
  timeLineWidth,
}) => {
  const findClosestValue = useCallback(
    (snappingArray: number[], target: number): number => {
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
    },
    [],
  );

  const findClosestValueRounded = useCallback(
    (arr: number[], input: number, down: boolean): number => {
      const filteredArr = down
        ? arr.filter((num) => num <= input)
        : arr.filter((num) => num >= input);

      if (filteredArr.length === 0) {
        return down ? arr[arr.length - 1] : arr[0];
      }

      const closest = filteredArr.reduce((prev, curr) =>
        Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev,
      );

      return closest;
    },
    [],
  );
  const [draggableClassName, setClassName] = useState<string>(
    "transition-transform duration-1000 ease-out",
  );
  const draggedX = useRef<number>(0);
  const startX = useRef<number>(0);
  const [finalX, setFinalX] = useState<number>(initOffset);
  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    draggedX.current = data.x;
    if (draggedX.current - 150 > startX.current) {
      setFinalX(
        findClosestValueRounded(snappingOffsets, draggedX.current, false),
      );
    } else if (draggedX.current + 150 < startX.current) {
      setFinalX(
        findClosestValueRounded(snappingOffsets, draggedX.current, true),
      );
    } else {
      setFinalX(findClosestValue(snappingOffsets, draggedX.current));
    }
    setClassName("transition-transform duration-1000 ease-out");
  };
  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    startX.current = data.x;
    setClassName("transition-none");
  };
  const getProjectCardOffset = (index: number): number => {
    const baseOffset = index * -288 - 124;
    const circleOffset = index * 48;
    const linesPassed = timeLineDataArray.slice(0, index);
    const lineLengthsPassed = linesPassed.map(
      (line) => Math.pow(line, 1 / 3) * timeLineWidth,
    );
    const sum: number = lineLengthsPassed.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    return baseOffset + circleOffset + sum;
  };
  return (
    <div>
      <Draggable
        allowAnyClick
        axis="x"
        cancel="#test"
        onStop={handleStop}
        onStart={handleStart}
        position={{ x: finalX, y: 0 }}
        defaultClassName={`${draggableClassName} will-change-transform`}
        defaultClassNameDragging="transition-none"
      >
        <div>
          <div id="test" className="appearance-none flex">
            {projects.map((project, index) => (
              <div
                style={{
                  transform: `translateX(${getProjectCardOffset(index)}px)`,
                }}
              >
                <TimeLineProject
                  project={project}
                  index={index}
                  hoverable={
                    draggableClassName ===
                    "transition-transform duration-1000 ease-out"
                  }
                />
              </div>
            ))}
          </div>

          <div className="w-fit h-6 flex items-center mt-5">
            <div className={`rounded-full bg-[#D9D9D9] h-4 w-4 mx-4 `} />
            {timeLineDataArray.map((lineData, index) => (
              <>
                <div
                  className={`rounded-full bg-gradient-to-r h-1.5  ${index === timeLineDataArray.length - 1 ? "from-[#F8E9A6] to-[#F0F0ED] to-50%" : "from-[#F8E9A6] via-[#8DB9AA] to-[#F8E9A6]"} `}
                  style={{
                    width: `${Math.pow(lineData, 1 / 3) * timeLineWidth}px`,
                  }}
                />
                {index !== timeLineDataArray.length - 1 ? (
                  <div className={`rounded-full bg-[#D9D9D9] h-4 w-4 mx-4`} />
                ) : null}
              </>
            ))}
            <div className={`rounded-full bg-[#8DB9AA] h-full w-6 mx-4 `} />
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default TimeLine;
