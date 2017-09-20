import { connect } from 'react-redux';

import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
	items: state.entries,
	fields: {
		label: 'title',
	},
});

export default connect(mapStateToProps)(List);
