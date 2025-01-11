//hook
import { useRecentPosts } from "../graph-queries/recent-posts";

const withDataLoading = (WrapperComponent) => {
  return (props) => {
    const { data, isLoading, isError, error } = useRecentPosts();
    if (isLoading) return <div>Loading...++++</div>;
    if (isError) return <div>Error fetching data {JSON.stringify(error)}</div>;

    return <WrapperComponent posts={data} {...props} />;
  };
};

export default withDataLoading;
