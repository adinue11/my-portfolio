import { build3DScene } from './scene.js';

const app = document.getElementById("app");
const isMobile = window.innerWidth < 768;

build3DScene(app, isMobile);