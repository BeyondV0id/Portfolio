"use client";

import { motion, useReducedMotion } from "motion/react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import {
  createContext,
  type MouseEvent,
  useContext,
  useRef,
  useState,
} from "react";

import { spring } from "@/lib/fluid-functionalism/springs";
import { cn } from "@/lib/utils";

import { ChevronIcon } from "./icon-morph";

const CollapsibleContext = createContext<{
  open: boolean;
  animate: boolean;
  recordActivation?: (event: MouseEvent<HTMLButtonElement>) => void;
}>({ open: false, animate: false });

function CollapsibleWithContext({
  defaultOpen,
  children,
}: {
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [animate, setAnimate] = useState(false);
  const pointerActivation = useRef(false);

  return (
    <CollapsibleContext.Provider
      value={{
        open,
        animate,
        recordActivation: (event) => {
          pointerActivation.current = event.detail > 0;
        },
      }}
    >
      <CollapsiblePrimitive.Root
        open={open}
        onOpenChange={(next) => {
          setAnimate(pointerActivation.current);
          setOpen(next);
        }}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger(
  props: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>,
) {
  const { recordActivation } = useContext(CollapsibleContext);

  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      onClick={(event) => {
        recordActivation?.(event);
        props.onClick?.(event);
      }}
    />
  );
}

function CollapsibleContent({
  className,
  children,
  previewHeight = 0,
}: {
  className?: string;
  children: React.ReactNode;
  previewHeight?: number;
}) {
  const { open, animate } = useContext(CollapsibleContext);
  const reduceMotion = useReducedMotion();

  return (
    <CollapsiblePrimitive.Content forceMount asChild>
      <motion.div
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "overflow-hidden",
          previewHeight > 0 &&
            "data-[state=closed]:mask-[linear-gradient(black,transparent)]",
          className,
        )}
        initial={false}
        animate={{
          height: open ? "auto" : previewHeight,
          opacity: open || previewHeight > 0 ? 1 : 0,
        }}
        transition={
          animate && !reduceMotion
            ? open
              ? spring.fast
              : spring.fast.exit
            : { duration: 0 }
        }
      >
        {children}
      </motion.div>
    </CollapsiblePrimitive.Content>
  );
}

function CollapsibleChevronsIcon() {
  const { open } = useContext(CollapsibleContext);

  return <ChevronIcon state={open} size={14} />;
}

export {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
};
