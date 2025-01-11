const withHOC = (WrapComponent) => {
  return (props) => {
    const extraProp = { prefix: "Jamal", suffix: "Mohamed Ameer" };
    return <WrapComponent {...props} {...extraProp} />;
  };
};

const InnerButton = ({ label, prefix, suffix }) => {
  return (
    <div>
      <button>
        {prefix}, {label} , {suffix}
      </button>
    </div>
  );
};

const EnhancedGreeting = withHOC(InnerButton);

export default EnhancedGreeting;
