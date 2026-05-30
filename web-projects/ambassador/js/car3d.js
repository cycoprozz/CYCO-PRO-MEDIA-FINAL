import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('car-canvas');
if (!canvas) throw new Error('car-canvas not found');

/* ── Scene ── */
const scene = new THREE.Scene();

/* ── Camera ── */
const CAM_INIT = { x: 3.8, y: 2.0, z: 5.2 };
const camera = new THREE.PerspectiveCamera(32, canvas.clientWidth / canvas.clientHeight, 0.05, 80);
camera.position.set(CAM_INIT.x, CAM_INIT.y, CAM_INIT.z);
camera.lookAt(0, 0.72, 0);

/* ── Renderer ── */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;

/* ── Controls ── */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.72, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 3.5;
controls.maxDistance = 11;
controls.maxPolarAngle = Math.PI / 2.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.65;

let userInteracted = false;
let autoResumeTimer = null;
renderer.domElement.addEventListener('pointerdown', () => {
  controls.autoRotate = false;
  userInteracted = true;
  if (autoResumeTimer) clearTimeout(autoResumeTimer);
});
renderer.domElement.addEventListener('pointerup', () => {
  if (autoResumeTimer) clearTimeout(autoResumeTimer);
  autoResumeTimer = setTimeout(() => { controls.autoRotate = true; }, 5000);
});

/* ── Lights ── */
const ambient = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xfff5e0, 2.8);
sun.position.set(6, 10, 7);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 30;
sun.shadow.camera.left = -7; sun.shadow.camera.right = 7;
sun.shadow.camera.top = 5; sun.shadow.camera.bottom = -5;
sun.shadow.bias = -0.0005;
scene.add(sun);

const fill = new THREE.DirectionalLight(0x8899cc, 0.7);
fill.position.set(-5, 4, -4);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xc9a84c, 0.5);
rim.position.set(0, 5, -8);
scene.add(rim);

/* ── Ground / Studio Floor ── */
const floorGeo = new THREE.PlaneGeometry(30, 30);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x060608, roughness: 0.08, metalness: 0.9 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

/* ── Materials ── */
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0b0d10, metalness: 0.88, roughness: 0.14, envMapIntensity: 1 });
const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x111418, metalness: 0.4, roughness: 0.65 });
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe0e2e6, metalness: 1.0, roughness: 0.06 });
const glassMat = new THREE.MeshStandardMaterial({ color: 0x0d1a2a, metalness: 0.1, roughness: 0.0, transparent: true, opacity: 0.72 });
const tireMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0b, roughness: 0.92, metalness: 0 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xd8dce4, metalness: 0.96, roughness: 0.08 });
const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4cc, emissiveIntensity: 2.5 });
const drlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 3.0 });
const taillightMat = new THREE.MeshStandardMaterial({ color: 0xff2222, emissive: 0xff0000, emissiveIntensity: 2.0 });
const grilleMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.5, roughness: 0.55 });
const goldenTrimMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.9, roughness: 0.2 });

/* ── Geometry helpers ── */
function mesh(geo, mat) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true; m.receiveShadow = true;
  scene.add(m);
  return m;
}
function box(wx, wy, wz, mat, px, py, pz, rx = 0, ry = 0, rz = 0) {
  const m = mesh(new THREE.BoxGeometry(wx, wy, wz), mat);
  m.position.set(px, py, pz); m.rotation.set(rx, ry, rz);
  return m;
}

/* ── CONSTANTS ── */
const GC = 0.34;       // ground clearance
const WR = 0.405;      // wheel radius
const BL = 4.30;       // body total length (Z)
const BW = 1.86;       // body width (X)

/* ═══════════════════════════════════════════════════════════════
   ESCALADE ESV BODY
═══════════════════════════════════════════════════════════════ */

/* Lower body slab */
box(BW, 0.88, BL, bodyMat, 0, GC + 0.44, 0);

/* Cabin upper */
box(1.78, 0.74, 2.76, bodyMat, 0, GC + 0.88 + 0.37, -0.08);

/* Roof panel */
box(1.74, 0.09, 2.60, bodyMat, 0, GC + 0.88 + 0.74 + 0.045, -0.08);

/* Roof rails */
box(0.04, 0.055, 2.35, chromeMat,  0.845, GC + 0.88 + 0.76, -0.08);
box(0.04, 0.055, 2.35, chromeMat, -0.845, GC + 0.88 + 0.76, -0.08);

/* Hood (front flat section) */
box(BW, 0.10, 0.76, bodyMat, 0, GC + 0.88, 2.00);
/* Front fascia lower */
box(BW, 0.28, 0.13, darkTrimMat, 0, GC + 0.14, 2.20);
/* Front skid plate chrome */
box(1.56, 0.06, 0.09, chromeMat, 0, GC + 0.03, 2.24);

