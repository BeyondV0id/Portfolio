"use client";

import { useEffect,useState } from "react";

import { TextAnimate } from "@/components/ui/text-animate";

export function AnimatedTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["Full Stack Developer", "Always Learning", "Polymath"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-5 mt-1">
      <TextAnimate 
        key={titles[titleIndex]} 
        animation="slideUp" 
        by="character" 
        className="text-sm tracking-tight text-muted-foreground"
      >
        {titles[titleIndex]}
      </TextAnimate>
    </div>
  );
}
