import React from 'react'

function Button(props) {
	return (
		<button {...props} className={'border rounded px-1 m-1 hover:bg-black active:bg-white active:text-black ' + props.className}>
			{props.children}
		</button>
	);
}

export default Button;
