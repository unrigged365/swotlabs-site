"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Skip on touch / coarse pointers and for reduced-motion users.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let frame = 0;

    const render = () => {
      // Snappy follow — high lerp factor keeps the dot tight to the cursor.
      curX += (mouseX - curX) * 0.4;
      curY += (mouseY - curY) * 0.4;
      const scale = cursor.classList.contains("hovering") ? 2.6 : 1;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        cursor.classList.add("hovering");
      }
    };

    const onMouseOut = () => cursor.classList.remove("hovering");
    const onLeaveWindow = () => (cursor.style.opacity = "0");
    const onEnterWindow = () => (cursor.style.opacity = "1");

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" aria-hidden="true" />;
}
