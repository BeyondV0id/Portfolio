import { CaseIcon as BriefcaseBusinessIcon } from "@solar-icons/react/linear/case";
import { LightbulbIcon } from "@solar-icons/react/linear/lightbulb";

import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

function getJobIcon(title: string) {
  if (/(founder|co-founder|building)/i.test(title)) {
    return <LightbulbIcon />;
  }

  return <BriefcaseBusinessIcon />;
}

type JobItemProps = {
  title: string;
  company: string;
  website: string;
};

export function JobItem({ title, company, website }: JobItemProps) {
  return (
    <IntroItem>
      <IntroItemIcon>{getJobIcon(title)}</IntroItemIcon>

      <IntroItemContent>
        {title} @
        <IntroItemLink
          className="ml-0.5 font-medium"
          href={addQueryParams(website, UTM_PARAMS)}
          aria-label={`${company} website`}
        >
          {company}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
