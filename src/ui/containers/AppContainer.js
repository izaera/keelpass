import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = ({ application, database }, ownProps) => ({
	state: database.loaded
		? application.locked ? 'locked' : 'unlocked'
		: 'closed',
});

export default connect(mapStateToProps)(App);
