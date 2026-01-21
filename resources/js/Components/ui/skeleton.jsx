import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-slate-200/60", className)}
            {...props}
        />
    );
}

export function OrderSkeleton() {
    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
            {/* Image Skeleton */}
            <div className="w-full md:w-32 h-32 rounded-2xl bg-slate-100 animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="flex-1 space-y-4 w-full">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
                    </div>
                    <div className="h-8 w-24 bg-slate-100 rounded-full animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Action Skeleton */}
            <div className="w-full md:w-40 h-12 rounded-full bg-slate-100 animate-pulse" />
        </div>
    );
}

// Keep default export for compatibility
export default Skeleton;
