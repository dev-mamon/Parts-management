import React from "react";

/**
 * A premium, smooth-pulsing Skeleton component for loading states.
 */
export const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={`
                animate-pulse 
                bg-slate-200/60 
                rounded-md 
                ${className || ""}
            `}
            {...props}
        />
    );
};

export default Skeleton;
