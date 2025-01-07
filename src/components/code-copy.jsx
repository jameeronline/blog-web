import { useState } from "react";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  DocumentDuplicateIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const notify = () => {
    toast(<ToastDisplay className="" />);
    copy();
  };

  function ToastDisplay() {
    return (
      <div className="m-2">
        <p className="text-md m-0">Copied to clipboard !</p>
      </div>
    );
  }
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="relative">
      <button className="absolute flex flex-row  top-0 right-0 p-2">
        <span className="m-1 pb-1 basis-3/4 text-xs text-typography-quaternary">
          {language}
        </span>
        <CopyToClipboard text={code} onCopy={(copied) => notify()}>
          {copied ? (
            <CheckCircleIcon className="size-6 text-green-500" />
          ) : (
            <DocumentDuplicateIcon className="size-6 text-typography-quaternary hover:text-white" />
          )}
        </CopyToClipboard>
      </button>
      <SyntaxHighlighter
        className=""
        language={language}
        style={vs2015}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={false}
        showInlineLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
