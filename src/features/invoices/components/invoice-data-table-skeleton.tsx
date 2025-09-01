import { Skeleton } from "@/components/ui/skeleton";

const InvoiceDataTableSkeleton = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
            </div>
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceDataTableSkeleton;
