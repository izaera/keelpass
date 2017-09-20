'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// *** See examples of usage at the bottom ***

var fs = require('fs');
var kp = require('kdbxweb');
var promisify = require('es6-promisify');
var FuzzySearch = require('fuzzy-search');

var readFile = promisify(fs.readFile);
var Kdbx = kp.Kdbx;
var Credentials = kp.Credentials;
var ProtectedValue = kp.ProtectedValue;
var Consts = kp.Consts;
var ByteUtils = kp.ByteUtils;

var Database = function () {
	function Database(path) {
		_classCallCheck(this, Database);

		this._path = path;
		this._db = null;
		this._defaultGroup = null;
	}

	/**
 	 * @return a Promise which resolves to the Database when the file is open
  */


	_createClass(Database, [{
		key: 'open',
		value: function open(password) {
			var _this = this;

			return readFile(this._path).then(function (data) {
				return Kdbx.load(data.buffer, new Credentials(ProtectedValue.fromString(password)));
			}).then(function (db) {
				_this._db = db;
				_this._defaultGroup = db.getDefaultGroup();
			}).then(function () {
				return _this;
			});
		}

		/**
   * Save database to its file
   * @return a Promise which resolves to the Database when the file is saved
   */

	}, {
		key: 'save',
		value: function save() {
			var _this2 = this;

			return this._db.save().then(function (data) {
				return fs.writeFile(_this2._path, new Uint8Array(data));
			}).then(function () {
				return _this2;
			});
		}

		/**
   * @param an Entry or a raw Object describing the informed fields
   * @return the newly created Entry (with its id informed)
   * @throws if the entry already exists (it has its id field set)
   */

	}, {
		key: 'addEntry',
		value: function addEntry(entry) {
			if (entry.id != null) {
				throw new Error('Trying to add an already existing entry: ' + entry.id);
			}

			// Clone entry (this coerces Objects and duplicates Entry's)
			entry = new Entry(entry);

			var dbEntry = this._db.createEntry(this._defaultGroup);
			entry.id = dbEntry.uuid;

			this.updateEntry(entry);

			return entry;
		}

		/**
   * Get entry by id
   * @return the Entry
   * @throws if the entry does not exist
   */

	}, {
		key: 'getEntry',
		value: function getEntry(id) {
			return Entry._fromDbEntry(this._getDbEntry(id));
		}

		/**
   * Find all entries matching keywords. If keywords is null or '', all entries
   * are returned.
   * @return an array of Entry objects
   */

	}, {
		key: 'findEntries',
		value: function findEntries() {
			var keywords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			var dbEntries;

			if (keywords == null || keywords == '') {
				dbEntries = this._defaultGroup.entries;
			} else {
				var fuzzySearch = new FuzzySearch(this._defaultGroup.entries, ['fields.Title', 'fields.URL', 'fields.UserName'], {
					caseSensitive: false
				});

				dbEntries = fuzzySearch.search(keywords);
			}

			return dbEntries.map(function (dbEntry) {
				return Entry._fromDbEntry(dbEntry);
			});
		}

		/**
    *
   * @throws if the entry does not exist
   */

	}, {
		key: 'updateEntry',
		value: function updateEntry(entry) {
			if (entry.id == null) {
				throw new Error('Trying to update an entry with no id');
			}

			var dbEntry = this._getDbEntry(entry.id);

			dbEntry.fields.Title = entry.title;
			dbEntry.icon = entry.icon;
			dbEntry.fields.URL = entry.url;
			dbEntry.fields.UserName = entry.userName;
			dbEntry.fields.Password = ProtectedValue.fromString(entry.password);
		}

		/**
   * Deletes an existing entry given the Entry or its id
   * @throws if the entry does not exist
   */

	}, {
		key: 'deleteEntry',
		value: function deleteEntry(entryOrId) {
			var id = entryOrId.id || entryOrId;

			this._db.remove(this._getDbEntry(id));
		}
	}, {
		key: 'dump',
		value: function dump() {
			new DatabaseDumper(this._db).dump();
		}

		/**
   * @throws if the entry does not exist
   */

	}, {
		key: '_getDbEntry',
		value: function _getDbEntry(uuid) {
			var dbEntry = this._defaultGroup.entries.find(function (entry) {
				return entry.uuid.id == uuid;
			});

			if (dbEntry === undefined) {
				throw new Error('Entry not found: ' + uuid);
			}

			return dbEntry;
		}
	}]);

	return Database;
}();

