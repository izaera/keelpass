import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import React from 'react';
import ReactDOM from 'react-dom';

import EntriesList from '../containers/EntriesList';

export default () => {
	return (
		<div>
			<Appbar />
			<Container>
				<EntriesList />
			</Container>
		</div>
	);
};
