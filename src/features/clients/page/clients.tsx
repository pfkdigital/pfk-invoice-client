import { DataTable } from "../components/client-data-table/data-table";
import { columns } from "../components/client-data-table/coloumn";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getClients } from "@/lib/client-api-client";
import DataTableSkeleton from "../components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FilterIcon, SearchIcon } from "lucide-react";
import AddClientDialog from "../components/add-client-dialog";
import BreadCrumb from "@/components/bread-crumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { ClientDto } from "@/types/client.types";

const ClientsPage = () => {
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
    setPage(1);
    setLimit(15);
    setSearch("");
    setSort("asc");
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["clients"] });
  }, [page, limit, search, sort, queryClient]);

  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: ["clients", { page, limit, search, sort }],
    queryFn: () => getClients(page, limit, search, sort),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["clients", { page: page + 1, limit, search, sort }],
        queryFn: () =>
          getClients(page + 1, limit, search, sort).then(
            (data: ClientDto[]) => {
              if (data.length === 0) {
                setHasMore(false);
              }
              return data;
            }
          ),
      });
    }
  }, [data, isPlaceholderData, page, limit, search, sort, hasMore, queryClient]);

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  if (error) {
    return <div>Error loading clients</div>;
  }

  const handlePreviousPage = () => {
    if(hasMore === false) {
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
              { title: "Clients", href: "/clients" },
            ]}
          />
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <AddClientDialog />
        </div>
        <div className="flex items-center gap-4 mb-6 w-full">
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search clients by name..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 size-5 text-muted-foreground pointer-events-none" />
          </div>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-36">
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
          className="h-full w-full bg-gradient-to-t from-primary/5 to-card dark:bg-card rounded-xl shadow-xs p-8 flex flex-col items-center justify-center border border-border"
          data-slot="card"
        >
          {isLoading && !data ? (
            <DataTableSkeleton />
          ) : (
            <DataTable columns={columns} data={data ?? []} />
          )}
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

export default ClientsPage;
