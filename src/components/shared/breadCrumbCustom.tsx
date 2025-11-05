"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const BreadcrumbCustom = () => {
  const pathName = usePathname();
  let paths = pathName.split("/").filter(Boolean);

  const lastSegment = paths[paths.length - 1];
  const isIdSegment =
    /^\d+$/.test(lastSegment) || /^[0-9a-fA-F-]{8,}$/.test(lastSegment);

  if (isIdSegment) {
    paths = paths.slice(0, -1);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
          {paths.length > 0 && <BreadcrumbSeparator />}
        </BreadcrumbItem>

        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const href = "/" + paths.slice(0, index + 1).join("/");

          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage className="capitalize">
                  {decodeURIComponent(path.replace(/[-_]/g, " "))}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {path.replace(/[-_]/g, " ")}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
