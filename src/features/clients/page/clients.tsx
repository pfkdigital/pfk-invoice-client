import { DataTable } from "../components/client-data-table/data-table";
import { columns } from "../components/client-data-table/coloumn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClients } from "@/lib/client-api-client";
import DataTableSkeleton from "../components/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FilterIcon, SearchIcon } from "lucide-react";
import AddClientDialog from "../components/add-client-dialog";

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<'asc' | 'desc'>("asc");
  const client = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(search, sort),
    staleTime: 1000 * 60 * 5,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    client.invalidateQueries({ queryKey: ['clients'] });
  }

  const handleSortChange = (newSort: 'asc' | 'desc') => {
    setSort(newSort);
    client.invalidateQueries({ queryKey: ['clients'] });
  }

  const handleReset = () => {
    setSearch("");
    setSort("desc");
    client.invalidateQueries({ queryKey: ['clients'] });
  }

  return (
    <div className="px-6 py-8">
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
        {isLoading && !data ? (<DataTableSkeleton />) : (
          <DataTable columns={columns} data={data ?? []} />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;