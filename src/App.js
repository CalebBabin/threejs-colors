import React, { useState } from 'react'
import Scene from './Scene';
import * as THREE from 'three';

function randomColor() {
	return "#" + (new THREE.Color("hsl(" + Math.random() * 360 + ", 30%, 50%)").getHexString());
}

function App() {
	const [sunColor, setSunColor] = useState('#FFFFFF');
	const [shadeColor, setShadeColor] = useState(randomColor());
	const [floorColor, setFloorColor] = useState("#DDDDDD");
	const [backgroundColor, setBackgroundColor] = useState(randomColor());
	const [objectColor, setObjectColor] = useState("#FFFFFF");


	return (
		<div className='w-full h-full'>
			<Scene sunColor={sunColor} shadeColor={shadeColor} floorColor={floorColor} backgroundColor={backgroundColor} objectColor={objectColor} />
			<div className='absolute top-0 left-0 p-4 rounded-br-xl bg-black bg-opacity-50 text-white'>
				<div>
					<input type="color" value={sunColor} onChange={(e) => setSunColor(e.target.value)} /> Sun
				</div>
				<div>
					<input type="color" value={shadeColor} onChange={(e) => setShadeColor(e.target.value)} /> Shade
				</div>
				<div>
					<input type="color" value={floorColor} onChange={(e) => setFloorColor(e.target.value)} /> Floor
				</div>
				<div>
					<input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} /> Background
				</div>
				<div>
					<input type="color" value={objectColor} onChange={(e) => setObjectColor(e.target.value)} /> Object
				</div>
			</div>
		</div>
	);
}

export default App;
