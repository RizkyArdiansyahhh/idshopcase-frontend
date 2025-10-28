"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

type DrawerDetailProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string;
  children?: React.ReactNode;
};
export const DrawerDetail = (props: DrawerDetailProps) => {
  const { isOpen, setIsOpen, children, title } = props;
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerContent className="p-4">
        <DrawerHeader className="gap-1">
          <DrawerTitle className="text-2xl font-semibold flex justify-center">
            {title}
          </DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
