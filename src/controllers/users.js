const { DbConnection, tables } = require('../common');

const db = new DbConnection();

exports.get_all_users = (req, res) => res.send(db.execute(req, res, `SELECT * FROM ${tables.users}`));

exports.register_user = (req, res) => {
    res.send('Register user')
};

exports.login = (req, res) => {
    res.send('Login')
};

exports.reset_password = (req, res) => {

};