import React, { useEffect, useState } from 'react'
import Scene from './Scene';
import * as THREE from 'three';
import Color from './ColorInput';

function randomColor(saturation = 0.3, lightness = 0.5, hueStart = 0, hueEnd = 360) {
	return "#" + (new THREE.Color(`hsl(${Math.random() * hueEnd + hueStart}, ${Math.min(1, saturation) * 100}%, ${Math.min(1, lightness) * 100}%)`).getHexString());
}

function App() {
	const [colors, setColors] = useState({
		sun: '#FFFFFF',
		shade: randomColor(),
		floor: "#DDDDDD",
		background: randomColor(0.5, 0.9),
		object: "#FFFFFF",
	})

	const [useSubtractiveLighting, setUseSubtractiveLighting] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const updateObj = {};
		for (const key in colors) {
			if (Object.hasOwnProperty.call(colors, key)) {
				if (params.has(key)) {
					updateObj[key] = params.get(key);
				}
			}
		}
		if (params.has('subLighting')) {
			setUseSubtractiveLighting(params.get('subLighting') === 'true');
		}
	}, []);

	return (
		<div className='w-full h-full'>
			<Scene useSubtractiveLighting={useSubtractiveLighting} colors={colors} />
			<div className='absolute top-0 left-0 p-4 rounded-br-xl bg-black bg-opacity-50 text-white'>
				<div>
					<Color value={colors.sun} onChange={(e) => setColors({ ...colors, sun: e.target.value })} /> Sun
				</div>
				<div>
					<input type="checkbox" checked={useSubtractiveLighting} onChange={(e) => setUseSubtractiveLighting(e.target.checked)} id="subLight" /> <label htmlFor="subLight">Subtract shade from sun</label>
					<div className='text-right'>
						<small>(helps prevent peaking)</small>
					</div>
				</div>
				<div>
					<Color value={colors.shade} onChange={(e) => setColors({ ...colors, shade: e.target.value })} /> Shade
				</div>
				<div>
					<Color value={colors.floor} onChange={(e) => setColors({ ...colors, floor: e.target.value })} /> Floor
				</div>
				<div>
					<Color value={colors.background} onChange={(e) => setColors({ ...colors, background: e.target.value })} /> Background
				</div>
				<div>
					<Color value={colors.object} onChange={(e) => setColors({ ...colors, object: e.target.value })} /> Object
				</div>
				<button className='border rounded px-1 my-1 hover:bg-black active:bg-white active:text-black' onClick={() => {
					setColors({ ...colors, shade: randomColor(), background: randomColor(0.5, 0.9) });
				}}>Randomize</button>
			</div>
		</div>
	);
}

export default App;
