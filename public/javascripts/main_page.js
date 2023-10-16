// Import GSAP
import gsap from "https://cdn.skypack.dev/gsap@3.9.0";
//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
const loader = new GLTFLoader();

//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1000);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({alpha: true,antialias: true,}); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvasContainer').appendChild(renderer.domElement);

let car = null
loader.load(
    'models/scene2.gltf',
    (gltf) => {
        console.log(gltf);
        car = gltf.scene
        car.position.set(4.5, 0, -10);
        car.scale.set(0.00959,0.00959,0.00959);
        car.rotation.set(0,-7.0275,0);
        scene.add(car)
    },
    (progress) => {
        console.log(progress);
    },
    (error) => {
        console.error(error);
    }
)

//Lights
const light = new THREE.PointLight(0xFFFFFF,0.5,100);
light.position.set( 3.5, 15, -10 );
scene.add( light );

const light2 = new THREE.PointLight(0xFFFFFF,0.15,100);
light2.position.set( 4.5, 15, -10 );
scene.add( light2 );

const light3 = new THREE.PointLight(0xFFFFFF,0.15,100);
light3.position.set( 2.5, 15, -10 );
scene.add( light3 );

const light4 = new THREE.PointLight(0xFFFFFF,0.15,100);
light4.position.set( 3.5, 5, -3 );
scene.add( light4 );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

camera.position.set(0,1.5,-1);

// // Function to rotate model based on scroll
//   function updateCarPosition() {
//     const scrollPosition = window.scrollY;
//     // Determine the current section based on scroll position
//     let currentSection;
//     if (scrollPosition < window.innerHeight) {
//       currentSection = 0;  // Section 0
//     } else if (scrollPosition < 2 * window.innerHeight) {
//       currentSection = 1;  // Section 1
//     } else {
//       currentSection = 2;  // Section 2
//     }
//     car.rotation.y = (0.00125*scrollPosition);
//     console.log(scrollPosition);
//     camera.lookAt(0, 1.5, -10);
//   }
  
//GSAP function trial
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight
// }

// let scrollY = window.scrollY
// let currentSection = 0

// const carAnimation = [{
//         rotationY: -7.0275,
//         positionX: 4.5
//     },
//     {
//         rotationY: -3.7625,
//         positionX: -3.5
//     },
//     {
//         rotationY: -1.375,
//         positionX: 4.5
//     },
// ]

function updateCarPosition(){
    if (car) {
        var time = Date.now() * 0.001;
        const clock = new THREE.Clock();
        let lastElapsedTime = 0;
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - lastElapsedTime
        lastElapsedTime = elapsedTime

        car.rotation.y = time % (2 * Math.PI);
        car.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1;
    }
    

//   scrollY = window.scrollY
//     const newSection = Math.round(scrollY / sizes.height)

//     console.log(newSection);

//     if (newSection != currentSection) {
//         currentSection = newSection
//         if (!!car) {
//           gsap.to(
//               car.rotation, {
//                   duration: 1.5,
//                   ease: 'power2.inOut',
//                   y: carAnimation[currentSection].rotationY
//               }
//           )
//           gsap.to(
//               car.position, {
//                   duration: 1.5,
//                   ease: 'power2.inOut',
//                   x: carAnimation[currentSection].positionX
//               }
//           )
//       }
//   }
}

// Add event listener for scroll event
window.addEventListener("scroll", updateCarPosition);

//Render the scene
function animate() {
    updateCarPosition();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
//Start the 3D rendering
animate();