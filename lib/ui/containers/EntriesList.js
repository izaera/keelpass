'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _List = require('../components/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		items: state.entries,
		fields: {
			label: 'title'
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_List2.default);
//# sourceMappingURL=EntriesList.js.map