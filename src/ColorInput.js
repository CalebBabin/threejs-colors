import React from 'react'

function Color(props) {

	let value = '';
	if (props.value && props.value.substr(0, 1) !== '#') {
		value = '#' + props.value;
	} else {
		value = props.value;
	}

	return (
		<>
			<span className='cursor-pointer' title="copy hex to clipboard" onClick={(e) => {
				navigator.clipboard.writeText(props.value.replace('#', ''));
				e.preventDefault();
			}}>📋</span>
			<input type="color" {...props} value={value} />
		</>
	);
}

export default Color;
