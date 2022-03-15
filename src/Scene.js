import React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three';

const cameraDistance = 4;
const rotationDuration = 10 * 1000;
function CameraHandler() {
	/*useThree(({ camera }) => {
		camera.fov = 70;
		camera.updateProjectionMatrix();
	})*/
	useFrame(({ camera }) => {
		camera.position.set(
			Math.sin(Date.now() / rotationDuration) * cameraDistance,
			cameraDistance * 0.5,
			Math.cos(Date.now() / rotationDuration) * cameraDistance,
		);
		camera.lookAt(0, 0.25, 0);
	});
	useThree((props) => {
		props.gl.outputEncoding = THREE.sRGBEncoding;
	});
	return <></>
}

function Scene(props) {
	const sunColor = new THREE.Color(props.colors.sun);

	return (
		<Canvas
			camera={{ fov: 40 }}
			background={props.colors.background}
			shadows
		>
			<directionalLight
				color={sunColor}
				intensity={1}
				position={[16, 13, 10]}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-near={0.1}
				shadow-camera-far={100}
				shadow-camera-left={-2.5}
				shadow-camera-right={2.5}
				shadow-camera-top={2.5}
				shadow-camera-bottom={-2.5}
			/>
			<ambientLight
				intensity={1}
				color={props.colors.shade}
			/>
			<fog attach="fog" args={[props.colors.background, cameraDistance * 1.25, 10]} />
			<CameraHandler />


			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
				<meshLambertMaterial attach="material" color={props.colors.floor} />
			</mesh>

			<mesh position={[0, 0.5, 0]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshLambertMaterial color={props.colors.object} />
			</mesh>
			<mesh position={[0, 0.5, 1.5]} castShadow receiveShadow>
				<sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
				<meshPhysicalMaterial color={props.colors.object} roughness={0} metalness={0} clearcoat={0.5} />
			</mesh>
			<mesh position={[-1.5, 0.5, 0]} castShadow receiveShadow>
				<cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 1, 64]} />
				<meshLambertMaterial color={props.colors.object} />
			</mesh>
			<mesh position={[1.5, 0.5, 0]} castShadow receiveShadow>
				<octahedronBufferGeometry attach="geometry" args={[0.5, 0]} />
				<meshLambertMaterial color={props.colors.object} />
			</mesh>
			<mesh position={[0, 0.8, -1.5]} castShadow receiveShadow>
				<torusKnotBufferGeometry attach="geometry" args={[0.5, 0.1, 200, 32]} />
				<meshPhysicalMaterial color={props.colors.object} roughness={1} metalness={0} clearcoat={0.5} />
			</mesh>
		</Canvas>
	);
}

export default Scene;
