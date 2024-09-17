import { forwardRef } from "react";

export const PrintableComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`printable-component bg-white p-4 text-black w-full ${props.className}`}
    >
      {children}
    </div>
  );
});
