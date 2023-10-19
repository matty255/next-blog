import Layout from "@/layout";
import { VscGitMerge } from "react-icons/vsc";
import Date from "@/common/Date";
import { historys } from "@/constants/profile";
import { getSortedPostsData } from "@/lib/MakePosts";
import { withDataFetch } from "../../../hoc/withDataFetch";

interface TimelineItemProps {
  text: string;
  iconType: string;
  date: string;
}

interface TimelineProps {
  items: { text: string; date: string; iconType: string }[];
}

function Graph() {
  const TimelineItem: React.FC<TimelineItemProps> = ({
    text,
    date,
    iconType,
  }) => {
    return (
      <li className="mb-10 ml-6 relative w-64">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <VscGitMerge className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
        </span>
        <h3 className="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {text}
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
            Latest
          </span>
        </h3>
      </li>
    );
  };

  return (
    <div className="relative overflow-hidden w-full h-full rounded-xl">
      <div className="p-6 flex flex-col justify-between md:min-h-[480px] text-center rounded-xl dark:border-gray-700">
        <div></div>
        <div className="mt-8">
          <ol className="relative border-l border-gray-200 dark:border-gray-700 flex flex-col">
            {historys.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                text={item.text}
                iconType={item.iconType}
              />
            ))}
          </ol>
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
