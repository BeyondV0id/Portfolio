import { USER } from "@/features/portfolio/data";

export function AnimatedTitle() {
  return (
    <p className="text-sm text-muted-foreground">
      {USER.jobTitle}
    </p>
  );
}
