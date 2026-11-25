import { SITE_INFO } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-8">
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_INFO.name}
        </span>
      </div>
    </footer>
  );
}
