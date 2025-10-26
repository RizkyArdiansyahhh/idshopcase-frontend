import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/types/api";
import { flexRender, Row } from "@tanstack/react-table";

type TableContentUserProps = {
  row: Row<User>;
};
export const TableContentUser = (props: TableContentUserProps) => {
  const { row } = props;
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};
