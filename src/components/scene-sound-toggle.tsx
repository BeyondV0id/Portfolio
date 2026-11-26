"use client";

import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { sceneSoundAtom } from "@/features/portfolio/components/scene-sound";

export function SceneSoundToggle() {
  const pathname = usePathname();
  const [soundOn, setSoundOn] = useAtom(sceneSoundAtom);
  const Icon = soundOn ? SpeakerHighIcon : SpeakerSlashIcon;

  if (pathname !== "/") return null;

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="secondary"
      aria-label="Pond sound"
      aria-pressed={soundOn}
      title={soundOn ? "Mute pond sound" : "Enable pond sound"}
      onClick={() => setSoundOn((enabled) => !enabled)}
    >
      <Icon aria-hidden />
    </Button>
  );
}
