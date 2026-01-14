const camDist = 5;
let camAngle = 0;
const pi = 3.141592653589793238462643383279;

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.y = 3;

//plane
const geometry = new THREE.PlaneGeometry(5, 5);
const material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
material.transparent = true;
material.opacity = 0.3;
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = pi / 2;
	
function animate() {
	requestAnimationFrame(animate);
	camAngle += 0.005
	camera.position.x = camDist * Math.cos(camAngle);
	camera.position.z = camDist * Math.sin(camAngle);
	camera.lookAt(0, 0, 0);
	renderer.render(scene, camera);
};
animate();