import { Button } from "@/components/ui/button";
import { Table as TableInstance } from "@tanstack/react-table";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

type PaginationCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: TableInstance<any>;
};
export const PaginationCard = ({ table }: PaginationCardProps) => {
  if (!table.getState().pagination) {
    return null;
  }
  return (
    <>
      <div className="flex flex-row justify-end items-center px-4 my-2 gap-7">
        <div className="flex items-center justify-between text-sm font-medium w-fit">{`Page ${
          table.getState().pagination.pageIndex + 1
        } of ${table.getPageCount()}`}</div>
        <div className="flex flex-row gap-2">
          <Button
            variant={"outline"}
            className="h-8 w-8 p-0"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronsLeft />
          </Button>
          <Button
            variant={"outline"}
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft />
          </Button>
          <Button
            variant={"outline"}
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight />
          </Button>
          <Button
            variant={"outline"}
            className="h-8 w-8 p-0"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </>
  );
};
