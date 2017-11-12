import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import React from 'react';
import ReactDOM from 'react-dom';

import EntriesList from '../containers/EntriesList';
import OpenDatabaseScreen from '../containers/OpenDatabaseScreen';

export default ({ state }) => {
	switch (state) {
		case 'closed':
			return renderClosed();
		case 'locked':
			return renderLocked();
		case 'unlocked':
			return renderUnlocked();
	}
};

const renderClosed = () => <OpenDatabaseScreen />;

const renderLocked = () => <OpenDatabaseScreen />;

const renderUnlocked = () => (
	<div>
		<Appbar />
		<Container />
	</div>
);
