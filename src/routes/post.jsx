//API
import { usePost } from "../graph-queries/get-post";

//Router
import { useLocation, Link, useParams } from "react-router";

//Contentful Rich text renderer
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  github,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

//components
import InlineNewsLetter from "../components/inline-newsletter";

//libraries
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LazyLoadImage } from "react-lazy-load-image-component";

//utilities
import { capitalizeString, formatDateString } from "../utilities/functions";

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

        return (
          <>
            <CopyToClipboard
              text={code}
              onCopy={() => console.log("copied to clipboard")}
            >
              <button className="inline-flex gap-1 items-center text-sm px-2 py-2 bg-gray-50 rounded border-gray-300 border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
                Copy to clipboard
              </button>
            </CopyToClipboard>
            <SyntaxHighlighter
              language={language}
              wrapLongLines={true}
              style={atomOneDark}
              className="ps-6"
            >
              {code}
            </SyntaxHighlighter>
          </>
        );
      },
    },
  };

  return (
    <article className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
      <aside className="col-span-4"></aside>
      <section className="col-span-4 md:col-span-8">
        <header className="mb-8"></header>

        <div className="prose prose-lg dark:prose-invert mb-10">
          <h1>{title}</h1>
          <div className="inline-flex items-center gap-4">
            {author && author?.avatar?.url && (
              <img
                src={author?.avatar?.url}
                alt={author?.name}
                className="w-12 aspect-square rounded-full object-cover my-0"
              />
            )}
            <p className="flex flex-col my-0">
              <Link
                to={`/blog/author/${author?.slug}`}
                className="text-primary-600 font-semibold no-underline"
              >
                {author?.name}
              </Link>
              <span className="text-typography-tertiary text-sm">
                {formatDateString(sys.publishedAt)}
              </span>
            </p>
          </div>
          {postThumbnail && (
            <figure>
              <LazyLoadImage alt={title} src={postThumbnail.url} />
            </figure>
          )}
          {documentToReactComponents(details?.json, options)}
        </div>
        <footer>
          <div className="flex gap-2 mb-4">
            {categoryCollection.items.map(({ title, slug }) => (
              <Link
                key={slug}
                to={`/blog/category/${slug}`}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-secondary-800 bg-secondary-50 hover:bg-secondary-100/80 hover:text-secondary-900 transition-colors duration-300 rounded-full"
              >
                {title}
              </Link>
            ))}
          </div>

          <div className="flex gap-2">
            {tagsCollection.items.map(({ title, slug }) => (
              <Link
                key={slug}
                to={`/blog/tag/${slug}`}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-primary-800 bg-primary-50 hover:bg-primary-100/80 hover:text-primary-900 transition-colors duration-300 rounded-full"
              >
                {capitalizeString(title)}
              </Link>
            ))}
          </div>
        </footer>

        {/* Newsletter form */}
        <InlineNewsLetter />
      </section>
    </article>
  );
};

export default Post;
