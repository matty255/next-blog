import React, { ReactElement, useRef } from "react";

type ScrollSnapProps = {
  components: ReactElement[];
};

const ScrollSnap: React.FC<ScrollSnapProps> = ({ components }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        top: container.clientHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="snap-y snap-mandatory h-screen w-full overflow-y-scroll scrollbar-hide"
    >
      {components.map((component, index) => (
        <div
          key={index}
          className="snap-always snap-center h-screen w-full flex items-center justify-center"
        >
          {component}
        </div>
      ))}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full"
        onClick={scrollToNext}
      >
        Next
      </button>
    </div>
  );
};

export default ScrollSnap;
