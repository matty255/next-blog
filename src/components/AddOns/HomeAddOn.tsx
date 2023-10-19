import { PostData } from "@/types/common";

export default function HomeAddOn({
  allPostsData,
}: {
  allPostsData?: PostData[];
}) {
  return (
    <div>
      <h1>THIS PAGE IS HOME ADDON SETTINGS!</h1>
    </div>
  );
}
