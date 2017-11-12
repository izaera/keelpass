import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const List = ({ items, fields }) => (
	<ul>{items.map(item => <li>{item[fields.label]}</li>)}</ul>
);

List.propTypes = {
	items: PropTypes.array.isRequired,
	fields: PropTypes.isRequired,
};

export default List;
