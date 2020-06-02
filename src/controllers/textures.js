import { DbConnection, tables } from '../common';

const db = new DbConnection();

exports.get_all_textures = (req, res) => res.send(db.execute(req, res, `SELECT * FROM ${tables.textures}`));