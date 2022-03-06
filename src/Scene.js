import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
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
			cameraDistance * 0.9,
			Math.cos(Date.now() / rotationDuration) * cameraDistance,
		);
		camera.lookAt(0, 0.5, 0);
	});
	return <></>
}

function Scene(props) {
	const sunColor = new THREE.Color(props.sunColor).sub(new THREE.Color(props.shadeColor));

	return (
		<Canvas
			shadowMap={THREE.PCFShadowMap}
			camera={{ fov: 50 }}
			background={props.backgroundColor}

			style={{
				background: props.backgroundColor,
			}}
		>
			<directionalLight
				color={sunColor}
				position={[20, 20, 10]}
				castShadow
				shadow-mapSize-width={4096}
				shadow-mapSize-height={4096}
				shadow-camera-near={0.1}
				shadow-camera-far={100}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			<ambientLight color={props.shadeColor} />
			<fog attach="fog" args={[props.backgroundColor, cameraDistance, 20]} />
			<CameraHandler />


			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
				<meshStandardMaterial attach="material" color={props.floorColor} />
			</mesh>

			<mesh position={[0, 0.5, 0]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshStandardMaterial attach="material" color={props.objectColor} />
			</mesh>
			<mesh position={[1.5, 0.5, 0]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshStandardMaterial attach="material" color={props.objectColor} />
			</mesh>
			<mesh position={[-1.5, 0.5, 0]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshStandardMaterial attach="material" color={props.objectColor} />
			</mesh>
			<mesh position={[0, 0.5, 1.5]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshStandardMaterial attach="material" color={props.objectColor} />
			</mesh>
			<mesh position={[0, 0.5, -1.5]} castShadow receiveShadow>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshStandardMaterial attach="material" color={props.objectColor} />
			</mesh>
		</Canvas>
	);
}

export default Scene;
