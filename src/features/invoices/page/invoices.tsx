/* eslint-disable react-hooks/exhaustive-deps */
import { getInvoices } from "@/lib/invoice-api-client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InvoiceDataTableSkeleton from "../components/invoice-data-table-skeleton";
import { DataTable } from "../components/invoice-data-table";
import { columns } from "../components/invoice-data-table/column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SearchIcon, FilterIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddInvoiceDialog from "../components/add-invoice-dialog";
import BreadCrumb from "@/components/bread-crumb";

const InvoicesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [hasMore, setHasMore] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (newSort: "asc" | "desc") => {
    setSort(newSort);
  };

  const handleReset = () => {
    setPage(0);
    setLimit(20);
    setSearch("");
    setSort("asc");
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
  }, [page, limit, search, sort]);

  const queryClient = useQueryClient();

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["invoices", { page, limit, search, sort }],
    queryFn: () => getInvoices(page, limit, search, sort),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["invoices", { page: page + 1, limit, search, sort }],
        queryFn: () =>
          getInvoices(page + 1, limit, search, sort).then((data) => {
            if (data.length === 0) {
              setHasMore(false);
            }
            return data;
          }),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  if (isLoading) {
    return <InvoiceDataTableSkeleton />;
  }

  if (error) {
    return <div>Error loading invoices</div>;
  }

  const handlePreviousPage = () => {
    if (hasMore === false) {
      setHasMore(true);
    }
    return page === 1 ? setPage(1) : setPage(page - 1);
  };

  const handleNextPage = () => {
    return hasMore ? setPage(page + 1) : setPage(page);
  };

  return (
    <>
      <div className="px-6 py-8">
        <div className="mb-8">
          <BreadCrumb
            items={[
              { title: "Home", href: "/dashboard" },
              { title: "Invoices", href: "/invoices" },
            ]}
          />
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <AddInvoiceDialog />
        </div>
        <div className="flex items-center gap-4 mb-6 w-full">
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search Invoices..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 size-5 text-muted-foreground pointer-events-none" />
          </div>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-52">
              <FilterIcon className="size-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Sort: Ascending</SelectItem>
              <SelectItem value="desc">Sort: Descending</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="destructive"
            className="ml-2 font-bold"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
        <div
          className="h-auto w-full bg-gradient-to-t from-primary/5 to-card dark:bg-card rounded-xl shadow-xs p-8 flex flex-col items-center justify-center border border-border"
          data-slot="card"
        >
          <DataTable columns={columns} data={data ?? []} />
        </div>
      </div>
      <div className="flex items-center justify-end px-6 pb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default InvoicesPage;