/* Rear liftgate upper sill */
box(BW, 0.08, 0.80, bodyMat, 0, GC + 0.88, -1.94);
/* Rear bumper fascia */
box(BW, 0.26, 0.13, darkTrimMat, 0, GC + 0.13, -2.22);
/* Rear chrome sill */
box(1.50, 0.06, 0.09, chromeMat, 0, GC + 0.03, -2.26);

/* ── GRILLE ── */
/* Grille surround (chrome frame) */
box(1.44, 0.56, 0.09, chromeMat, 0, GC + 0.60, 2.22);
/* Grille black mesh backing */
box(1.32, 0.48, 0.06, grilleMat, 0, GC + 0.60, 2.24);
/* Horizontal grille bars */
for (let i = 0; i < 6; i++) box(1.28, 0.025, 0.04, chromeMat, 0, GC + 0.36 + i * 0.085, 2.26);
/* Vertical grille bars */
for (let i = 0; i < 9; i++) box(0.022, 0.42, 0.04, chromeMat, -0.56 + i * 0.14, GC + 0.60, 2.26);
/* Cadillac crest badge area */
box(0.20, 0.14, 0.07, chromeMat, 0, GC + 0.78, 2.24);
box(0.12, 0.09, 0.08, goldenTrimMat, 0, GC + 0.78, 2.26);

/* ── HEADLIGHTS (Split design — vertical DRL + lower main) ── */
/* RIGHT */
box(0.46, 0.055, 0.065, drlMat,  0.76, GC + 0.985, 2.22);   // upper DRL strip
box(0.055, 0.32, 0.065, drlMat,  0.99, GC + 0.83, 2.22);    // vertical DRL strip
box(0.44, 0.14, 0.085, headlightMat,  0.76, GC + 0.58, 2.20); // main headlight

/* LEFT */
box(0.46, 0.055, 0.065, drlMat, -0.76, GC + 0.985, 2.22);
box(0.055, 0.32, 0.065, drlMat, -0.99, GC + 0.83, 2.22);
box(0.44, 0.14, 0.085, headlightMat, -0.76, GC + 0.58, 2.20);

/* Headlight glow points */
const hlR = new THREE.PointLight(0xfff5cc, 3.0, 2.5); hlR.position.set(0.75, GC + 0.58, 2.35); scene.add(hlR);
const hlL = new THREE.PointLight(0xfff5cc, 3.0, 2.5); hlL.position.set(-0.75, GC + 0.58, 2.35); scene.add(hlL);

/* ── TAILLIGHTS (L-shape each side) ── */
/* RIGHT */
box(0.50, 0.065, 0.07, taillightMat,  0.73, GC + 0.88 + 0.66, -2.21); // top strip
box(0.065, 0.62, 0.07, taillightMat,  0.99, GC + 0.57, -2.21);          // vertical bar

/* LEFT */
box(0.50, 0.065, 0.07, taillightMat, -0.73, GC + 0.88 + 0.66, -2.21);
box(0.065, 0.62, 0.07, taillightMat, -0.99, GC + 0.57, -2.21);

/* Taillight glow */
const tlR = new THREE.PointLight(0xff1100, 1.5, 2.0); tlR.position.set(0.95, GC + 0.6, -2.3); scene.add(tlR);
const tlL = new THREE.PointLight(0xff1100, 1.5, 2.0); tlL.position.set(-0.95, GC + 0.6, -2.3); scene.add(tlL);

/* ── WINDOWS ── */
/* Windshield */
const wsFront = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.58, 0.04), glassMat);
wsFront.position.set(0, GC + 1.22, 1.30); wsFront.rotation.x = 0.20; scene.add(wsFront);

/* Rear window */
const wsRear = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.52, 0.04), glassMat);
wsRear.position.set(0, GC + 1.20, -1.40); wsRear.rotation.x = -0.18; scene.add(wsRear);

/* Side windows — RIGHT */
box(0.04, 0.38, 0.74, glassMat,  0.90, GC + 1.12,  0.72);
box(0.04, 0.38, 0.62, glassMat,  0.90, GC + 1.12, -0.10);
box(0.04, 0.34, 0.44, glassMat,  0.90, GC + 1.10, -0.82);

/* Side windows — LEFT */
box(0.04, 0.38, 0.74, glassMat, -0.90, GC + 1.12,  0.72);
box(0.04, 0.38, 0.62, glassMat, -0.90, GC + 1.12, -0.10);
box(0.04, 0.34, 0.44, glassMat, -0.90, GC + 1.10, -0.82);

/* ── BODY CHARACTER LINES ── */
/* Bold shoulder crease on each side */
box(0.04, 0.04, 3.90, chromeMat,  0.945, GC + 0.68, -0.08);
box(0.04, 0.04, 3.90, chromeMat, -0.945, GC + 0.68, -0.08);
/* Lower rocker chrome strip */
box(0.04, 0.035, 3.80, chromeMat,  0.946, GC + 0.38, -0.05);
box(0.04, 0.035, 3.80, chromeMat, -0.946, GC + 0.38, -0.05);

