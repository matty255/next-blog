import React, { FC } from "react";
import Layout from "@/layout";
import { PostData } from "@/types/common";

interface WithDataFetchProps {
  allPostsData?: PostData[];
  postData?: PostData;
}

export const withDataFetch = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithDataFetchProps> => {
  const WithSidebarData: React.FC<P & WithDataFetchProps> = (props) => {
    const { allPostsData, postData } = props;

    return (
      <Layout allPostsData={allPostsData} postData={postData}>
        <WrappedComponent {...(props as P)} />
      </Layout>
    );
  };

  return WithSidebarData;
};
