import React, { useEffect, useState } from 'react'
import Scene from './Scene';
import * as THREE from 'three';

function randomColor(saturation = 0.3, lightness = 0.5, hueStart = 0, hueEnd = 360) {
	return "#" + (new THREE.Color(`hsl(${Math.random() * hueEnd + hueStart}, ${Math.min(1, saturation) * 100}%, ${Math.min(1, lightness) * 100}%)`).getHexString());
}

function App() {
	const [sunColor, setSunColor] = useState('#FFFFFF');
	const [shadeColor, setShadeColor] = useState(randomColor());
	const [floorColor, setFloorColor] = useState("#DDDDDD");
	const [backgroundColor, setBackgroundColor] = useState(randomColor(0.5, 0.9));
	const [objectColor, setObjectColor] = useState("#FFFFFF");

	const [useSubtractiveLighting, setUseSubtractiveLighting] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.has('sun')) {
			setSunColor('#' + params.get('sun'));
		}
		if (params.has('shade')) {
			setShadeColor('#' + params.get('shade'));
		}
		if (params.has('floor')) {
			setFloorColor('#' + params.get('floor'));
		}
		if (params.has('background')) {
			setBackgroundColor('#' + params.get('background'));
		}
		if (params.has('object')) {
			setObjectColor('#' + params.get('object'));
		}
		if (params.has('subLighting')) {
			setUseSubtractiveLighting(params.get('subLighting') === 'true');
		}
	}, []);

	return (
		<div className='w-full h-full'>
			<Scene useSubtractiveLighting={useSubtractiveLighting} sunColor={sunColor} shadeColor={shadeColor} floorColor={floorColor} backgroundColor={backgroundColor} objectColor={objectColor} />
			<div className='absolute top-0 left-0 p-4 rounded-br-xl bg-black bg-opacity-50 text-white'>
				<div>
					<input type="color" value={sunColor} onChange={(e) => setSunColor(e.target.value)} /> Sun
				</div>
				<div>
					<input type="checkbox" checked={useSubtractiveLighting} onChange={(e) => setUseSubtractiveLighting(e.target.checked)} id="subLight" /> <label htmlFor="subLight">Subtract shade from sun</label>
					<div className='text-right'>
						<small>(helps prevent peaking)</small>
					</div>
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
				<button className='border rounded px-1 my-1 hover:bg-black active:bg-white active:text-black' onClick={() => {
					setShadeColor(randomColor());
					setBackgroundColor(randomColor(0.5, 0.9));
				}}>Randomize</button>
			</div>
		</div>
	);
}

export default App;
