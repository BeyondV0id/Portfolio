import { FluidHoverGroup } from "@/components/ui/fluid-hover-group";
import { EXPERIENCES } from "@/features/portfolio/data";

import { ExperienceItem } from "./experience-item";
import { WorkExperience } from "./work-experience";

export function Experiences() {
  const groups = [
    { id: "experience", title: "Experience" },
    { id: "education", title: "education." },
  ];

  return groups.map(({ id, title }) => {
    const entries = EXPERIENCES.flatMap((experience) => {
      const positions = experience.positions?.filter(
        (position) => (position.icon === "education") === (id === "education"),
      );

      return positions?.length ||
        (id === "experience" && !experience.positions?.length)
        ? [{ ...experience, positions }]
        : [];
    });

    if (entries.length === 0) return null;

    if (id === "experience") {
      return (
        <section
          key={id}
          id={id}
          aria-labelledby="experience-title"
          className="rounded-xl border border-border"
        >
          <h2
            id="experience-title"
            className="border-b border-border px-3 py-2 text-xl font-medium tracking-tight sm:px-4"
          >
            {title}
          </h2>
          <WorkExperience experiences={entries} />
        </section>
      );
    }

    return (
      <section
        key={id}
        id={id}
        aria-labelledby={`${id}-title`}
        className="flex flex-col gap-4"
      >
        <h2
          id={`${id}-title`}
          className="text-[18px] font-medium tracking-tight text-foreground"
        >
          {title}
        </h2>
        <FluidHoverGroup
          highlightClassName="z-0"
          className="flex flex-col gap-3"
        >
          {entries.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </FluidHoverGroup>
      </section>
    );
  });
}
