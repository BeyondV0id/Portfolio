"use client";

import { BookOpen, Code, House, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function FloatingNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "home",
      href: "/",
      icon: House,
    },
    {
      name: "projects",
      href: "/projects",
      matcher: "/projects",
      icon: Code,
    },
    {
      name: "blogs",
      href: "/blog",
      matcher: "/blog",
      icon: BookOpen,
    },
    {
      name: "gallery",
      href: "/gallery",
      matcher: "/gallery",
      icon: ImageIcon,
    },
  ];

  return (
    <div
      id="navigation-menu"
      className="fixed bottom-4 left-1/2 z-[999] h-fit -translate-x-1/2 rounded-full bg-background/90 px-6 py-2.5 shadow-md backdrop-blur-md sm:hidden"
    >
      <div className="flex flex-row gap-7">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = Boolean(
            pathname === item.href ||
            (item.matcher && pathname.startsWith(item.matcher)),
          );
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="mb-0.5 size-4" />
                <span className="text-xxs font-medium">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
