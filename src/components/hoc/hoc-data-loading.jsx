import { Spinner } from "../spinner";

//Feedback component
import NoData from "../no-data";

const withDataLoading = (useFetchPosts, args) => (WrapperComponent) => {
  return (props) => {
    const { data, isLoading, isError, error } = args
      ? useFetchPosts(...args)
      : useFetchPosts();

    // Loading
    if (isLoading) return <Spinner />;

    // Error
    if (isError) return <div>Error fetching data {JSON.stringify(error)}</div>;

    // if Empty
    if (!data || data.length === 0) return <NoData />;

    return <WrapperComponent posts={data} {...props} />;
  };
};

export default withDataLoading;
