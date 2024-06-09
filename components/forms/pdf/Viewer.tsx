import { forwardRef } from "react";

export const PrintableComponent = forwardRef<HTMLDivElement,  React.HTMLAttributes<HTMLDivElement>>(({ children , ...props }, ref) => {
    return (<div ref={ref} {...props} className={`bg-white p-4 h-full text-black w-full ${props.className}`}>
        {children} 
    </div>)
});
