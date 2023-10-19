import React from "react";

type TimelineItem = {
  direction: "left" | "right";
  content: string;
  title: string;
  icon: JSX.Element;
};

type TimelineProps = {
  items: TimelineItem[];
};

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="py-6 flex flex-col justify-center">
      <div className="mx-auto w-full">
        <div className="relative text-gray-700 antialiased text-sm font-semibold">
          <div className="hidden md:block w-1 bg-blue-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          <div className="md:hidden w-1 bg-blue-300 absolute h-screen left-4"></div>
          {items.map((item, index) => (
            <div
              className={`mt-6 md:mt-0 md:mb-12 ${
                item.direction === "right" ? "md:order-last" : ""
              }`}
              key={index}
            >
              <div className="flex flex-col md:flex-row items-center ">
                <div
                  className={`flex w-full justify-end sm:w-11/12 mx-auto items-center ${
                    item.direction === "left"
                      ? "md:justify-start md:pr-8"
                      : "md:justify-end md:pl-8"
                  }`}
                >
                  <div className="w-10/12 md:w-5/12 mb-10 md:mb-0">
                    <div className="p-4 bg-white rounded shadow">
                      {item.content}
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-8 rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-[1.13rem] md:left-1/2 -translate-y-4 md:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
