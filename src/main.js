import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

let controls, camera, scene, renderer, bottom, middle, top, eye, eye2, nose;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // objects

  const geometry = new THREE.SphereGeometry(60, 20, 10);
  const material = new THREE.MeshLambertMaterial({color: 0xffffff});
  const eyeMaterial = new THREE.MeshPhongMaterial({color: 0x635f60});

  bottom = new THREE.Mesh(geometry, material);
  bottom.position.set(0, -75, 0);
  bottom.scale.set(1, 1, 1);
  scene.add(bottom);

  middle = new THREE.Mesh(geometry, material);
  middle.position.set(0, 0, 0);
  middle.scale.set(0.75, 0.75, 0.75);
  scene.add(middle);

  top = new THREE.Mesh(geometry, material);
  top.position.set(0, 60, 0);
  top.scale.set(0.5, 0.5, 0.5);
  scene.add(top);

  eye = new THREE.Mesh(new THREE.SphereGeometry(4, 5, 10), eyeMaterial);
  eye.position.set(-15, 65, 25);
  scene.add(eye);

  eye2 = new THREE.Mesh(new THREE.SphereGeometry(4, 5, 10), eyeMaterial);
  eye2.position.set(15, 65, 25);
  scene.add(eye2);

  nose = new THREE.ConeGeometry(7, 20, 32);
  const noseMesh = new THREE.Mesh(
    nose,
    new THREE.MeshPhongMaterial({color: 0xffa500}),
  );

  noseMesh.rotation.x = Math.PI / 2;
  noseMesh.position.set(0, 60, 30);
  scene.add(noseMesh);

  // lights

  const light = new THREE.HemisphereLight(0xffffff, 0xadd8e6, 1);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  camera.position.z = 300;

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

  renderer.setAnimationLoop(animate);
}

function animate() {
  bottom.rotation.x += 0.001;
  bottom.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize, false);
