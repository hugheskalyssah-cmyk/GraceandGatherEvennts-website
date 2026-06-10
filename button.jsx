import React from "react";

export function Button({ asChild = false, className = "", variant = "default", children, ...props }) {
  const classes = ["button", variant === "outline" ? "secondary" : "primary", className].filter(Boolean).join(" ");

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: [classes, children.props.className].filter(Boolean).join(" ")
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
