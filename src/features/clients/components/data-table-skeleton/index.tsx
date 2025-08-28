import { Skeleton } from "@/components/ui/skeleton";

const DataTableSkeleton = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
    );
};

export default DataTableSkeleton;
