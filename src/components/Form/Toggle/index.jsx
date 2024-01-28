import React from "react";

const Toggle = React.forwardRef(({ label, ...props }, ref) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input type="checkbox" className="toggle" ref={ref} {...props} />
      </label>
    </div>
  );
});

export default Toggle;
