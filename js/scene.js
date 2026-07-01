import * as THREE from 'three';
import { loadCharacterModel } from './character.js';
import { AnimationController } from './animationController.js';

export function build3DScene(mountEl, isMobile) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4efe7);
  scene.fog = new THREE.Fog(0xf4efe7, 6, 18);

  const camera = new THREE.PerspectiveCamera(38, mountEl.clientWidth / mountEl.clientHeight, 0.1, 100);
  camera.position.set(0, 1.9, isMobile ? 8.6 : 7.2);
  camera.lookAt(0, 1.1, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  mountEl.innerHTML = '';
  mountEl.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xfff5e6, 0x6a563f, 1.2);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(5.5, 8.5, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.left = -8;
  keyLight.shadow.camera.right = 8;
  keyLight.shadow.camera.top = 8;
  keyLight.shadow.camera.bottom = -8;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8fc4ff, 0.35);
  fillLight.position.set(-6, 4, -4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffd8a4, 0.3, 18);
  rimLight.position.set(-2, 3, 1.5);
  scene.add(rimLight);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshStandardMaterial({ color: 0xe9e0d0, roughness: 0.95 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.5;
  floor.receiveShadow = true;
  scene.add(floor);

  const rug = new THREE.Mesh(
    new THREE.CylinderGeometry(45, 45, 0.03, 48),
    new THREE.MeshStandardMaterial({ color: 0x9b8b6d, roughness: 5, metalness: 0.2 })
  );
  rug.position.set(10, 14.6, 9);
  rug.rotation.y = Math.PI / 6;
  rug.receiveShadow = true;
  scene.add(rug);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 8),
    new THREE.MeshStandardMaterial({ color: 0xf8f2e8, roughness: 0.95 })
  );
  wall.position.set(0, 2.5, -3.4);
  wall.receiveShadow = true;
  scene.add(wall);

  const deskGroup = new THREE.Group();
  deskGroup.position.set(0, 1.5, -0.9);
  scene.add(deskGroup);

  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(4.9, .01, 3.25),
    new THREE.MeshStandardMaterial({ color: 0x8d5d35, roughness: 0.55, metalness: 0.08 })
  );
  deskTop.position.y = 0.78;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  const deskLegMaterial = new THREE.MeshStandardMaterial({ color: 0x5f4630, roughness: 0.7, metalness: 0.15 });
  [[-2.06, -0.94], [2.06, -0.94], [-2.06, 0.94], [2.06, 0.94]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), deskLegMaterial);
    leg.position.set(x, 0.39, z);
    leg.castShadow = true;
    deskGroup.add(leg);
  });

  const keyboard = new THREE.Group();
  keyboard.position.set(0.02, 0.82, 0.95);
  deskGroup.add(keyboard);

  const keyboardBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.04, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x181b20, roughness: 0.25, metalness: 0.12 })
  );
  keyboardBase.castShadow = true;
  keyboard.add(keyboardBase);

  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 6; c += 1) {
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.11, 0.018, 0.05),
        new THREE.MeshStandardMaterial({ color: 0xe8e8ee, roughness: 0.2, metalness: 0.02 })
      );
      key.position.set(-0.42 + c * 0.16, 0.028 + r * 0.018, 0.01);
      key.castShadow = true;
      keyboard.add(key);
    }
  }

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.025, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x282a31, roughness: 0.35, metalness: 0.05 })
  );
  mouse.position.set(0.72, 0.83, 0.88);
  mouse.castShadow = true;
  deskGroup.add(mouse);

  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.7, 0.42),
    new THREE.MeshStandardMaterial({ color: 0x22252a, roughness: 0.45, metalness: 0.2 })
  );
  tower.position.set(82, 7, 12);
  tower.castShadow = true;
  deskGroup.add(tower);

  const deskLight = new THREE.PointLight(0xffd28a, 0.6, 5);
  deskLight.position.set(1.56, 1.06, -0.72);
  deskGroup.add(deskLight);

  const chairGroup = new THREE.Group();
  chairGroup.position.set(0, 18, 1.9);
  chairGroup.rotation.y = Math.PI;
  scene.add(chairGroup);

  const chairSeat = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.38, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x4a372b, roughness: 0.75, metalness: 0.08 })
  );
  chairSeat.position.set(10, 44, 2);
  chairSeat.castShadow = true;
  chairSeat.receiveShadow = true;
  chairGroup.add(chairSeat);

  const chairBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.81, .98, 0.42),
    new THREE.MeshStandardMaterial({ color: 0x3f2e23, roughness: 0.9, metalness: 0.18 })
  );
  chairBack.position.set(0, 0.87, -0.42);
  chairBack.castShadow = true;
  chairGroup.add(chairBack);

  const chairLegMaterial = new THREE.MeshStandardMaterial({ color: 0x2f2219, roughness: 0.7, metalness: 0.1 });
  [[-0.36, -0.34], [0.36, -0.34], [-0.36, 0.34], [0.36, 0.34]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.82, 0.09), chairLegMaterial);
    leg.position.set(x, 0.2, z);
    leg.castShadow = true;
    chairGroup.add(leg);
  });

  const chairArmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.06), chairLegMaterial);
  chairArmLeft.position.set(-0.48, 0.62, 0.03);
  chairArmLeft.castShadow = true;
  chairGroup.add(chairArmLeft);

  const chairArmRight = chairArmLeft.clone();
  chairArmRight.position.x = 0.48;
  chairGroup.add(chairArmRight);

  const monitorGroup = new THREE.Group();
  scene.add(monitorGroup);

  function createMonitor(x, y, z, rotationY, screenColor) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotationY;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0b1725');
    gradient.addColorStop(1, '#111827');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 36; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, i * 18);
      ctx.lineTo(canvas.width, i * 18);
      ctx.stroke();
    }
    ctx.fillStyle = screenColor;
    ctx.font = 'bold 54px monospace';
    ctx.fillText('MY-SKILLS', 290, 140);
    ctx.fillStyle = '#6ee7f9';
    ctx.font = '42px monospace';
    ctx.fillText('HTML | CSS | JS | REACT |', 130, 240);
    ctx.fillText('WEB DEVELOPER | FRONTEND |', 140, 340);
    ctx.fillText('UI / UX | RESPONSIVE |', 160, 440);
    ctx.fillText('MERN STACK | DATABASEI |', 180, 540);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;

    const screenMat = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: 0xffffff,
      emissiveMap: texture,
      emissiveIntensity: 0.42,
      roughness: 0.28,
      metalness: 0.02
    });

    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.68, 1.04, 0.06), screenMat);
    screen.position.z = 0.04;
    screen.castShadow = true;
    group.add(screen);

    const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.16, 0.08), new THREE.MeshStandardMaterial({ color: 0x191919, roughness: 0.7, metalness: 0.1 }));
    bezel.castShadow = true;
    group.add(bezel);

    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.28, 0.16), new THREE.MeshStandardMaterial({ color: 0x242424, roughness: 0.55, metalness: 0.1 }));
    stand.position.set(0, -0.76, 0.06);
    stand.castShadow = true;
    group.add(stand);

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.06, 0.42), new THREE.MeshStandardMaterial({ color: 0x343434, roughness: 0.65, metalness: 0.08 }));
    base.position.set(0, -0.9, 0.08);
    base.castShadow = true;
    group.add(base);

    monitorGroup.add(group);
    return { group, texture };
  }

  const monitorLeft = createMonitor(-1.25, 1.28, -0.4, 0.18, '#8b5cf6');
  const monitorRight = createMonitor(1.25, 1.25, -0.25, -0.16, '#22d3ee');

  const deskShelf = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.12, 0.55),
    new THREE.MeshStandardMaterial({ color: 0x6d4f3a, roughness: 0.6, metalness: 0.08 })
  );
  deskShelf.position.set(0.9, 1.0, -0.6);
  deskShelf.castShadow = true;
  scene.add(deskShelf);

  const notebook = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.03, 0.32),
    new THREE.MeshStandardMaterial({ color: 0xefe7da, roughness: 0.85 })
  );
  notebook.position.set(-0.6, 0.83, 0.85);
  notebook.castShadow = true;
  deskGroup.add(notebook);

  const plantPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 0.18, 18),
    new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.7 })
  );
  plantPot.position.set(1.72, 0.84, 0.7);
  plantPot.castShadow = true;
  deskGroup.add(plantPot);

  const plantLeaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 18, 18),
    new THREE.MeshStandardMaterial({ color: 0x3d7a3d, roughness: 0.75 })
  );
  plantLeaves.position.set(1.72, 0.96, 0.7);
  plantLeaves.castShadow = true;
  deskGroup.add(plantLeaves);

  const clock = new THREE.Clock();
  let animationController = null;
  let raf = null;

  loadCharacterModel(scene, {
    position: { x: 0, y: 1.38, z: 0.55 },
    scale: 0.017,
    rotationY: -0.2,
    basePath: '/models'
  }).then(({ model, mixer }) => {
    model.position.set(.99, -.98, 2.9);
    animationController = new AnimationController(model, mixer);
    animationController.loadClips('/models').then(() => {
      animationController.play('Hand-Raising');
    });
  });

  function onResize() {
    const width = mountEl.clientWidth;
    const height = mountEl.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    deskGroup.position.y = -0.15;
    chairGroup.position.y = -0.08;
    monitorLeft.group.position.y = 1.28 + Math.sin(t * 1.2) * 0.008;
    monitorRight.group.position.y = 1.25 + Math.cos(t * 1.2) * 0.008;
    monitorLeft.group.rotation.y = 0.18 + Math.sin(t * 0.7) * 0.006;
    monitorRight.group.rotation.y = -0.16 + Math.cos(t * 0.7) * 0.006;
    deskLight.intensity = 0.55 + Math.sin(t * 2.0) * 0.04;
    rimLight.intensity = 0.24 + Math.sin(t * 1.4) * 0.02;

    if (animationController) {
      animationController.update(clock.getDelta());
    }

    renderer.render(scene, camera);
  }

  animate();
  window.addEventListener('resize', onResize);

  return {
    scene,
    camera,
    renderer,
    dispose: () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      animationController?.dispose();
      mountEl.innerHTML = '';
    }
  };
}