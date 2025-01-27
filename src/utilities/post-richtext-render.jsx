import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CodeBlock from "../components/code-copy";

export const richTextEditorRender = (data, embeddedAssets, inlineEntries) => {
  //options for rendering rich text
  const options = {
    renderNode: {
      [BLOCKS.QUOTE]: (node, children) => (
        <span className="text-center border-0 font-bold">{children}</span>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 id={children.toString().toLowerCase().replace(/\s+/g, "-")}>
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 id={children.toString().toLowerCase().replace(/\s+/g, "-")}>
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 id={children.toString().toLowerCase().replace(/\s+/g, "-")}>
          {children}
        </h3>
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

  return documentToReactComponents(data, options);
};