var Entry = function () {
	_createClass(Entry, null, [{
		key: '_fromDbEntry',
		value: function _fromDbEntry(dbEntry) {
			return new Entry({
				id: dbEntry.uuid,
				title: dbEntry.fields.Title,
				icon: dbEntry.icon,
				url: dbEntry.fields.URL,
				userName: dbEntry.fields.UserName,
				password: dbEntry.fields.Password.getText()
			});
		}
	}]);

	function Entry() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$id = _ref.id,
		    id = _ref$id === undefined ? null : _ref$id,
		    _ref$title = _ref.title,
		    title = _ref$title === undefined ? '' : _ref$title,
		    _ref$icon = _ref.icon,
		    icon = _ref$icon === undefined ? 0 : _ref$icon,
		    _ref$url = _ref.url,
		    url = _ref$url === undefined ? '' : _ref$url,
		    _ref$userName = _ref.userName,
		    userName = _ref$userName === undefined ? '' : _ref$userName,
		    _ref$password = _ref.password,
		    password = _ref$password === undefined ? '' : _ref$password;

		_classCallCheck(this, Entry);

		this.id = id;
		this.title = title;
		this.icon = icon;
		this.url = url;
		this.userName = userName;
		this.password = password;
	}

	return Entry;
}();

var DatabaseDumper = function () {
	function DatabaseDumper(db) {
		_classCallCheck(this, DatabaseDumper);

		this._db = db;
	}

	_createClass(DatabaseDumper, [{
		key: 'dump',
		value: function dump() {
			this._dumpHeader();
			this._dumpMeta();
			this._dumpGroup(0, this._db.getDefaultGroup());
		}
	}, {
		key: '_dumpHeader',
		value: function _dumpHeader() {
			var header = this._db.header;
			console.log(this._db);
			console.log('# Header:');
			console.log('  Version:', header.versionMajor + '.' + header.versionMinor);
			console.log('  Compression:', this._find(Consts.CompressionAlgorithm, header.compression));
			console.log('  Cipher:', this._find(Consts.CipherId, header.dataCipherUuid));
			console.log('  Encryption rounds:', '' + header.keyEncryptionRounds);
			console.log('  Stream cipher:', this._find(Consts.CrsAlgorithm, header.crsAlgorithm));
		}
	}, {
		key: '_dumpMeta',
		value: function _dumpMeta() {
			var meta = this._db.meta;

			console.log('# Meta:');
			console.log('  Generator:', '' + meta.generator);
		}
	}, {
		key: '_dumpGroup',
		value: function _dumpGroup(level, group) {
			var _this3 = this;

			var indent = level == 0 ? '' : ' '.repeat(level * 2);

			console.log(indent + ('* Group \'' + group.name + '\':'));
			console.log(indent + '    Id:', '' + group.id);
			console.log(indent + '    Icon:', '' + group.icon);
			console.log(indent + '    Custom icon:', '' + group.customIcon);
			console.log(indent + '    Notes:', '' + group.notes);

			group.groups.forEach(function (group) {
				return _this3._dumpGroup(level + 1, group);
			});
			group.entries.forEach(function (entry) {
				return _this3._dumpEntry(level + 1, entry);
			});
		}
	}, {
		key: '_dumpEntry',
		value: function _dumpEntry(level, entry) {
			var indent = level == 0 ? '' : ' '.repeat(level * 2);

			console.log(indent + ('\xB7 Entry \'' + entry.fields.Title + '\':'));
			console.log(indent + '    Id:', '' + entry.id);
			console.log(indent + '    Icon:', '' + entry.icon);
			console.log(indent + '    Custom icon:', '' + entry.customIcon);
			console.log(indent + '    Notes:', '' + entry.fields.Notes);
			console.log(indent + '    URL:', '' + entry.fields.URL);
			console.log(indent + '    User name:', '' + entry.fields.UserName);
			console.log(indent + '    Password:', '' + entry.fields.Password.getText());
		}
	}, {
		key: '_find',
		value: function _find(where, what) {
			return Object.keys(where).find(function (key) {
				return where[key] == what;
			});
		}
	}]);

	return DatabaseDumper;
}();

module.exports = {
	Database: Database,
	Entry: Entry
};

// Usage examples:

// *** Open database
// var db = new Database('sample-keepass-db.kdbx');
// db.open('password').then(() => ...);

// *** Create an entry
// db.addEntry({
// 	title: 'My entry',
// 	userName: 'me',
// 	password: 'secret',
// 	url: 'https://www.google.com',
// });

// *** Get an entry
// var entry = db.getEntry('Bkxzh2wTW6YNhqoOeYUzww==');

// *** Delete an entry
// db.deleteEntry('Bkxzh2wTW6YNhqoOeYUzww==');

// *** Update an entry
// var entry = db.getEntry('BokXdYe/rFGWfAKxk/Y27A==');
// entry.title = 'New title';
// db.updateEntry(entry);

// *** Get all entries
// var entries = db.findEntries();

// *** Search entries containing 'google' in the title, user or URL
// var entries = db.findEntries('google');
//# sourceMappingURL=index.js.map