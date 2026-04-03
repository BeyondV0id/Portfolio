"use client";

import { Code, Feather,House } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function FloatingNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      svg: (isActive: boolean) => (
        <House 
          size={18} 
          weight="duotone" 
          className={cn("mb-0.5", isActive ? "opacity-100" : "opacity-30")} 
        />
      )
    },
    {
      name: "Projects",
      href: "/projects",
      matcher: "/projects",
      svg: (isActive: boolean) => (
        <Code 
          size={18} 
          weight="duotone" 
          className={cn("mb-0.5", isActive ? "opacity-100" : "opacity-30")} 
        />
      )
    },
    {
      name: "Skills",
      href: "/skills",
      matcher: "/skills",
      svg: (isActive: boolean) => (
        <Feather 
          size={18} 
          weight="duotone" 
          className={cn("mb-0.5", isActive ? "opacity-100" : "opacity-30")} 
        />
      )
    }
  ];

  return (
    <div
      id="navigation-menu"
      className="fixed bottom-4 left-1/2 h-fit -translate-x-1/2 rounded-full px-6 py-2.5 sm:hidden border border-border/50 bg-white/80 dark:bg-[#1A1B1C]/80 shadow-md backdrop-blur-md z-[999]"
    >
      <div className="flex flex-row gap-8">
        {navItems.map((item) => {
          const isActive: boolean = !!(pathname === item.href || (item.matcher && pathname.startsWith(item.matcher)));
          return (
            <div key={item.name} className="relative">
              <Link href={item.href}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center transition-all duration-200",
                    isActive
                      ? "scale-110 text-primary"
                      : "text-muted-foreground hover:text-primary/80"
                  )}
                >
                  {item.svg(isActive)}
                  <span className="text-xxs font-medium">{item.name}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
