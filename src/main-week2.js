import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {HDRLoader} from 'three/addons/loaders/HDRLoader.js';

let camera, scene, renderer, controls;

init();

function init() {
  // Renderer container
  const container = document.createElement('div');
  document.body.appendChild(container);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 20, 0);

  // Scene
  scene = new THREE.Scene();

  // HDR-tausta
  new HDRLoader()
    .setPath('textures/')
    .load('plains_sunset_4k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });

  // Maisema
  const loader = new GLTFLoader().setPath('/');
  loader.load('landscape/landscape.glb', (gltf) => {
    const model = gltf.scene;

    scene.add(model);

    controls.target.copy(model.position);
    controls.update();
  });

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 50;

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  camera.position.z = 60;

  // Resize
  window.addEventListener('resize', onWindowResize);

  // Animointi
  renderer.setAnimationLoop(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
