//API
import { usePost } from "../../graph-queries/get-post";

//Router
import { useLocation, Link, useParams } from "react-router";

//Contentful Rich text renderer
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

//components
import SEO from "../../components/seo-helmet";
import CodeBlock from "../../components/code-copy";
import SocialShare from "../../components/social-share";
import InlineNewsLetter from "../../components/inline-newsletter";

//libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

//utilities
import {
  capitalizeString,
  convertArrayToString,
  formatDateString,
} from "../../utilities/functions";
import UITag from "../../components/ui/ui-tag";
import PostAside from "./post-aside";
import { richTextEditorRender } from "../../utilities/post-richtext-render";
import RelatedPosts from "../../components/related-post";
import NoData from "@/components/no-data";
import { Spinner } from "@/components/spinner";

const Post = () => {
  const { state } = useLocation();
  const { slug } = useParams();

  const { data, isLoading, isError, error } = usePost(slug);

  //isLoading
  if (isLoading) {
    return <Spinner />;
  }

  //isError
  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
  }

  //isEmpty
  if (data.length === 0) {
    return <NoData />;
  }

  //destructure data
  const {
    title,
    author,
    summary,
    details,
    postThumbnail,
    tagsCollection,
    categoryCollection,
    sys,
  } = data;

  const embeddedAssets = details?.links?.assets?.block;
  const inlineEntries = details?.links?.entries?.inline;

  return (
    <section className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
      <article className="col-span-4 md:col-span-8 lg:col-start-3 lg:col-span-8">
        {/* SEO */}
        <SEO
          title={title}
          description={summary}
          name={title}
          img={postThumbnail.url}
        />

        {/* MAIN     */}
        <div className="prose prose-gray xl:prose-lg dark:prose-invert mb-10">
          {/* HEADER */}
          <header className="mb-8">
            <p className="text-primary-600 text-sm md:text-base font-mono">
              <span>{formatDateString(sys.publishedAt)}</span>
            </p>
            <h1>{title}</h1>
            {/* <div className="inline-flex items-center gap-4">
              {author && author?.avatar?.url && (
                <img
                  src={author?.avatar?.url}
                  alt={author?.name}
                  className="w-12 aspect-square rounded-full object-cover my-0"
                />
              )}
              <div className="flex flex-col gap-2 my-0">
                <Link
                  to={`/blog/author/${author?.slug}`}
                  className="text-typography-secondary font-semibold no-underline"
                >
                  {author?.name}
                </Link>

                <SocialShare
                  url={window.location.href}
                  title={title}
                  description={summary}
                  hashtag={convertArrayToString(tagsCollection)}
                />
              </div>
            </div> */}
          </header>

          {postThumbnail && (
            <figure>
              <LazyLoadImage
                alt={title}
                src={postThumbnail.url}
                className="w-full aspect-video object-cover"
              />
            </figure>
          )}
          {richTextEditorRender(details?.json, embeddedAssets, inlineEntries)}
          {/* {documentToReactComponents(details?.json, options)} */}
        </div>

        {/* FOOTER */}
        <footer>
          {categoryCollection.items.length > 0 && (
            <div className="flex gap-2 mb-4">
              <span className="font-semibold text-sm text-typography-secondary">
                Categories:{" "}
              </span>
              {categoryCollection.items.map(({ title, slug }) => (
                <Link key={slug} to={`/blog/category/${slug}`}>
                  <UITag type="secondary">{title}</UITag>
                </Link>
              ))}
            </div>
          )}

          {tagsCollection.items.length > 0 && (
            <div className="flex gap-2">
              <span className="font-semibold text-sm text-typography-secondary">
                Tags:{" "}
              </span>
              {tagsCollection.items.map(({ title, slug }) => (
                <Link key={slug} to={`/blog/tag/${slug}`}>
                  <UITag>{title}</UITag>
                </Link>
              ))}
            </div>
          )}
        </footer>

        {/* Newsletter form */}
        <InlineNewsLetter />
      </article>

      {/* <aside className="col-span-4 sticky top-24">
        <RelatedPosts
          tags={tagsCollection.items.map((tag) => tag.slug)}
          categories={categoryCollection.items.map((category) => category.slug)}
          currentPostId={sys.id}
        />
      </aside> */}

      {/* <aside className="col-span-4 hidden lg:block">
        <PostAside details={details} />

      </aside> */}
    </section>
  );
};

export default Post;
