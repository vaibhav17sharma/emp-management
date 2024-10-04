"use client";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const BreadcrumbsDynamic = ({
  home,
  url,
  type,
}: {
  home: string;
  url: string;
  type: string;
}) => {
  const pathname = usePathname();

  usePathname();

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split(`/${type}/`).filter(Boolean);

    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      if (segment === "dashboard") {
        return null;
      }
      return (
        <Fragment key={href}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {index === pathSegments.length - 1 ? (
              <BreadcrumbPage>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbLink>
            )}
            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        </Fragment>
      );
    });
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={url}>{home}</BreadcrumbLink>
        </BreadcrumbItem>
        {getBreadcrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsDynamic;
