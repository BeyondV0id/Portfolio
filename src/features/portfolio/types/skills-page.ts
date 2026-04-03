export type SkillsIntroToken =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "badge";
      key: string;
    };

export type SkillsPageData = {
  categoryOrder: string[];
  intro: SkillsIntroToken[][];
};
