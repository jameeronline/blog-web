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
  vs2015,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

//components
import InlineNewsLetter from "../components/inline-newsletter";

//libraries
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LazyLoadImage } from "react-lazy-load-image-component";

//utilities
import { capitalizeString, formatDateString } from "../utilities/functions";
import CodeBlock from "../components/code-copy";

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
            <CodeBlock code={code} language={language} />
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

        <div className="prose lg:prose-lg dark:prose-invert mb-10">
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
