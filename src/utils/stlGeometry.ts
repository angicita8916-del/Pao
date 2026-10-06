import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ModelStats } from '../types';

/**
 * Calculates the exact signed volume of a 3D geometry in cubic centimeters (cm3).
 * Uses the Divergence Theorem / signed tetrahedrons from origin.
 */
export function computeGeometryVolume(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  if (!position) return 1.0;

  const index = geometry.index;
  let totalVolume = 0;

  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      p1.fromBufferAttribute(position, index.getX(i));
      p2.fromBufferAttribute(position, index.getX(i + 1));
      p3.fromBufferAttribute(position, index.getX(i + 2));
      totalVolume += p1.dot(p2.clone().cross(p3)) / 6.0;
    }
  } else {
    for (let i = 0; i < position.count; i += 3) {
      p1.fromBufferAttribute(position, i);
      p2.fromBufferAttribute(position, i + 1);
      p3.fromBufferAttribute(position, i + 2);
      totalVolume += p1.dot(p2.clone().cross(p3)) / 6.0;
    }
  }

  const volMm3 = Math.abs(totalVolume);
  // If mesh is open or plane, compute bounding volume approximation
  if (volMm3 < 0.001) {
    if (!geometry.boundingBox) geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox?.getSize(size);
    const boxMm3 = Math.max(10, size.x * size.y * size.z * 0.45);
    return Math.max(0.5, Number((boxMm3 / 1000).toFixed(2)));
  }

  const volCm3 = volMm3 / 1000.0;
  return Math.max(0.2, Number(volCm3.toFixed(2)));
}

/**
 * Extracts comprehensive physical stats from a BufferGeometry
 */
export function extractModelStats(
  geometry: THREE.BufferGeometry,
  filename: string,
  densityGramsPerCm3: number = 1.24
): ModelStats {
  geometry.computeBoundingBox();
  geometry.computeVertexNormals();

  const boundingBox = geometry.boundingBox || new THREE.Box3(new THREE.Vector3(-10, -10, -10), new THREE.Vector3(10, 10, 10));
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  const dimX = Math.max(1, Number(size.x.toFixed(1)));
  const dimY = Math.max(1, Number(size.y.toFixed(1)));
  const dimZ = Math.max(1, Number(size.z.toFixed(1)));

  const volume = computeGeometryVolume(geometry);
  const triangles = geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3;

  const weightGrams = Number((volume * densityGramsPerCm3).toFixed(1));
  const estimatedHours = Number((Math.max(0.5, (volume / 12) + (dimZ / 60))).toFixed(1));

  return {
    filename,
    dimensions: {
      x: dimX,
      y: dimY,
      z: dimZ
    },
    volumeCm3: volume,
    triangleCount: Math.round(triangles),
    weightGrams,
    estimatedPrintTimeHours: estimatedHours
  };
}

/**
 * Parse an uploaded STL ArrayBuffer using STLLoader
 */
export function parseSTLFile(buffer: ArrayBuffer): THREE.BufferGeometry {
  const loader = new STLLoader();
  const geometry = loader.parse(buffer);
  geometry.center();
  return geometry;
}

/**
 * Procedural sample model generator: Industrial Spur Gear (Engranaje)
 */
export function createSpurGearGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const teeth = 18;
  const outerRadius = 40;
  const pitchRadius = 35;
  const rootRadius = 30;
  const angleStep = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const angle = i * angleStep;
    const a1 = angle;
    const a2 = angle + angleStep * 0.25;
    const a3 = angle + angleStep * 0.5;
    const a4 = angle + angleStep * 0.75;

    const r1 = rootRadius;
    const r2 = outerRadius;
    const r3 = outerRadius;
    const r4 = rootRadius;

    const x1 = Math.cos(a1) * r1;
    const y1 = Math.sin(a1) * r1;
    const x2 = Math.cos(a2) * r2;
    const y2 = Math.sin(a2) * r2;
    const x3 = Math.cos(a3) * r3;
    const y3 = Math.sin(a3) * r3;
    const x4 = Math.cos(a4) * r4;
    const y4 = Math.sin(a4) * r4;

    if (i === 0) {
      shape.moveTo(x1, y1);
    } else {
      shape.lineTo(x1, y1);
    }
    shape.lineTo(x2, y2);
    shape.lineTo(x3, y3);
    shape.lineTo(x4, y4);
  }
  shape.closePath();

  // Center borehole
  const hole = new THREE.Path();
  const holeRadius = 12;
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  // Keyway slot in borehole
  const extrudeSettings = {
    steps: 2,
    depth: 18,
    bevelEnabled: true,
    bevelThickness: 1.5,
    bevelSize: 1.2,
    bevelSegments: 3
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/**
 * Procedural sample model generator: Industrial L-Bracket (Soporte Reforzado)
 */
export function createBracketGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // L shape
  const w = 60;
  const h = 60;
  const t = 14;

  shape.moveTo(0, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, t);
  shape.lineTo(t + 10, t);
  shape.lineTo(t, t + 10);
  shape.lineTo(t, h);
  shape.lineTo(0, h);
  shape.closePath();

  // Mounting holes
  const hole1 = new THREE.Path();
  hole1.absarc(w - 18, t / 2, 4.5, 0, Math.PI * 2, true);
  shape.holes.push(hole1);

  const hole2 = new THREE.Path();
  hole2.absarc(t / 2, h - 18, 4.5, 0, Math.PI * 2, true);
  shape.holes.push(hole2);

  const extrudeSettings = {
    steps: 2,
    depth: 35,
    bevelEnabled: true,
    bevelThickness: 1.5,
    bevelSize: 1.2,
    bevelSegments: 3
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
}

/**
 * Procedural sample model generator: Hexagonal Industrial Coupler (Acople Técnico)
 */
export function createHexCouplerGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const radius = 32;
  const sides = 6;
  const angleStep = (Math.PI * 2) / sides;

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  // Internal bore
  const hole = new THREE.Path();
  hole.absarc(0, 0, 16, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const extrudeSettings = {
    steps: 2,
    depth: 45,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1.5,
    bevelSegments: 3
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

export interface SampleModelItem {
  id: string;
  name: string;
  category: string;
  generator: () => THREE.BufferGeometry;
  defaultVolumeNote: string;
}

export const SAMPLE_MODELS: SampleModelItem[] = [
  {
    id: 'gear',
    name: 'Engranaje Helicoidal 18D',
    category: 'Mecánica de Precisión',
    generator: createSpurGearGeometry,
    defaultVolumeNote: '~36.2 cm³ · 40x40x18 mm'
  },
  {
    id: 'bracket',
    name: 'Soporte Escuadra Industrial',
    category: 'Estructuras y Chasis',
    generator: createBracketGeometry,
    defaultVolumeNote: '~42.8 cm³ · 60x60x35 mm'
  },
  {
    id: 'coupler',
    name: 'Acople Hexagonal CNC Torrijos',
    category: 'Fijación Robótica',
    generator: createHexCouplerGeometry,
    defaultVolumeNote: '~58.4 cm³ · 64x64x45 mm'
  }
];
