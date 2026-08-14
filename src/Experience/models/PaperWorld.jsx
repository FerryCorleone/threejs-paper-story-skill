import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { storyConfig } from "../../story/story.config";
import { SHIFT_X_AMOUNT } from "../components/curve";

const RULE_SPACING = 0.58;
const RULE_Y = Array.from({ length: 12 }, (_, index) => 0.92 + index * RULE_SPACING);
const FLOOR_RULE_Z = [-2.22, -1.64, -1.06, -0.48, 0.1, 0.68];
const BINDER_Y = [1.3, 2.8, 4.3, 5.8, 7.3];

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function createPaperTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const random = seededRandom(19481217);

  context.fillStyle = "#f7f1df";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 4200; index += 1) {
    const tone = 150 + Math.floor(random() * 70);
    const opacity = 0.018 + random() * 0.032;
    context.fillStyle = `rgba(${tone}, ${tone - 7}, ${tone - 18}, ${opacity})`;
    context.fillRect(random() * 512, random() * 512, 0.4 + random() * 1.6, 0.4 + random() * 1.6);
  }

  for (let index = 0; index < 140; index += 1) {
    const x = random() * 512;
    const y = random() * 512;
    context.strokeStyle = `rgba(112, 102, 82, ${0.018 + random() * 0.025})`;
    context.lineWidth = 0.35 + random() * 0.55;
    context.beginPath();
    context.moveTo(x, y);
    context.quadraticCurveTo(x + 6, y + random() * 2 - 1, x + 12 + random() * 20, y + random() * 3 - 1.5);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2.5);
  texture.anisotropy = 4;
  return texture;
}

function pageBounds(chapters, index) {
  const current = chapters[index].stageX;
  const previous = chapters[index - 1]?.stageX ?? chapters.at(-1).stageX - SHIFT_X_AMOUNT;
  const next = chapters[index + 1]?.stageX ?? chapters[0].stageX + SHIFT_X_AMOUNT;
  const left = (previous + current) / 2;
  const right = (current + next) / 2;
  return { center: (left + right) / 2, width: right - left + 0.08 };
}

function RuledPage({ index, paperTexture }) {
  const { center, width } = pageBounds(storyConfig.chapters, index);
  const stage = storyConfig.stage;
  const color = stage.pageColors[index % stage.pageColors.length];
  const tilt = stage.pageTilts[index % stage.pageTilts.length];

  return (
    <group position={[center, 0, 0]} rotation={[0, 0, tilt]}>
      <mesh castShadow receiveShadow position={[0, stage.backdropCenterY, stage.backdropZ]}>
        <boxGeometry args={[width, stage.backdropHeight, stage.paperThickness]} />
        <meshStandardMaterial map={paperTexture} color={color} roughness={0.96} metalness={0} />
      </mesh>

      {RULE_Y.map((y, ruleIndex) => (
        <mesh key={`back-rule-${ruleIndex}`} position={[0, y, stage.backdropZ + 0.066]}>
          <planeGeometry args={[width - 0.12, 0.018]} />
          <meshBasicMaterial color={stage.ruleColor} transparent opacity={0.54} toneMapped={false} />
        </mesh>
      ))}

      <mesh position={[-width / 2 + 1.08, stage.backdropCenterY, stage.backdropZ + 0.069]}>
        <planeGeometry args={[0.026, stage.backdropHeight - 0.18]} />
        <meshBasicMaterial color={stage.marginColor} transparent opacity={0.62} toneMapped={false} />
      </mesh>

      {BINDER_Y.map((y, binderIndex) => (
        <mesh key={`binder-${binderIndex}`} position={[-width / 2 + 0.32, y, stage.backdropZ + 0.071]}>
          <ringGeometry args={[0.065, 0.105, 22]} />
          <meshBasicMaterial color={stage.inkColor} transparent opacity={0.46} toneMapped={false} />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[0, stage.floorY, stage.floorCenterZ]}>
        <boxGeometry args={[width, stage.floorThickness, stage.floorDepth]} />
        <meshStandardMaterial map={paperTexture} color={color} roughness={0.98} metalness={0} />
      </mesh>

      {FLOOR_RULE_Z.map((z, ruleIndex) => (
        <mesh key={`floor-rule-${ruleIndex}`} position={[0, stage.floorY + stage.floorThickness / 2 + 0.008, z]}>
          <boxGeometry args={[width - 0.12, 0.008, 0.018]} />
          <meshBasicMaterial color={stage.ruleColor} transparent opacity={0.48} toneMapped={false} />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[0, stage.foldCenterY, stage.foldZ]}>
        <boxGeometry args={[width, stage.foldHeight, stage.paperThickness]} />
        <meshStandardMaterial map={paperTexture} color={color} roughness={0.98} metalness={0} />
      </mesh>

      <mesh position={[0, stage.foldCenterY + stage.foldHeight / 2 - 0.018, stage.foldZ + 0.067]}>
        <boxGeometry args={[width - 0.05, 0.024, 0.022]} />
        <meshBasicMaterial color={stage.inkColor} transparent opacity={0.58} toneMapped={false} />
      </mesh>

      <mesh position={[0, stage.floorY + 0.082, 0.73]}>
        <boxGeometry args={[width, 0.018, 0.88]} />
        <meshBasicMaterial color={stage.laneColor} transparent opacity={0.34} toneMapped={false} />
      </mesh>

      {Array.from({ length: Math.max(2, Math.floor(width / 1.7)) }, (_, dashIndex) => {
        const dashCount = Math.max(2, Math.floor(width / 1.7));
        const dashX = -width / 2 + 0.72 + dashIndex * ((width - 1.44) / Math.max(1, dashCount - 1));
        return (
          <mesh key={`lane-dash-${dashIndex}`} position={[dashX, stage.floorY + 0.094, 0.73]}>
            <boxGeometry args={[0.54, 0.016, 0.034]} />
            <meshBasicMaterial color={stage.laneDashColor} transparent opacity={0.74} toneMapped={false} />
          </mesh>
        );
      })}

      <group position={[-width / 2 + 0.7, 8.0, stage.backdropZ + 0.073]} rotation={[0, 0, -0.08]}>
        <mesh>
          <planeGeometry args={[0.9, 0.34]} />
          <meshBasicMaterial color={stage.paperLabelColor} transparent opacity={0.72} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <planeGeometry args={[0.58, 0.024]} />
          <meshBasicMaterial color={stage.inkColor} transparent opacity={0.42} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function PaperWorld() {
  const paperTexture = useMemo(createPaperTexture, []);

  useEffect(() => () => paperTexture.dispose(), [paperTexture]);

  return (
    <group>
      {storyConfig.chapters.map((chapter, index) => (
        <RuledPage key={chapter.id} index={index} paperTexture={paperTexture} />
      ))}
    </group>
  );
}
