// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { IconDotsVertical } from "@tabler/icons-react";

// export const ActionsTable = () => {
//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant={"ghost"} className="data-[state=open]:bg-muted">
//             <IconDotsVertical />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedUser(row.original);
//               setActions("view");
//               setIsOpen(true);
//             }}
//           >
//             View
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedUser(row.original);
//               setActions("edit");
//               setIsOpen(true);
//             }}
//           >
//             Edit
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             variant="destructive"
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedUser(row.original);
//               setIsOpenDialogDelete(true);
//             }}
//           >
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };
