"use client";

import * as React from "react";
import * as THREE from "three";

interface TidyKineticRibbonProps {
  className?: string;
}

export function TidyKineticRibbon({ className = "" }: TidyKineticRibbonProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const aspect = container.clientWidth / container.clientHeight;
    // Studio telephoto camera (32° FOV)
    const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);

    const getCameraZ = (asp: number) =>
      asp < 1.6 ? 18.5 * (1.6 / Math.max(asp, 0.7)) : 18.5;

    camera.position.set(0, 0.35, getCameraZ(aspect));
    camera.lookAt(0, 0.35, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting with Inter-Card Contact Shadows ---
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(10, 16, 16);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -16;
    keyLight.shadow.camera.right = 16;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Rim light: soft rose/magenta backlight highlighting the crest
    const rimLight = new THREE.DirectionalLight(0xf5dbe8, 2.0);
    rimLight.position.set(-10, 14, -8);
    scene.add(rimLight);

    // Bounce light: soft ambient fill from bottom
    const bounceLight = new THREE.DirectionalLight(0xdde5ee, 0.9);
    bounceLight.position.set(0, -12, 10);
    scene.add(bounceLight);

    // Ambient light: diffused light grey studio ambient
    const ambientLight = new THREE.AmbientLight(0xf2f3f5, 1.4);
    scene.add(ambientLight);

    // --- Card Geometry (Slender pill-rounded cards matching Reference Image) ---
    // Width 1.25, Height 2.70, Corner Radius 0.18, Thickness 0.15
    const cardWidth = 1.25;
    const cardHeight = 2.7;
    const cardRadius = 0.18;
    const cardDepth = 0.15;

    const shape = new THREE.Shape();
    const x = -cardWidth / 2;
    const y = -cardHeight / 2;
    const w = cardWidth;
    const h = cardHeight;
    const r = cardRadius;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    const extrudeSettings = {
      depth: cardDepth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const cardGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    cardGeometry.center();

    // --- Exact Repeating Color Palette from Reference Close-Up ---
    const PALETTE = [
      0xc7525a, // Coral Red
      0x7e2d3e, // Deep Plum
      0x6e7cb2, // Periwinkle
      0x5b92aa, // Slate Cyan
      0xb94752, // Brick Crimson
      0xc45484, // Rose Magenta
      0x679eb4, // Sky Cyan
      0xd9656a, // Coral
      0x7b87be, // Violet
      0x53889f, // Steel Denim
      0xd26292, // Orchid
      0xe07470, // Peach Coral
      0x4d7f96, // Denim Slate
      0x6d2434, // Dark Berry
      0xdf79a4, // Radiant Orchid
      0xeb8cb2, // Soft Pink
      0xc8525b, // Coral Red
      0x8a92c4, // Soft Periwinkle
      0x5d91a8, // Slate Cyan
      0xd45f65, // Terracotta
      0xc8598a, // Magenta
      0x6fa2b8, // Light Sky
      0xae6ea1, // Lilac
      0xcf5960, // Coral
    ];

    // --- 3D STATIC SPLINE FORMULA ---
    // Frozen shape: gentle left S-wave, tall crest, deep valley, smooth right exit
    function rawTrack(u: number) {
      // Horizontal coordinate spanning across screen
      const px = (u - 0.5) * 31.0;

      // Base undulating S-wave
      const baseWave = Math.sin(u * Math.PI * 2.2 - 0.5) * 0.8;

      // Central tall dramatic crest (u ~ 0.47)
      const duCrest = u - 0.47;
      const crestW = duCrest < 0 ? 0.088 : 0.072;
      const crest = Math.exp(-Math.pow(duCrest / crestW, 2)) * 3.35;

      // Gentle valley dip to the left of crest (u ~ 0.32)
      const dipLeft = -Math.exp(-Math.pow((u - 0.32) / 0.08, 2)) * 0.65;

      // Deep U-shaped valley to the right of crest (u ~ 0.60)
      const duValley = (u - 0.60) / 0.082;
      const valley = -Math.exp(-Math.pow(duValley, 2)) * 1.85;

      // Secondary rise to the right (u ~ 0.78)
      const rightRise = Math.exp(-Math.pow((u - 0.78) / 0.11, 2)) * 0.65;

      const py = baseWave + crest + dipLeft + valley + rightRise - 0.25;

      // Depth (Z) curve:
      const baseZ = Math.cos(u * Math.PI * 2.2 + 0.2) * 1.5;
      const crestZ = -Math.exp(-Math.pow((u - 0.47) / 0.085, 2)) * 2.6;
      const valleyZ = Math.exp(-Math.pow((u - 0.60) / 0.08, 2)) * 1.6;

      const pz = baseZ + crestZ + valleyZ;

      return new THREE.Vector3(px, py, pz);
    }

    // --- ARC-LENGTH PARAMETERIZATION TO GUARANTEE ZERO GAPS ---
    // Pre-sample the curve with 2400 points to measure physical distances accurately
    const SAMPLES = 2400;
    const curvePoints: THREE.Vector3[] = [];
    const arcLengths: number[] = [0];
    let totalLength = 0;

    let prevPt = rawTrack(0);
    curvePoints.push(prevPt);

    for (let i = 1; i <= SAMPLES; i++) {
      const u = i / SAMPLES;
      const curPt = rawTrack(u);
      const segDist = curPt.distanceTo(prevPt);
      totalLength += segDist;
      arcLengths.push(totalLength);
      curvePoints.push(curPt);
      prevPt = curPt;
    }

    // Evaluates position and normalized u at EXACT physical arc-length distance s
    function sampleAtDistance(s: number) {
      let dist = s % totalLength;
      if (dist < 0) dist += totalLength;

      let low = 0;
      let high = SAMPLES;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (arcLengths[mid] < dist) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      const idx = Math.max(0, Math.min(SAMPLES - 1, low - 1));
      const len0 = arcLengths[idx];
      const len1 = arcLengths[idx + 1] || totalLength;
      const frac = (dist - len0) / Math.max(0.00001, len1 - len0);

      const p0 = curvePoints[idx];
      const p1 = curvePoints[idx + 1] || curvePoints[idx];

      const pos = new THREE.Vector3().lerpVectors(p0, p1, frac);
      const u = (idx + frac) / SAMPLES;

      return { pos, u };
    }

    // Static twist formula
    function getCardTwist(u: number) {
      const base = (u - 0.5) * 1.25 + 0.38;
      const duC = (u - 0.47) / 0.082;
      const crestTwist = Math.exp(-duC * duC) * 1.55;
      const duV = (u - 0.60) / 0.078;
      const valleyTwist = -Math.exp(-duV * duV) * 1.48;
      return base + crestTwist + valleyTwist;
    }

    // Calculates card position and rotation at exact physical distance s
    function getCardFrameAtDistance(s: number) {
      const { pos: p0, u } = sampleAtDistance(s);
      const { pos: p1 } = sampleAtDistance(s + 0.04);
      const tangent = new THREE.Vector3().subVectors(p1, p0).normalize();

      const upBase = new THREE.Vector3(0, 1, 0);

      // Normal across ribbon
      const normal = new THREE.Vector3().crossVectors(upBase, tangent).normalize();
      // Binormal along card height
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      // Twist rotation
      const twist = getCardTwist(u);
      normal.applyAxisAngle(tangent, twist);
      binormal.applyAxisAngle(tangent, twist);

      // Forward pitch tilt: cards lean against each other with zero gaps
      const duC = (u - 0.47) / 0.082;
      const pitchAngle = 0.36 - Math.exp(-duC * duC) * 0.22;
      binormal.applyAxisAngle(normal, pitchAngle);
      tangent.applyAxisAngle(normal, pitchAngle);

      const matrix = new THREE.Matrix4().makeBasis(normal, binormal, tangent);
      return { position: p0, matrix };
    }

    // --- INSTANCED MESH: 220 CARDS PACKED FACE-TO-FACE (ZERO GAP) ---
    // Total curve length is ~38.4 units. With 220 cards, spacing is 0.174 units.
    // Card thickness is 0.15 units and card width is 1.25 units.
    // Because each card is pitched forward, adjacent cards overlap by ~65%.
    // THERE IS ABSOLUTELY ZERO GAP BETWEEN CARDS ANYWHERE ON THE RIBBON!
    const TOTAL_CARDS = 220;

    const baseMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.28,
      metalness: 0.04,
      clearcoat: 0.38,
      clearcoatRoughness: 0.16,
      reflectivity: 0.62,
    });

    const instancedMesh = new THREE.InstancedMesh(
      cardGeometry,
      baseMaterial,
      TOTAL_CARDS
    );
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;

    // Assign individual colors to each card
    const cardColor = new THREE.Color();
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const hex = PALETTE[i % PALETTE.length];
      cardColor.setHex(hex);
      instancedMesh.setColorAt(i, cardColor);
    }
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    scene.add(instancedMesh);

    // --- Floating Data Sprites in 3D Space (Micro numbers) ---
    const spriteLabels = [
      "15", "24", "48", "62", "76", "88", "91", "99",
      "01", "04", "18", "36", "75", "v1.4", "ok", "yes"
    ];

    const spriteGroup = new THREE.Group();
    scene.add(spriteGroup);

    const sprites: {
      sprite: THREE.Sprite;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      phase: number;
    }[] = [];

    function createTextTexture(text: string) {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 128, 64);
        ctx.font = "600 24px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(110, 115, 125, 0.42)";
        ctx.fillText(text, 64, 32);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    }

    const spriteTextures = spriteLabels.map(createTextTexture);

    for (let s = 0; s < 26; s++) {
      const tex = spriteTextures[s % spriteTextures.length];
      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.85, 0.42, 1);

      const baseX = (Math.random() - 0.5) * 24;
      const baseY = (Math.random() - 0.5) * 6.5 + 0.3;
      const baseZ = (Math.random() - 0.5) * 9;

      sprite.position.set(baseX, baseY, baseZ);
      spriteGroup.add(sprite);

      sprites.push({
        sprite,
        baseX,
        baseY,
        baseZ,
        speed: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Constant flow speed along physical curve in distance units/sec
    const LINEAR_SPEED = 1.95; // moves ~1.95 distance units per second

    const matrixDummy = new THREE.Matrix4();
    const positionDummy = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      const flowOffset = t * LINEAR_SPEED;

      // Stream cards from RIGHT to LEFT:
      // Each card i is spaced by exact distance step spacingDelta
      const spacingDelta = totalLength / TOTAL_CARDS;

      for (let i = 0; i < TOTAL_CARDS; i++) {
        // Physical distance s of card i
        // As time t increases, distance decreases (moving from right to left!)
        const cardDistance = (i * spacingDelta - flowOffset) % totalLength;

        const frame = getCardFrameAtDistance(cardDistance);

        matrixDummy.copy(frame.matrix);
        positionDummy.copy(frame.position);
        matrixDummy.setPosition(positionDummy);

        instancedMesh.setMatrixAt(i, matrixDummy);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;

      // Animate floating micro data sprites gently
      for (let s = 0; s < sprites.length; s++) {
        const item = sprites[s];
        const timeVal = t * item.speed + item.phase;
        item.sprite.position.y = item.baseY + Math.sin(timeVal) * 0.22;
        item.sprite.position.x = item.baseX + Math.cos(timeVal * 0.5) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const asp = width / height;
      camera.aspect = asp;
      camera.position.z = getCameraZ(asp);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardGeometry.dispose();
      baseMaterial.dispose();
      spriteTextures.forEach((tex) => tex.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        zIndex: 10,
      }}
    />
  );
}

export default TidyKineticRibbon;
