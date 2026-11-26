"use client";

import { PhoneIcon } from "@solar-icons/react/linear/phone";

import { useIsClient } from "@/hooks/use-is-client";
import { decodePhoneNumber, formatPhoneNumber } from "@/utils/string";

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";

type PhoneItemProps = {
  phoneNumber: string;
};

export function PhoneItem({ phoneNumber }: PhoneItemProps) {
  const isClient = useIsClient();
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

  return (
    <IntroItem>
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>

      <IntroItemContent>
        <IntroItemLink
          href={isClient ? `tel:${phoneNumberDecoded}` : "#"}
          aria-label={
            isClient
              ? `Call ${formatPhoneNumber(phoneNumberDecoded)}`
              : "Phone number"
          }
        >
          {isClient
            ? formatPhoneNumber(phoneNumberDecoded)
            : "[Phone protected]"}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  );
}
