import { useParams } from "react-router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { usePage } from "@/graph-queries/get-static-page";

import NoData from "@/components/no-data";

const Page = () => {
  const { page_slug } = useParams();

  const { data, isLoading, isError, error } = usePage(page_slug);

  //isLoading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //isError
  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  //isEmpty
  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <article className="prose lg:max-w-screen-lg">
      <h1>{data.title}</h1>
      {data.featureImage?.url && (
        <LazyLoadImage
          alt={data.title}
          src={data.featureImage?.url} // use normal <img> attributes as props
          className="m-0 object-cover w-full h-80 rounded-3xl grayscale"
        />
      )}
      {documentToReactComponents(data.body.json)}
    </article>
  );
};

export default Page;
