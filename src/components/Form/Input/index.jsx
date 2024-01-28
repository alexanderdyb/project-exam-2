import React from "react";

const Input = React.forwardRef(({ label, placeholder, ...props }, ref) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...props}
      />
    </label>
  );
});

export default Input;
