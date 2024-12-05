import React, { useState, useRef, useEffect } from "react";
import "open-props/easings";
import "./NavigationBar.css";
interface NavigationBarProps {
  url: string;
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loc, setLoc] = useState("");
  const handleMobileNav = (href: string) => {
    if (typeof window === "undefined") {
      return;
    }
    if (loc === href || loc === href.slice(0, -1)) {
      toggleMenu();
    } else {
      window.location.href = href;
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoc(window.location.pathname);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setMenuOpen(false);
    };

    // Initialize resize handler
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to handle body overflow changes
  useEffect(() => {
    const body = document.body;

    // Toggle overflow styles with Tailwind classes
    if (menuOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }

    // Cleanup to ensure styles are reset on component unmount
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  // Toggle menu open state
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const widths = {
    width1: 121.41,
    width2: 158.41,
    width3: 136.25,
  };

  const [highlightWidth, setHighlightWidth] = useState<number>(
    props.url === "/"
      ? widths.width1
      : props.url.startsWith("/experience")
        ? widths.width2
        : widths.width3,
  );
  const [activeIndex, setActiveIndex] = useState<number>(
    props.url === "/" ? 0 : props.url.startsWith("/experience") ? 1 : 2,
  );
  const [active, setActive] = useState<boolean>(false);
  const homeButtonRef = useRef<HTMLAnchorElement>(null);
  const experienceButtonRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);

  const handleHighlightRerender = (index: number) => {
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
      : props.url.startsWith("/experience")
        ? setHighlightWidth(widths.width2)
        : setHighlightWidth(widths.width3);
    props.url === "/"
      ? setActiveIndex(0)
      : props.url.startsWith("/experience")
        ? setActiveIndex(1)
        : setActiveIndex(2);
  };

  const sharedButtonClass =
    "flex items-center justify-center px-10 z-10 hover:text-black active:text-white active:delay-0 transition-all duration-200 hover:delay-200 ease-out";
  return (
    <div className="">
      {isMobile ? (
        <>
          <div
            className={`${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-100 ease-linear fixed w-screen h-screen bg-[#ffffff] z-[500]`}
          />
          <div
            className={`${menuOpen ? "w-[200vh] h-[200vh] ease-linear" : "w-0 h-0 invisible ease-in"} transition-all rounded-bl-full duration-300 z-[1000] right-0 fixed bg-[#ECF2E4]`}
            style={menuOpen ? { transitionDelay: "-100ms" } : {}}
          />

          <div
            className={`w-screen h-screen transition-opacity ease-linear duration-300 ${menuOpen ? "opacity-100 delay-300 visible" : "delay-0 opacity-0 invisible"} fixed  z-[2000]`}
          >
            <div className="flex flex-col pl-16 pt-32 gap-20 text-[#B9BDAF]">
              {[
                { name: "Home", pathName: "/" },
                { name: "Experience", pathName: "/experience/" },
                { name: "Contact", pathName: "/contact/" },
              ].map((buttonInfo) => {
                return (
                  <div className={` text-4xl`}>
                    <button
                      className="flex gap-5 items-center"
                      onClick={() => handleMobileNav(buttonInfo.pathName)}
                    >
                      <div className="flex ">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.93317 15.0001L0.416504 13.4834L10.8165 3.08341H1.49984V0.916748H14.4998V13.9167H12.3332V4.60008L1.93317 15.0001Z"
                            fill={`${loc === buttonInfo.pathName ? "#8DB9AA" : "#B9BDAF"}`}
                          ></path>
                        </svg>
                      </div>
                      <div
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${loc === buttonInfo.pathName ? "from-[#F8E9A6] to-[#8DB9AA]" : "bg-[#B9BDAF]"} `}
                      >
                        {buttonInfo.name}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
      <div className="w-full fixed h-14 py-2 mt-3 px-8 z-[100000]">
        <div className="bg-[#EAEAEABF] backdrop-blur-md h-full w-full rounded-full flex justify-between px-4 py-1 shadow-dark-short ">
          <div className="bg-lightGreen flex font-AndersonBold h-full items-center px-8 justify-center rounded-full gap-2 group">
            <a href={"/"}>
              <div className="flex">
                <div className="max-w-0 group-hover:max-w-[14px] origin-right duration-150 ease-in-out pr-0 group-hover:pr-[3px]">{`< `}</div>
                <div className="cursor-pointer my-0 mx-auto max-w-[22px] group-hover:max-w-12 transform overflow-clip text-nowrap transition-all duration-150 ease-out">
                  <div className="roboto-semibold tracking-widest bg-lightGreen z-10">
                    {`R`}
                    <span className=" tracking-normal">{`Z/>`}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
          {isMobile ? (
            <button
              className="flex bg-lightGreen h-full items-center px-8 text-center justify-center rounded-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
            >
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
                  fill="#86887C"
                ></path>
              </svg>
            </button>
          ) : (
            <>
              <div className="flex justify-between text-[#86887B] relative">
                <div
                  className={`transition-all duration-300 absolute h-full bg-[#C0DCC3] rounded-full ${active ? "bg-black" : "bg-[#C0DCC3]"} ${activeIndex === 0 ? "left-0" : activeIndex === 2 ? "left-full -translate-x-full" : ""}`}
                  style={
                    activeIndex === 1
                      ? {
                          width: highlightWidth,
                          left: widths.width1,
                          transitionTimingFunction: "var(--ease-spring-1)",
                        }
                      : {
                          width: highlightWidth,
                          transitionTimingFunction: "var(--ease-spring-1)",
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
