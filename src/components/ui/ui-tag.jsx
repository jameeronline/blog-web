import PropTypes from "prop-types";

import { tv } from "tailwind-variants";
function UITag({ type = "primary", children }) {
  const tagClasses = tv({
    base: "inline-flex items-center px-3 py-1 text-sm font-medium transition-colors duration-300 rounded-full whitespace-nowrap",
    variants: {
      color: {
        primary:
          "text-primary-800 bg-primary-50 hover:bg-primary-100/80 hover:text-primary-900",
        secondary:
          "text-secondary-800 bg-secondary-50 hover:bg-secondary-100/80 hover:text-secondary-900",
        tertiary:
          "text-tertiary-800 bg-tertiary-50 hover:bg-tertiary-100/80 hover:text-tertiary-900",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  });

  return <span className={tagClasses({ color: type })}>{children}</span>;
}

UITag.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default UITag;