/* ── DOOR HANDLES ── */
[0.52, -0.26].forEach(z => {
  box(0.05, 0.055, 0.19, chromeMat,  0.960, GC + 0.84, z);
  box(0.05, 0.055, 0.19, chromeMat, -0.960, GC + 0.84, z);
});

/* ── RUNNING BOARDS ── */
box(0.14, 0.05, 3.30, darkTrimMat,  1.015, GC - 0.06, -0.06);
box(0.14, 0.05, 3.30, darkTrimMat, -1.015, GC - 0.06, -0.06);

/* ── EXHAUST TIPS ── */
const exGeo = new THREE.CylinderGeometry(0.045, 0.040, 0.13, 16);
[ 0.55, -0.55].forEach(x => {
  const ex = new THREE.Mesh(exGeo, chromeMat);
  ex.rotation.x = Math.PI / 2; ex.position.set(x, GC + 0.04, -2.24); scene.add(ex);
});

/* ═══════════════════════════════════════════════════════════════
   WHEELS — 5-spoke polished alloy
═══════════════════════════════════════════════════════════════ */
const WZ_FRONT =  1.33;   // front axle Z
const WZ_REAR  = -1.33;   // rear axle Z
const WX       =  0.96;   // track half-width

function makeWheel(wx, wz) {
  const group = new THREE.Group();

  /* Tire (outer shell) */
  const tireGeo = new THREE.CylinderGeometry(WR, WR, 0.25, 64);
  tireGeo.rotateZ(Math.PI / 2);
  group.add(new THREE.Mesh(tireGeo, tireMat));

  /* Sidewall edge rings */
  const swGeo = new THREE.TorusGeometry(WR - 0.005, 0.012, 8, 64);
  const sw1 = new THREE.Mesh(swGeo, tireMat); sw1.rotation.y = Math.PI / 2; sw1.position.x = 0.115; group.add(sw1);
  const sw2 = new THREE.Mesh(swGeo, tireMat); sw2.rotation.y = Math.PI / 2; sw2.position.x = -0.115; group.add(sw2);

  /* Rim barrel */
  const rimGeo = new THREE.CylinderGeometry(WR - 0.065, WR - 0.065, 0.245, 48);
  rimGeo.rotateZ(Math.PI / 2);
  group.add(new THREE.Mesh(rimGeo, rimMat));

  /* 5 spokes */
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const spokeLen = (WR - 0.065) * 0.90;
    const sg = new THREE.BoxGeometry(0.26, 0.05, spokeLen);
    sg.translate(0, spokeLen * 0.5 + 0.08, 0); // hub-to-rim
    const spoke = new THREE.Mesh(sg, rimMat);
    spoke.rotation.x = angle;
    spoke.castShadow = true;
    group.add(spoke);
  }

  /* Hub center disc */
  const hubGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.27, 12);
  hubGeo.rotateZ(Math.PI / 2);
  group.add(new THREE.Mesh(hubGeo, chromeMat));

  /* Lug nut ring */
  const lugRing = new THREE.TorusGeometry(0.06, 0.012, 6, 5);
  const lr1 = new THREE.Mesh(lugRing, chromeMat); lr1.rotation.y = Math.PI / 2; lr1.position.x = 0.125; group.add(lr1);

  group.position.set(wx, WR, wz);
  group.castShadow = true;
  scene.add(group);
  return group;
}

makeWheel( WX, WZ_FRONT);
makeWheel(-WX, WZ_FRONT);
makeWheel( WX, WZ_REAR);
makeWheel(-WX, WZ_REAR);

/* Wheel arch trim */
[WX, -WX].forEach(x => {
  [WZ_FRONT, WZ_REAR].forEach(z => {
    const archGeo = new THREE.TorusGeometry(WR + 0.07, 0.045, 8, 24, Math.PI);
    const arch = new THREE.Mesh(archGeo, darkTrimMat);
    arch.rotation.x = Math.PI / 2;
    arch.position.set(x * (x > 0 ? 1.01 : 0.99), WR, z);
    arch.castShadow = true;
    scene.add(arch);
  });
});

/* Brake calipers (gold) */
[WX, -WX].forEach(x => {
  [WZ_FRONT, WZ_REAR].forEach(z => {
    const calGeo = new THREE.BoxGeometry(0.10, 0.12, 0.18);
    const cal = new THREE.Mesh(calGeo, goldenTrimMat);
    cal.position.set(x * 0.88, WR + 0.03, z + 0.22);
    scene.add(cal);
  });
});

/* ═══════════════════════════════════════════════════════════════
   SUBTLE GROUND SHADOW / REFLECTION DISC
═══════════════════════════════════════════════════════════════ */
const shadowGeo = new THREE.EllipseGeometry(2.4, 1.2, 32);
const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
shadowDisc.rotation.x = -Math.PI / 2;
shadowDisc.position.y = 0.001;
scene.add(shadowDisc);

/* ═══════════════════════════════════════════════════════════════
   RENDER LOOP
═══════════════════════════════════════════════════════════════ */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

/* ── Resize ── */
function onResize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (w === 0 || h === 0) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', onResize);
onResize();
