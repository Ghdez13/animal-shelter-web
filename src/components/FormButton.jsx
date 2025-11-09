// FormButton component for submitting forms
// Button for submitting forms with disabled state
const FormButton = ({ children, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`btn-style
        ${disabled 
          ? "opacity-50 cursor-not-allowed pointer-events-none hover:bg-(--color-bg-orange) hover:border-[#daa34b] hover:shadow-[0px_6px_0px_#d35400] active:shadow-[0px_6px_0px_#d35400] active:relative active:top-0"
          : ""}`}
    >
      {children}
    </button>
  );
};

export default FormButton;