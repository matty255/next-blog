import Timeline from "@/components/AddOns/TimeLine";
import { getSortedPostsData } from "@/lib/MakePosts";
import { withDataFetch } from "../../../hoc/withDataFetch";

type TimelineItem = {
  direction: "left" | "right";
  content: string;
  title: string;
  icon: JSX.Element;
};

type TimelineProps = {
  items: TimelineItem[];
};

const items: TimelineItem[] = [
  {
    direction: "left",
    content: "Now this is a story all about how,",
    title: "Title 1",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    direction: "right",
    content: "My life got flipped turned upside down,",
    title: "Title 2",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  // ... more items
];

function Graph() {
  // const TimelineItem: React.FC<TimelineItemProps> = ({
  //   text,
  //   date,
  //   iconType,
  // }) => {
  //   return (
  //     <li className="mb-10 ml-6 relative w-64">
  //       <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
  //         <VscGitMerge className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
  //       </span>
  //       <h3 className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900 dark:text-white">
  //         {text}
  //         <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
  //           Latest
  //         </span>
  //       </h3>
  //     </li>
  //   );
  // };

  return (
    <div className="relative overflow-hidden w-full h-full rounded-xl">
      <div className=" flex flex-col justify-between md:min-h-[480px] text-center rounded-xl dark:border-gray-700">
        <div></div>
        <div className="mt-8">
          {/* <ol className="relative border-l border-gray-200 dark:border-gray-700 flex flex-col">
            {historys.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                text={item.text}
                iconType={item.iconType}
              />
            ))}
          </ol> */}

          <Timeline items={items} />
        </div>
      </div>
      <div className="absolute top-1/2 -left-1/2 -z-[1] w-60 h-32 bg-purple-200 blur-[100px] -translate-y-1/2 dark:bg-violet-900/30"></div>
    </div>
  );
}

export default withDataFetch(Graph);

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allCategories: string[] = Array.from(
    new Set(allPostsData.map((post) => post.category))
  );
  return {
    props: {
      allPostsData,
      allCategories,
    },
  };
}
