import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

const PostAside = ({ details }) => {
  const [headings, setHeadings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Add this function to extract headings
  const extractHeadings = useCallback(() => {
    const content = details?.json?.content || [];
    const extractedHeadings = content
      .filter((item) => item.nodeType.startsWith("heading-"))
      .map((item) => ({
        id: item.content[0].value.toLowerCase().replace(/\s+/g, "-"),
        text: item.content[0].value,
        level: parseInt(item.nodeType.split("-")[1]),
      }));
    setHeadings(extractedHeadings);
  }, [details]);

  //scroll to heading
  const scrollToHeading = (headingId) => (e) => {
    e.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without triggering a route change
      window.history.pushState(null, "", `${location.pathname}#${headingId}`);
    }
  };

  // Add useEffect to extract headings when content loads
  useEffect(() => {
    if (details?.json) {
      extractHeadings();
    }
  }, [details, extractHeadings]);

  return (
    <div className="sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav className="flex flex-col gap-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={scrollToHeading(heading.id)}
            className={`text-typography-secondary hover:text-primary-600 no-underline
                  ${heading.level === 2 ? "pl-4" : ""}
                  ${heading.level === 3 ? "pl-8" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default PostAside;
