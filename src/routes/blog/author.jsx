import { useParams } from "react-router";
import { useAuthor } from "@queries/get-author-posts";
import { useAuthorDetails } from "@queries/get-queries";

//hoc
import withDataLoading from "@/components/hoc-data-loading";

//components
import PostGrid from "@components/post-grid";

const Author = () => {
  const { author } = useParams();

  const { data, isLoading, isError, error } = useAuthor(author);
  const {
    data: authorData,
    isLoading: isLoadingAuthor,
    isError: isErrorAuthor,
    error: errorAuthor,
  } = useAuthorDetails(author);

  if (isLoading || isLoadingAuthor) {
    return <div>Loading...</div>;
  }

  if (isError || isErrorAuthor) {
    return (
      <div>
        Error fetching data{" "}
        {JSON.stringify(error) || JSON.stringify(errorAuthor)}
      </div>
    );
  }

  const { name, avatar } = authorData[0];

  return (
    <section className="">
      <header className="mb-12 mt-12 text-center">
        <figure className="flex justify-center mb-6">
          {author && avatar?.url && (
            <img
              src={avatar?.url}
              alt={name}
              className="w-16 aspect-square rounded-full object-cover my-0"
            />
          )}
        </figure>
        <div>
          <p className="text-xs text-typography-tertiary uppercase">
            <span>Blog Posts By</span>
          </p>
          <h1 className="text-2xl font-bold"> {name}</h1>
          <p className="text-primary-600 text-sm">
            (<span>{data?.length}</span> items)
          </p>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-8 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
        <PostGrid posts={data} />
      </div>
    </section>
  );
};

export default Author;
