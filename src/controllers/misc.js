const { DbConnection, tables } = require('../common');

const db = new DbConnection();

exports.get_all_misc = async (req, res) => res.send(await db.execute(req, res, `SELECT * FROM ${tables.misc}`));