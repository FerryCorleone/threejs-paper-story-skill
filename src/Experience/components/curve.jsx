import * as THREE from "three";

const LAST_X = 36.005978;
const FIRST_X = -20.202141;
export const SHIFT_X_AMOUNT = LAST_X - FIRST_X + 6.62;

export const initialCameraPoints = [
  new THREE.Vector3(-20.202141, 3.0, 8.4),
  new THREE.Vector3(-15.8032, 3.1, 8.7),
  new THREE.Vector3(-11.971144, 3.35, 8.9),
  new THREE.Vector3(-4.681061, 3.45, 9.0),
  new THREE.Vector3(2.74859, 3.35, 8.5),
  new THREE.Vector3(8.42627, 3.4, 8.7),
  new THREE.Vector3(14.909897, 3.35, 8.45),
  new THREE.Vector3(21.697693, 3.55, 8.65),
  new THREE.Vector3(26.066216, 3.7, 8.35),
  new THREE.Vector3(31.030914, 3.75, 8.35),
  new THREE.Vector3(36.005978, 3.65, 8.35),
];

export const cameraCurve = new THREE.CatmullRomCurve3(initialCameraPoints);
cameraCurve.curveType = "centripetal";

export const rotationTargets = [
  { progress: 0, rotation: new THREE.Euler(-0.0017043241744864842, -0.22064811124855913, -0.0003730122560727475) },
  { progress: 0.1445, rotation: new THREE.Euler(-0.06419977307905109, -0.08888115648279392, -0.00570642026054557) },
  { progress: 0.3229, rotation: new THREE.Euler(-0.229101220729035, -0.027356265132564273, -0.006378475999996003) },
  { progress: 0.3995, rotation: new THREE.Euler(-0.21490963788572381, 0.07946656300948479, 0.01732601995022464) },
  { progress: 0.425, rotation: new THREE.Euler(-0.15971723485809433, 0.04670528046769929, 0.007520846163953575) },
  { progress: 0.493, rotation: new THREE.Euler(-0.15103232459264546, 0.00498848150386255, 0.0007592001306001002) },
  { progress: 0.5355, rotation: new THREE.Euler(-0.024867780069863777, -0.023369051346196712, -0.0005812032825821626) },
  { progress: 0.6, rotation: new THREE.Euler(0.045197053301981635, -0.006583935578690767, 0.0002977751186144598) },
  { progress: 0.6629, rotation: new THREE.Euler(-0.09476188265977611, 0.12518540275964718, 0.011866830817320508) },
  { progress: 0.7195, rotation: new THREE.Euler(-0.03936093252874196, -0.09166906996940853, -0.0036049751059469247) },
  { progress: 0.8129, rotation: new THREE.Euler(-0.07474327166814804, 0.051576095684842276, 0.003860429637009773) },
  { progress: 1, rotation: new THREE.Euler(-0.07474327166814804, 0.051576095684842276, 0.003860429637009773) },
];
