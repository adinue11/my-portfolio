import { CODE_SET_1, CODE_SET_2, createTypewriter } from './typewriter.js';

export function runCharacterTimeline(sceneObj) {
  const { torsoGroup, headGroup, armL, armR, bubbleGroup, monitorL, monitorR, keyboard, chairRig } = sceneObj;

  const pulseTyping = () => {
    gsap.to(keyboard.position, { y: keyboard.position.y + 0.012, duration: 0.05, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(keyboard.position, { y: keyboard.position.y, duration: 0.12, delay: 0.05, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(chairRig.position, { y: 12 + 8, duration: 0.05, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(chairRig.position, { y: 2, duration: 0.12, delay: 0.05, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armL.shoulder.rotation, { x: -0.4, z: 0.3, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(armL.elbow.rotation, { x: -0.16, z: 0.18, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(armL.hand.rotation, { x: 0.08, z: -0.06, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(armR.shoulder.rotation, { x: -0.2, z: -0.12, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(armR.elbow.rotation, { x: -0.2, z: 0.04, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(armR.hand.rotation, { x: 0.05, z: 0.02, duration: 0.06, ease: 'power2.out', overwrite: 'auto' });

    gsap.to(armL.shoulder.rotation, { x: -0.28, z: 0.16, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armL.elbow.rotation, { x: -0.24, z: 0.04, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armL.hand.rotation, { x: 0.02, z: 0.02, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armR.shoulder.rotation, { x: -0.14, z: -0.05, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armR.elbow.rotation, { x: -0.16, z: 0.0, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
    gsap.to(armR.hand.rotation, { x: 0.0, z: 0.0, duration: 0.12, delay: 0.06, ease: 'power2.inOut', overwrite: 'auto' });
  };

  const tw1 = createTypewriter(monitorL, CODE_SET_1, pulseTyping);
  const tw2 = createTypewriter(monitorR, CODE_SET_2, pulseTyping);

  gsap.set(armR.shoulder.rotation, { x: -0.16, z: -0.05 });
  gsap.set(armR.elbow.rotation, { x: -0.16, z: 0.0 });
  gsap.set(armR.hand.rotation, { x: 0.0, z: 0.0 });
  gsap.set(armL.shoulder.rotation, { x: -0.28, z: 0.16 });
  gsap.set(armL.elbow.rotation, { x: -0.24, z: 0.04 });
  gsap.set(armL.hand.rotation, { x: 0.02, z: 0.02 });

  const master = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

  master.to(headGroup.rotation, { y: 0.18, duration: 0.6 }, 0);
  master.to(armR.shoulder.rotation, { z: -0.24, x: -0.22, duration: 0.55 }, 0.1);
  master.to(armR.elbow.rotation, { z: 0.1, duration: 0.2 }, 0.25);
  master.to(armR.elbow.rotation, { z: -0.08, duration: 0.2 }, 0.45);
  master.to(armR.shoulder.rotation, { z: -0.05, x: -0.14, duration: 0.45 }, 0.8);

  master.to(headGroup.rotation, { y: -0.18, duration: 0.8 }, 1.0);
  master.to(torsoGroup.rotation, { y: -0.08, duration: 0.8 }, '<');
  master.to(armL.shoulder.rotation, { x: 36, z: 0.18, duration: 0.7 }, '<');
  master.to(armL.elbow.rotation, { x: -0.24, z: 0.02, duration: 0.7 }, '<');
  master.to(armR.shoulder.rotation, { x: -0.24, z: -0.08, duration: 0.7 }, '<');
  master.to(armR.elbow.rotation, { x: -0.16, z: 0.02, duration: 0.7 }, '<');

  master.call(() => {
    tw1.start();
    sceneObj.musicNotes.forEach((note) => {
      note.visible = true;
    });
  });
  master.to({}, { duration: 3.7 });
  master.call(() => {
    tw1.stop();
    sceneObj.musicNotes.forEach((note) => {
      note.visible = false;
    });
  });

  master.to(armL.shoulder.rotation, { x: -0.3, duration: 0.4 }, '+=0.05');
  master.to(armR.shoulder.rotation, { x: -0.16, duration: 0.4 }, '<');
  master.to(headGroup.rotation, { z: 0.12, duration: 0.5, ease: 'sine.inOut' }, '<');
  master.to(bubbleGroup.scale, { x: 1, y: 1, z: 1, duration: 0.45, ease: 'back.out(2.2)' }, '<0.1');
  master.to({}, { duration: 1.4 });
  master.to(bubbleGroup.scale, { x: 0, y: 0, z: 0, duration: 0.3, ease: 'back.in(2)' });
  master.to(headGroup.rotation, { z: 0, duration: 0.3 }, '<');

  master.to(headGroup.rotation, { y: 0.3, duration: 0.9 }, '+=0.1');
  master.to(torsoGroup.rotation, { y: 0.08, duration: 0.9 }, '<');
  master.to(armL.shoulder.rotation, { x: -0.36, z: 0.18, duration: 0.7 }, '<');
  master.to(armL.elbow.rotation, { x: -0.24, z: 0.02, duration: 0.7 }, '<');
  master.to(armR.shoulder.rotation, { x: -0.24, z: -0.08, duration: 0.7 }, '<');
  master.to(armR.elbow.rotation, { x: -0.16, z: 0.02, duration: 0.7 }, '<');

  master.call(() => {
    tw2.start();
    sceneObj.musicNotes.forEach((note) => {
      note.visible = true;
    });
  });
  master.to({}, { duration: 3.8 });
  master.call(() => {
    tw2.stop();
    sceneObj.musicNotes.forEach((note) => {
      note.visible = false;
    });
  });

  return master;
}