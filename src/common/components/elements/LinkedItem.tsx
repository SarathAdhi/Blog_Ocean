import clsx from "clsx";
import Link from "next/link";
import React from "react";

export type LinkProps = {
  href: string;
  shallow?: boolean;
  children?: React.ReactNode;
  name?: string;
  Icon?: React.FC<React.ComponentProps<"svg">>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkedItem: React.FC<LinkProps> = ({
  href,
  children,
  shallow = false,
  name,
  Icon,
  className,
  ...rest
}) => {
  return (
    <Link href={href} shallow={shallow}>
      <a
        className={clsx("flex", Icon && "items-center gap-1", className)}
        {...rest}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {name ? name : children}
      </a>
    </Link>
  );
};

export default LinkedItem;
