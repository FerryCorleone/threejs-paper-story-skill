import { useRef } from "react";
import * as THREE from "three";

export function useScrollCurve(initialCurve, initialPoints, shiftAmount) {
  const curveRef = useRef(initialCurve.clone());
  const initialCurvePointsRef = useRef(initialPoints.map((point) => point.clone()));
  const loopCounter = useRef(1);
  const transitionCurveActive = useRef(false);

  const initiateTransitionCurve = () => {
    const targetLoopIndex = loopCounter.current;
    const transitionPoints = [
      initialCurvePointsRef.current.at(-1).clone().add(new THREE.Vector3(shiftAmount * (targetLoopIndex - 1), 0, 0)),
      initialCurvePointsRef.current[0].clone().add(new THREE.Vector3(shiftAmount * targetLoopIndex, 0, 0)),
    ];
    curveRef.current.points = transitionPoints;
    curveRef.current.needsUpdate = true;
  };

  const shiftCurvePoints = (direction = "forward") => {
    const loop = direction === "forward" ? loopCounter.current : loopCounter.current - 1;
    curveRef.current.points = initialCurvePointsRef.current.map((point) =>
      point.clone().add(new THREE.Vector3(shiftAmount * loop, 0, 0)),
    );
    curveRef.current.needsUpdate = true;
  };

  return {
    curveRef,
    loopCounter,
    transitionCurveActive,
    initiateTransitionCurve,
    shiftCurvePoints,
    getCurrentPoint: (progress) => curveRef.current.getPoint(THREE.MathUtils.clamp(progress, 0, 1)),
  };
}
