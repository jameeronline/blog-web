//API
import { usePost } from "../../graph-queries/get-post";

//Router
import { useLocation, Link, useParams } from "react-router";

//Contentful Rich text renderer
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

//components
import SEO from "../../components/seo-helmet";
import InlineNewsLetter from "../../components/inline-newsletter";
import CodeBlock from "../../components/code-copy";
import SocialShare from "../../components/social-share";

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

const Post = () => {
  const { state } = useLocation();
  const { slug } = useParams();
  console.log(slug);

  const { data, isLoading, isError, error } = usePost(state.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data {JSON.stringify(error)}</div>;
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

  //options for rendering rich text
  const options = {
    renderNode: {
      [BLOCKS.QUOTE]: (node, children) => (
        <span className="text-center border-0 font-bold">{children}</span>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 id={children.toString().toLowerCase().replace(/\s+/g, '-')}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 id={children.toString().toLowerCase().replace(/\s+/g, '-')}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 id={children.toString().toLowerCase().replace(/\s+/g, '-')}>{children}</h3>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const { url, title } = embeddedAssets.find(
          (item) => item.sys.id === assetId
        );

        return (
          <figure>
            <LazyLoadImage alt={title} src={url} />
          </figure>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const inlineId = node.data.target.sys.id;
        const { code, language } = inlineEntries.find(
          (item) => item.sys.id === inlineId
        );

        return <CodeBlock code={code} language={language} />;
      },
    },
  };

  return (
    <section className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
      <article className="col-span-4 md:col-span-8">
        {/* SEO */}
        <SEO
          title={title}
          description={summary}
          name={title}
          img={postThumbnail.url}
        />

        {/* MAIN     */}
        <div className="prose prose-slate dark:prose-invert mb-10">
          {/* HEADER */}
          <header className="mb-8">
            <p className="text-primary-600 text-sm md:font-semibold md:text-base">
              <span>{formatDateString(sys.publishedAt)}</span>
            </p>
            <h1>{title}</h1>
            <div className="inline-flex items-center gap-4">
              {author && author?.avatar?.url && (
                <img
                  src={author?.avatar?.url}
                  alt={author?.name}
                  className="w-12 aspect-square rounded-full object-cover my-0"
                />
              )}
              <p className="flex flex-col gap-2 my-0">
                <Link
                  to={`/blog/author/${author?.slug}`}
                  className="text-typography-secondary font-semibold no-underline"
                >
                  {author?.name}
                </Link>

                {/* Social Share Links */}
                <SocialShare
                  url={window.location.href}
                  title={title}
                  description={summary}
                  hashtag={convertArrayToString(tagsCollection)}
                />
              </p>
            </div>
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
          {documentToReactComponents(details?.json, options)}
        </div>

        {/* FOOTER */}
        <footer>
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
        </footer>

        {/* Newsletter form */}
        <InlineNewsLetter />
      </article>

      <aside className="col-span-4 hidden lg:block">
        <PostAside details={details} />
      </aside>
    </section>
  );
};

export default Post;
