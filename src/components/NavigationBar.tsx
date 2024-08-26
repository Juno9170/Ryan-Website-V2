import React, { useState, useRef, useEffect } from "react";
import "open-props/easings";
interface NavigationBarProps {
  url: string;
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const widths = {
    width1: 121.41,
    width2: 158.41,
    width3: 136.25,
  };
  // Refs for each button
  const [highlightWidth, setHighlightWidth] = useState<number>(
    props.url === "/"
      ? widths.width1
      : props.url === "/experience"
        ? widths.width2
        : widths.width3,
  );
  const [activeIndex, setActiveIndex] = useState<number>(
    props.url === "/" ? 0 : props.url === "/experience" ? 1 : 2,
  );
  const [active, setActive] = useState<boolean>(false);
  const homeButtonRef = useRef<HTMLAnchorElement>(null);
  const experienceButtonRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);

  // State to store the widths

  const handleHighlightRerender = (index: number) => {
    console.log("Handling,", index);
    switch (index) {
      case 0:
        setHighlightWidth(widths.width1);
        setActiveIndex(0);
        break;
      case 1:
        setHighlightWidth(widths.width2);
        setActiveIndex(1);
        break;
      case 2:
        setHighlightWidth(widths.width3);
        setActiveIndex(2);
        break;
      default:
        setHighlightWidth(widths.width1);
        setActiveIndex(0);
        break;
    }
  };
  const resetHighlight = () => {
    props.url === "/"
      ? setHighlightWidth(widths.width1)
      : props.url === "/experience"
        ? setHighlightWidth(widths.width2)
        : setHighlightWidth(widths.width3);
    props.url === "/"
      ? setActiveIndex(0)
      : props.url === "/experience"
        ? setActiveIndex(1)
        : setActiveIndex(2);
  };
  const sharedButtonClass =
    "flex items-center justify-center px-10 z-10 hover:text-black active:text-white active:delay-0 transition-all duration-200 hover:delay-200 ease-out";
  return (
    <div className="">
      <div className="w-full fixed h-14 py-2 mt-3 px-8">
        <div className="bg-[#EAEAEABF] backdrop-blur-md h-full w-full rounded-full flex justify-between px-4 py-1 shadow-dark-short">
          <div className="bg-lightGreen h-full items-center px-8 text-center justify-center rounded-full"></div>
          <div className="flex justify-between text-[#86887B] relative">
            <div
              className={`transition-all duration-300 ease-[var(--ease-spring-1)] absolute h-full bg-[#C0DCC3] rounded-full ${active ? "bg-black" : "bg-[#C0DCC3]"} ${activeIndex === 0 ? "left-0" : activeIndex === 2 ? "left-full -translate-x-full" : ""}`}
              style={
                activeIndex === 1
                  ? {
                      width: highlightWidth,
                      left: widths.width1,
                    }
                  : {
                      width: highlightWidth,
                    }
              }
            />
            <a
              href="/"
              className={`${sharedButtonClass} ${activeIndex === 0 ? "text-black" : ""}`}
              ref={homeButtonRef}
              onMouseEnter={() => handleHighlightRerender(0)}
              onMouseLeave={() => {
                resetHighlight();
                setActive(false);
              }}
              onMouseDown={() => setActive(true)}
              onMouseUp={() => setActive(false)}
            >
              <button className="apperance-none">Home</button>
            </a>
            <a
              href="/experience"
              className={`${sharedButtonClass} ${activeIndex === 1 ? "text-black" : ""}`}
              ref={experienceButtonRef}
              onMouseEnter={() => handleHighlightRerender(1)}
              onMouseLeave={() => {
                resetHighlight();
                setActive(false);
              }}
              onMouseDown={() => setActive(true)}
              onMouseUp={() => setActive(false)}
            >
              <button className="apperance-none">Experience</button>
            </a>
            <a
              href="/contact"
              className={`${sharedButtonClass} ${activeIndex === 2 ? "text-black" : ""}`}
              ref={contactButtonRef}
              onMouseEnter={() => handleHighlightRerender(2)}
              onMouseLeave={() => {
                resetHighlight();
                setActive(false);
              }}
              onMouseDown={() => setActive(true)}
              onMouseUp={() => setActive(false)}
            >
              <button className="apperance-none">Contact</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
