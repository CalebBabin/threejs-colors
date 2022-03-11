import React from 'react'

function Color(props) {

	return (
		<>
			<span className='cursor-pointer' title="copy hex to clipboard" onClick={(e) => {
				navigator.clipboard.writeText(props.value.replace('#', ''));
				e.preventDefault();
			}}>📋</span>
			<input type="color" {...props} />
		</>
	);
}

export default Color;
