import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import * as THREE from "three";
import normalizeWheel from "normalize-wheel";
import Scene from "./Scene";
import { storyConfig } from "../story/story.config";

export default function Experience({ enabled, onProgress }) {
  const camera = useRef();
  const cameraGroup = useRef();
  const scrollProgress = useRef(0);
  const targetScrollProgress = useRef(0);
  const scrollSpeedMultiplier = useRef(1);
  const isDragging = useRef(false);
  const lastPointerY = useRef(null);
  const mousePositionOffset = useRef(new THREE.Vector3());
  const mouseRotationOffset = useRef(new THREE.Euler());

  useEffect(() => {
    if (!enabled) return undefined;
    const baseScrollSpeed = storyConfig.experience.baseScrollSpeed;

    const handleWheel = (event) => {
      event.preventDefault();
      const normalized = normalizeWheel(event);
      targetScrollProgress.current +=
        Math.sign(normalized.pixelY) *
        baseScrollSpeed *
        scrollSpeedMultiplier.current *
        Math.min(Math.abs(normalized.pixelY) / 100, 1);
    };
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mousePositionOffset.current.set(x * 0.05, y * 0.05, 0);
      mouseRotationOffset.current.set(y * 0.05, x * 0.05, 0);
      if (!isDragging.current || lastPointerY.current === null) return;
      const deltaY = event.clientY - lastPointerY.current;
      targetScrollProgress.current += Math.sign(deltaY) * baseScrollSpeed * 0.2 * scrollSpeedMultiplier.current;
      lastPointerY.current = event.clientY;
    };
    const handlePointerDown = (event) => {
      isDragging.current = true;
      lastPointerY.current = event.clientY;
    };
    const handlePointerUp = () => {
      isDragging.current = false;
      lastPointerY.current = null;
    };
    const handleKeyDown = (event) => {
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) targetScrollProgress.current += baseScrollSpeed * 5;
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) targetScrollProgress.current -= baseScrollSpeed * 5;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);

  return (
    <Canvas
      className="story-canvas"
      shadows
      flat
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Scene
        cameraGroup={cameraGroup}
        camera={camera}
        scrollProgress={scrollProgress}
        targetScrollProgress={targetScrollProgress}
        lerpFactor={storyConfig.experience.lerpFactor}
        mousePositionOffset={mousePositionOffset}
        mouseRotationOffset={mouseRotationOffset}
        scrollSpeedMultiplier={scrollSpeedMultiplier}
        onProgress={onProgress}
      />
      <group ref={cameraGroup}>
        <PerspectiveCamera ref={camera} makeDefault fov={storyConfig.experience.cameraFov} />
      </group>
      <Preload all />
    </Canvas>
  );
}
