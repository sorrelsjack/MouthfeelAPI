import { DbConnection, tables } from '../common';

const db = new DbConnection();

exports.get_all_flavors = (req, res) => db.execute(req, res, `SELECT * FROM ${tables.flavors}`);