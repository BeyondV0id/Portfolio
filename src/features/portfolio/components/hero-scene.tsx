"use client";

import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { createPond, type Pond } from "pondscape";
import { useEffect, useRef, useState } from "react";

import styles from "./hero-scene.module.css";
import { sceneSoundAtom } from "./scene-sound";

export function HomeHeroScene() {
  return usePathname() === "/" ? <PondScene /> : null;
}

function PondScene() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const pondRef = useRef<Pond>(null);
  const audioRef = useRef<AudioContext>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const soundOn = useAtomValue(sceneSoundAtom);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    // Pondscape tracks pending shaders per WebGL context. Give each mount its own canvas.
    const canvas = document.createElement("canvas");
    canvas.className =
      "absolute inset-0 block size-full focus-visible:outline-none";
    canvas.tabIndex = 0;
    canvas.setAttribute(
      "aria-label",
      "Pondscape. Press Enter or Space to make a ripple.",
    );

    let pond: Pond | undefined;
    let visibility: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      surface.append(canvas);

      try {
        const currentPond = createPond(canvas, { size: 0.55 });
        pondRef.current = pond = currentPond;
        void currentPond.ready.then(
          () => {
            if (pondRef.current === currentPond) setStatus("ready");
          },
          () => {
            if (pondRef.current === currentPond) setStatus("error");
          },
        );

        visibility = new IntersectionObserver(([entry]) => {
          if (pondRef.current !== currentPond) return;
          if (entry.isIntersecting) currentPond.resume();
          else currentPond.pause();
        });
        visibility.observe(canvas);
      } catch {
        setStatus("error");
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      pondRef.current = null;
      visibility?.disconnect();
      pond?.destroy();
      canvas.remove();
      void audioRef.current?.close();
      audioRef.current = null;
    };
  }, []);

  function playRipple() {
    if (status !== "ready" || !soundOn || !window.AudioContext) return;

    const audio = (audioRef.current ??= new AudioContext());
    if (audio.state === "suspended") void audio.resume().catch(() => {});

    const start = audio.currentTime;
    const tone = audio.createOscillator();
    const gain = audio.createGain();
    tone.frequency.setValueAtTime(330, start);
    tone.frequency.exponentialRampToValueAtTime(145, start + 0.15);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.075, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.19);
    tone.connect(gain).connect(audio.destination);
    tone.start(start);
    tone.stop(start + 0.2);
  }

  return (
    <div
      className={styles.scene}
      onPointerDown={(event) => {
        if (event.button === 0 && event.target === pondRef.current?.canvas) {
          playRipple();
        }
      }}
      onKeyDown={(event) => {
        const pond = pondRef.current;
        if (
          status !== "ready" ||
          !pond ||
          event.target !== pond.canvas ||
          (event.key !== "Enter" && event.key !== " ")
        ) {
          return;
        }

        event.preventDefault();
        if (event.repeat) return;

        pond.ripple(pond.canvas.clientWidth / 2, pond.canvas.clientHeight / 2);
        playRipple();
      }}
    >
      <div ref={surfaceRef} className={styles.surface} />
      {status === "error" && (
        <p
          role="status"
          className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground"
        >
          Pondscape couldn’t start.{" "}
          <a
            href="https://www.surajpathak.com/pondscape"
            className="underline underline-offset-4"
          >
            Open Pondscape
          </a>
        </p>
      )}
    </div>
  );
}
