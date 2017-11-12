import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class OpenDatabaseForm extends React.Component {
	constructor(props) {
		super(props);
		this._onOpen = props.onOpen;
		this.state = {
			database: undefined,
			password: undefined,
			keyFile: undefined,
		};
	}

	render() {
		return (
			<div className="open-database-form">
				<div className="panel">
					<div className="icon">🗃</div>
					<div className="inputs">
						<Input
							label="Database"
							floatingLabel={false}
							type="file"
							onChange={e => this._handleDatabaseChange(e)}
						/>
						<Input
							label="Password"
							floatingLabel={false}
							type="password"
							onChange={e => this._handlePasswordChange(e)}
						/>
						<Input
							label="Key file (optional)"
							floatingLabel={false}
							type="file"
							onChange={e => this._handleKeyFileChange(e)}
						/>
					</div>
					<div className="button">
						<Button
							color="primary"
							onClick={() => {
								let {
									database,
									password,
									keyFile,
								} = this.state;
								this._onOpen(database, password, keyFile);
							}}
						>
							Open
						</Button>
					</div>
				</div>
			</div>
		);
	}

	_handleDatabaseChange(e) {
		this.setState({ database: e.target.files[0].path });
	}

	_handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	_handleKeyFileChange(e) {
		this.setState({ keyFile: e.target.files[0].path });
	}
}

OpenDatabaseForm.propTypes = {};

export default OpenDatabaseForm;
