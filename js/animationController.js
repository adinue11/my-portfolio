import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export class AnimationController {
  constructor(characterModel, mixer) {
    this.model = characterModel;
    this.mixer = mixer;
    this.clips = new Map();
    this.currentAction = null;
    this._isReady = false;
  }

  async loadClips(basePath = '/models') {
    const loader = new FBXLoader();

    const clipFiles = [
      ['Hand-Raising', 'Hand-Raising.fbx'],
      ['Right-Turn', 'Right-Turn.fbx'],
      ['Stand-To-Sit', 'Stand-To-Sit.fbx'],
      ['Typing', 'Typing.fbx']
    ];

    for (const [name, file] of clipFiles) {
      const clipAsset = await loader.loadAsync(`${basePath}/${file}`);
      const clip = clipAsset.animations?.[0];

      if (clip) {
        this.clips.set(name, clip);
      }
    }

    this._isReady = true;
    return this;
  }

  play(name) {
    if (!this._isReady) return;

    const clip = this.clips.get(name);
    if (!clip) return;

    if (this.currentAction) {
      this.currentAction.stop();
    }

    const action = this.mixer.clipAction(clip);
    action.reset();
    action.play();

    this.currentAction = action;
  }

  update(delta) {
    this.mixer.update(delta);
  }

  dispose() {
    if (this.currentAction) {
      this.currentAction.stop();
    }
  }
}