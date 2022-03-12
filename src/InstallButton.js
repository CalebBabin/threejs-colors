import React, { useState } from 'react'
import Button from './common/Button';

function InstallButton() {
	const [hidden, setHidden] = React.useState(true);
	const [installEvent, setInstallEvent] = React.useState(null);

	useState(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();

			// Stash the event so it can be triggered later.
			setInstallEvent(e);

			// Update UI to notify the user they can add to home screen
			setHidden(false);
		});
	}, []);

	return (
		<div className={'absolute top-0 right-0 ' + (hidden ? 'hidden' : 'block')}>
			<Button onClick={() => {

				// hide our user interface that shows our A2HS button
				setHidden(true);

				// Show the prompt
				installEvent.prompt();

				// Wait for the user to respond to the prompt
				installEvent.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						console.log('User accepted the A2HS prompt');
					} else {
						console.log('User dismissed the A2HS prompt');
					}
					setInstallEvent(null);
				});
			}}>
				Add to Home Screen
			</Button>
		</div>
	);
}

export default InstallButton;
