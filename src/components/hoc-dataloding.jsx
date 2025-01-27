const withDataLoading = (useRecentPosts) => (WrapperComponent) => {
  return (props) => {
    const { data, isLoading, isError, error } = useRecentPosts();

    // Loading
    if (isLoading) return <div>Loading...</div>;

    // Error
    if (isError) return <div>Error fetching data {JSON.stringify(error)}</div>;

    // Empty
    if (!data || data.length === 0) return <div>No data available</div>;

    return <WrapperComponent posts={data} {...props} />;
  };
};

export default withDataLoading;
