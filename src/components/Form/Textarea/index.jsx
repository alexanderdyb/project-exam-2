import React from "react";

const Textarea = React.forwardRef(({ label, placeholder, ...props }, ref) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        ref={ref}
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
        {...props}
      ></textarea>
    </label>
  );
});

export default Textarea;
