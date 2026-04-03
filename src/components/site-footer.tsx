import { SITE_INFO } from "@/config/site";

import { FooterCat } from "./footer-cat";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before screen-line-after relative mx-auto border-x border-edge pt-0.5 md:max-w-3xl">
        <div className="flex items-center justify-between px-4">
          <div className="mt-6 mb-6 flex flex-col leading-none">
            <span className="font-mono text-[12px] text-muted-foreground">© 2026 {SITE_INFO.name}</span>
            <span className="font-mono text-[12px] text-muted-foreground">Built with love, LLMs and Coffee</span>
          </div>
          <FooterCat />
          <style>{`
            /* PixelCat - inline styles */
            .pixel-cat-root{cursor:pointer;user-select:none;position:relative;overflow:visible}
            .pixel-cat-img-wrap{position:relative;width:100%;height:100%}
            .pixel-cat-root img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .25s ease-out}
            .pixel-cat-root img.pixel-cat-alert-img,.pixel-cat-root img.pixel-cat-blink-img{transition:none}
            .pixel-cat-root img.pixel-cat-paw-img{transition:none}
            .pixel-cat-root.pixel-cat-pawing img.pixel-cat-paw-img{animation:pixel-cat-claw .35s ease-out}
            @keyframes pixel-cat-claw{0%{transform:scale(1)}25%{transform:scale(1.08) translateX(2px)}50%{transform:scale(1.12) translateX(4px)}75%{transform:scale(1.06) translateX(2px)}100%{transform:scale(1)}}
            .pixel-cat-zz{position:absolute;top:26%;left:45%;right:auto;pointer-events:none;transform-origin:center bottom;transition:opacity .2s ease-out}
            .pixel-cat-zz.pixel-cat-zz-fade{opacity:0}
            .pixel-cat-z1,.pixel-cat-z2,.pixel-cat-z3{position:absolute;font-weight:bold;left:0;bottom:0}
            @keyframes pixel-cat-float-z1{0%{opacity:0;transform:translateY(0) scale(.7)}25%{opacity:.7}100%{opacity:0;transform:translateY(-6px) scale(1)}}
            @keyframes pixel-cat-float-z2{0%{opacity:0;transform:translateY(0) scale(.7)}25%{opacity:.6}100%{opacity:0;transform:translateY(-8px) scale(1)}}
            @keyframes pixel-cat-float-z3{0%{opacity:0;transform:translateY(0) scale(.7)}25%{opacity:.5}100%{opacity:0;transform:translateY(-10px) scale(1)}}
            .pixel-cat-z1{animation:pixel-cat-float-z1 2.2s ease-in-out infinite}
            .pixel-cat-z2{animation:pixel-cat-float-z2 2.2s ease-in-out .4s infinite}
            .pixel-cat-z3{animation:pixel-cat-float-z3 2.2s ease-in-out .8s infinite}
          `}</style>
        </div>
      </div>
      <div className="mx-auto md:max-w-3xl">
        <div className="border-x border-edge select-none screen-line-before screen-line-after before:-top-px after:-bottom-px">
          <div className="overflow-hidden p-5">
            <div className="h-full min-h-[70px] w-full bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center px-[5px] sm:min-h-[110px] [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]"></div>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="h-[2px]"></div>
      </div>
    </footer>
  );
}
