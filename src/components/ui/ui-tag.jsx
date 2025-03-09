import PropTypes from "prop-types";

const colorClasses = [
  {
    text: "text-primary-700",
    bg: "bg-primary-50 hover:bg-primary-100/80 hover:text-primary-900",
  },
  {
    text: "text-secondary-700",
    bg: "bg-secondary-50 hover:bg-secondary-100/80 hover:text-secondary-900",
  },
  {
    text: "text-tertiary-700",
    bg: "bg-tertiary-50 hover:bg-tertiary-100/80 hover:text-tertiary-900",
  },
  {
    text: "text-emerald-700",
    bg: "bg-emerald-50 hover:bg-emerald-100/80 hover:text-emerald-900",
  },
  {
    text: "text-slate-700",
    bg: "bg-slate-50 hover:bg-slate-100/80 hover:text-slate-900",
  },
  // Add more color classes as needed
];

import { tv } from "tailwind-variants";
function UITag({ children, index = 0 }) {
  const colorClass = colorClasses[index % colorClasses.length];

  const tagClasses = tv({
    base: `inline-flex items-center px-3 py-1 text-sm font-medium transition-colors duration-300 rounded-full whitespace-nowrap ${colorClass.text} ${colorClass.bg}`,
    variants: {
      color: {
        primary:
          "text-primary-700 bg-primary-50 hover:bg-primary-100/80 hover:text-primary-900",
        secondary:
          "text-secondary-700 bg-secondary-50 hover:bg-secondary-100/80 hover:text-secondary-900",
        tertiary:
          "text-tertiary-700 bg-tertiary-50 hover:bg-tertiary-100/80 hover:text-tertiary-900",
      },
    },
    // defaultVariants: {
    //   color: "primary",
    // },
  });

  return <span className={tagClasses()}>{children}</span>;
}

UITag.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default UITag;
