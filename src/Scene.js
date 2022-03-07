import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
	return <></>
}

function Scene(props) {
	const sunColor = new THREE.Color(props.sunColor);

	if (props.useSubtractiveLighting) {
		sunColor.sub(new THREE.Color(props.shadeColor));
	}

	const ObjectMaterial = new THREE.MeshLambertMaterial({
		color: props.objectColor,
	});

	return (
		<Canvas
			camera={{ fov: 40 }}
			background={props.backgroundColor}
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
				color={props.shadeColor}
			/>
			<fog attach="fog" args={[props.backgroundColor, cameraDistance, 10]} />
			<CameraHandler />


			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
				<meshLambertMaterial attach="material" color={props.floorColor} />
			</mesh>

			<mesh position={[0, 0.5, 0]} castShadow receiveShadow material={ObjectMaterial}>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			</mesh>
			<mesh position={[1.5, 0.5, 0]} castShadow receiveShadow material={ObjectMaterial}>
				<sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
			</mesh>
			<mesh position={[-1.5, 0.5, 0]} castShadow receiveShadow material={ObjectMaterial}>
				<cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 1, 64]} />
			</mesh>
			<mesh position={[0, 0.5, 1.5]} castShadow receiveShadow material={ObjectMaterial}>
				<octahedronBufferGeometry attach="geometry" args={[0.5, 0]} />
			</mesh>
			<mesh position={[0, 0.8, -1.5]} castShadow receiveShadow material={ObjectMaterial}>
				<torusKnotBufferGeometry attach="geometry" args={[0.5, 0.1, 200, 32]} />
			</mesh>
		</Canvas>
	);
}

export default Scene;
