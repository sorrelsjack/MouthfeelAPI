const { DbConnection, tables } = require('../common');

const db = new DbConnection();

exports.get_all_misc = (req, res) => res.send(db.execute(req, res, `SELECT * FROM ${tables.misc}`));