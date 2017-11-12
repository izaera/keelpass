import { connect } from 'react-redux';

import * as database from '../../actions/database';
import OpenDatabaseForm from '../components/OpenDatabaseForm';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onOpen: (db, password, keyFile) =>
			dispatch(database.open(db, password, keyFile)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenDatabaseForm);
