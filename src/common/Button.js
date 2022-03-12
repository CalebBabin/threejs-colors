import React from 'react'

function Button(props) {
	return (
		<button {...props} className={'border rounded px-2 m-1 text-white bg-black/50 hover:bg-black active:bg-white active:text-black ' + props.className}>
			{props.children}
		</button>
	);
}

export default Button;
