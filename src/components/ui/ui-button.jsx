import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

export default function UIButton({ children, type }) {
  const buttonClasses = tv({
    base: "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none",
    variants: {
      type: {
        primary:
          "bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-700 disabled:border-gray-300 disabled:bg-gray-300",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 focus:bg-secondary-700 disabled:border-secondary-300 disabled:bg-secondary-300",
      },
    },
    defaultVariants: {
      type: "primary",
    },
  });

  return <button className={buttonClasses({ type })}>{children}</button>;
}

UIButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
