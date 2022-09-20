import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
	antialias: true,
})
var canvas = renderer.domElement;
document.body.appendChild(canvas);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const bgcolor = new THREE.Color('black');
scene.background = bgcolor;

renderer.render(scene, camera);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(10, 3, 16, 100),
	new THREE.MeshBasicMaterial({color: 0x752010, wireframe: true})
);
torus.geometry.translate(0, 0, 1);


scene.add(torus);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -20)
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	raycaster.ray.intersectPlane(plane, pointOfIntersection);
	torus.lookAt(pointOfIntersection);
};

renderer.setAnimationLoop(() => {
	if (resize(renderer)) {
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	renderer.render(scene, camera);
});

function resize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
	  renderer.setSize(width, height, false);
	}
	return needResize;
}
/* //OTHER WAY OF RENDERING
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();*/