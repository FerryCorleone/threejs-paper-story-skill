import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  cameraCurve as initialCameraCurve,
  initialCameraPoints,
  rotationTargets,
  SHIFT_X_AMOUNT,
} from "./components/curve";
import { useScrollCurve } from "./hooks/useScrollCurve";
import PaperWorld from "./models/PaperWorld";
import { chapterIndexForProgress, storyConfig } from "../story/story.config";

const WORLD_FORWARD_TRIGGER = 0.92;
const WORLD_BACK_TRIGGER = 0.91;
const WORLD_INSTANCES = [-SHIFT_X_AMOUNT, 0, SHIFT_X_AMOUNT];
const MIN_HORIZONTAL_FOV = THREE.MathUtils.degToRad(44);

export default function Scene({
  cameraGroup,
  camera,
  scrollProgress,
  targetScrollProgress,
  lerpFactor,
  mousePositionOffset,
  mouseRotationOffset,
  scrollSpeedMultiplier,
  onProgress,
}) {
  const cameraScrollCurve = useScrollCurve(initialCameraCurve, initialCameraPoints, SHIFT_X_AMOUNT);
  const sceneGroupRef = useRef();
  const lastEmitRef = useRef(-1);
  const [rotationBufferQuat] = useState(
    new THREE.Quaternion().setFromEuler(rotationTargets[0].rotation),
  );

  const shiftWorld = (direction = "forward") => {
    if (!sceneGroupRef.current) return;
    const loop = direction === "forward"
      ? cameraScrollCurve.loopCounter.current
      : cameraScrollCurve.loopCounter.current - 1;
    sceneGroupRef.current.position.x = SHIFT_X_AMOUNT * loop;
  };

  const getLerpedRotation = (progress) => {
    if (cameraScrollCurve.transitionCurveActive.current) {
      return new THREE.Quaternion().slerpQuaternions(
        new THREE.Quaternion().setFromEuler(rotationTargets.at(-1).rotation),
        new THREE.Quaternion().setFromEuler(rotationTargets[0].rotation),
        progress,
      );
    }
    for (let index = 0; index < rotationTargets.length - 1; index += 1) {
      const start = rotationTargets[index];
      const end = rotationTargets[index + 1];
      if (progress >= start.progress && progress <= end.progress) {
        const amount = (progress - start.progress) / (end.progress - start.progress);
        return new THREE.Quaternion().slerpQuaternions(
          new THREE.Quaternion().setFromEuler(start.rotation),
          new THREE.Quaternion().setFromEuler(end.rotation),
          amount,
        );
      }
    }
    return new THREE.Quaternion().setFromEuler(rotationTargets.at(-1).rotation);
  };

  useFrame((state) => {
    if (!cameraGroup.current || !camera.current) return;
    const aspect = Math.max(state.size.width / state.size.height, 0.1);
    const responsiveFov = THREE.MathUtils.radToDeg(
      2 * Math.atan(Math.tan(MIN_HORIZONTAL_FOV / 2) / aspect),
    );
    const nextFov = Math.max(storyConfig.experience.cameraFov, Math.min(responsiveFov, 92));
    if (Math.abs(camera.current.fov - nextFov) > 0.01) {
      camera.current.fov = nextFov;
      camera.current.updateProjectionMatrix();
    }
    let newProgress = THREE.MathUtils.lerp(
      scrollProgress.current,
      targetScrollProgress.current,
      lerpFactor,
    );

    if (newProgress >= 1) {
      if (cameraScrollCurve.transitionCurveActive.current) {
        cameraScrollCurve.transitionCurveActive.current = false;
        cameraScrollCurve.shiftCurvePoints("forward");
        cameraScrollCurve.loopCounter.current += 1;
      } else {
        cameraScrollCurve.transitionCurveActive.current = true;
        cameraScrollCurve.initiateTransitionCurve();
      }
      scrollProgress.current -= 1;
      targetScrollProgress.current -= 1;
      newProgress -= 1;
    } else if (newProgress < 0) {
      if (cameraScrollCurve.transitionCurveActive.current) {
        cameraScrollCurve.transitionCurveActive.current = false;
        cameraScrollCurve.shiftCurvePoints("backward");
      } else {
        cameraScrollCurve.loopCounter.current -= 1;
        cameraScrollCurve.transitionCurveActive.current = true;
        cameraScrollCurve.initiateTransitionCurve();
      }
      scrollProgress.current += 1;
      targetScrollProgress.current += 1;
      newProgress += 1;
    }

    scrollProgress.current = newProgress;
    scrollSpeedMultiplier.current = cameraScrollCurve.transitionCurveActive.current && newProgress <= 0.95 ? 6 : 1;

    if (newProgress > WORLD_FORWARD_TRIGGER && !cameraScrollCurve.transitionCurveActive.current) shiftWorld("forward");
    if (newProgress <= WORLD_BACK_TRIGGER && !cameraScrollCurve.transitionCurveActive.current) shiftWorld("backward");

    const basePoint = cameraScrollCurve.getCurrentPoint(newProgress);
    cameraGroup.current.position.lerp(basePoint, 0.1);
    camera.current.position.x = THREE.MathUtils.lerp(camera.current.position.x, mousePositionOffset.current.x, 0.1);
    camera.current.position.y = THREE.MathUtils.lerp(camera.current.position.y, -mousePositionOffset.current.y, 0.1);
    camera.current.position.z = 0;

    rotationBufferQuat.slerp(getLerpedRotation(newProgress), 0.05);
    cameraGroup.current.quaternion.copy(rotationBufferQuat);
    camera.current.rotation.x = THREE.MathUtils.lerp(camera.current.rotation.x, -mouseRotationOffset.current.x, 0.1);
    camera.current.rotation.y = THREE.MathUtils.lerp(camera.current.rotation.y, -mouseRotationOffset.current.y, 0.1);

    if (state.clock.elapsedTime - lastEmitRef.current > 0.08) {
      onProgress?.(newProgress, chapterIndexForProgress(newProgress), cameraScrollCurve.transitionCurveActive.current);
      lastEmitRef.current = state.clock.elapsedTime;
    }
  });

  return (
    <Suspense fallback={null}>
      <color attach="background" args={["#f3f2ec"]} />
      <fog attach="fog" args={["#f3f2ec", 12, 34]} />
      <hemisphereLight args={["#fff7e6", "#7e745f", 1.25]} />
      <ambientLight intensity={0.65} />
      <directionalLight
        castShadow
        color="#fff2d4"
        intensity={2.15}
        position={[2, 10, 9]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={18}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
        shadow-camera-far={42}
        shadow-bias={-0.0002}
      />
      <group ref={sceneGroupRef}>
        {WORLD_INSTANCES.map((offset) => (
          <group key={offset} position={[offset, 0, 0]}>
            <PaperWorld />
          </group>
        ))}
      </group>
    </Suspense>
  );
}
