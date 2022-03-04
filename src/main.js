import * as THREE from "three";
import Stats from "stats-js";

/*
** connect to twitch chat
*/



const params = (new URL(document.location)).searchParams;

let randomHue = Math.random() * 360;

let sunColor = new THREE.Color(params.get("sunColor") || ("#ffffff"));
let shadeColor = new THREE.Color(params.get("shadeColor") || ("hsl(" + randomHue + ", 30%, 50%)"));
let floorColor = new THREE.Color(params.get("floorColor") || "#DDDDDD");
let backgroundColor = new THREE.Color(params.get("backgroundColor") || '#' + shadeColor.getHexString());
let objectColor = new THREE.Color(params.get("objectColor") || "#ffffff");

const objectMaterial = new THREE.MeshLambertMaterial({
	color: objectColor,
});

window.addEventListener("DOMContentLoaded", () => {
	const sunInput = document.getElementById("sunColor");
	const shadeInput = document.getElementById("shadeColor");

	sunInput.value = '#' + sunColor.getHexString();
	shadeInput.value = '#' + shadeColor.getHexString();

	sunColor.sub(shadeColor);
	sunLight.color = sunColor;

	sunInput.addEventListener("change", () => {
		sunColor.set(sunInput.value);
		sunColor.sub(shadeColor);
		sunLight.color = sunColor;
	});
	shadeInput.addEventListener("change", () => {
		shadeColor.set(shadeInput.value);

		sunColor.set(sunInput.value);
		sunColor.sub(shadeColor);
		sunLight.color = sunColor;
		ambientLight.color = shadeColor;

		scene.fog.color = shadeColor;
		scene.background = shadeColor;
	});
});

let stats = false;
if (params.get("stats") === "true") {
	stats = new Stats();
	stats.showPanel(1);
	document.body.appendChild(stats.dom);
}

/*
** Initiate ThreejS scene
*/

const cameraDistance = 5;

const camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	cameraDistance * 2
);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('resize', resize);
	if (stats) document.body.appendChild(stats.dom);
	document.body.appendChild(renderer.domElement);
	resize();
	draw();
})

/*
** Draw loop
*/
let lastFrame = 0;
function draw() {
	if (stats) stats.begin();
	requestAnimationFrame(draw);
	const delta = Math.min(1, Math.max(0, (performance.now() - lastFrame) / 1000));
	lastFrame = performance.now();

	camera.position.set(Math.sin(Date.now() / 3000) * 1, 1, Math.cos(Date.now() / 3000) * 1).normalize().multiplyScalar(cameraDistance);
	camera.lookAt(0, 0.25, 0);

	renderer.render(scene, camera);
	if (stats) stats.end();
};



scene.background = new THREE.Color(backgroundColor);
scene.fog = new THREE.Fog(backgroundColor, cameraDistance * 1.5, cameraDistance * 2);

const sunShadowWidth = 2.25;
const sunLight = new THREE.DirectionalLight(sunColor, 1);
sunLight.position.set(-1, 1.1, 0.5).normalize().multiplyScalar(10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.1;
sunLight.shadow.camera.far = 30;
sunLight.shadow.camera.left = -sunShadowWidth;
sunLight.shadow.camera.right = sunShadowWidth;
sunLight.shadow.camera.top = sunShadowWidth;
sunLight.shadow.camera.bottom = -sunShadowWidth;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(shadeColor, 1);
scene.add(ambientLight);

const floor = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(cameraDistance * 10, cameraDistance * 10, 1, 1),
	new THREE.MeshLambertMaterial({ color: floorColor })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const cube = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1, 1, 1),
	objectMaterial
);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.set(0, 0.5, 0);
scene.add(cube);

const sphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 32, 32),
	objectMaterial
);
sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.position.set(1.5, 0.5, 0);
scene.add(sphere);

const cylinder = new THREE.Mesh(
	new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 32),
	objectMaterial
);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
cylinder.position.set(-1.5, 0.5, 0);
scene.add(cylinder);

const octahedron = new THREE.Mesh(
	new THREE.OctahedronBufferGeometry(0.5, 0),
	objectMaterial
);
octahedron.castShadow = true;
octahedron.receiveShadow = true;
octahedron.position.set(0, 0.5, 1.5);
scene.add(octahedron);

const knot = new THREE.Mesh(
	new THREE.TorusKnotBufferGeometry(0.5, 0.1, 100, 16),
	objectMaterial
);
knot.castShadow = true;
knot.receiveShadow = true;
knot.position.set(0, 0.75, -1.5);
scene.add(knot);