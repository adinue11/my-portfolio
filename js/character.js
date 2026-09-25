import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export async function loadCharacterModel(scene, options = {}) {
  const loader = new FBXLoader();

  console.log('Loading character model...');

  const asset = await loader.loadAsync(
    `${options.basePath ?? '/models'}/character.fbx`
  );

  console.log('Character model loaded.');

  asset.scale.setScalar(options.scale ?? 0.1);
  asset.position.set(
    options.position?.x ?? 1,
    options.position?.y ?? 4,
    options.position?.z ?? 9
  );
  asset.rotation.y = options.rotationY ?? 1;

  asset.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  scene.add(asset);

  const mixer = new THREE.AnimationMixer(asset);

  return { model: asset, mixer };
}