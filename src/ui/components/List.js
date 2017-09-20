import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
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
