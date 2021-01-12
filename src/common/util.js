const { tables, DbConnection } = require('../common');

const db = new DbConnection();

/*
        SELECT name, vote 
        FROM flavor_votes
        LEFT JOIN flavors ON flavor_votes.flavor_id = flavors.id
        WHERE food_id = 1
*/

const tallyVotes = async (req, res, mainTable, voteTable, key) => {
    const result = await db.execute(req, res, 
        `SELECT ${mainTable}.id, name, description, vote 
        FROM ${voteTable} 
        LEFT JOIN ${mainTable} ON ${voteTable}.${key} = ${mainTable}.id 
        WHERE food_id = ${req.params.id}`
    );

    let summed = [];

    result.forEach(r => {
        const existing = summed.filter(i => { return i.name === r.name })[0];

        if (!existing) {
            const voteValue = r.vote;
            delete r.vote;
            summed.push({ ...r, votes: voteValue });
        }
        else
            existing.votes += r.vote; // TODO: Change the name in the object to votes or something
    });

    return summed;
};

const tallyFlavorVotes = async (req, res) => await tallyVotes(req, res, tables.flavors, tables.flavorVotes, 'flavor_id');

const tallyTextureVotes = async (req, res) => await tallyVotes(req, res, tables.textures, tables.textureVotes, 'texture_id');

const tallyMiscVotes = async (req, res) => await tallyVotes(req, res, tables.misc, tables.miscVotes, 'misc_id');

const getFoodFromId = async (req, res) => (await db.execute(req, res, `SELECT * FROM ${tables.foods} WHERE id = ${req.params.id}`))[0];

module.exports = {
    tallyFlavorVotes,
    tallyTextureVotes,
    tallyMiscVotes,
    getFoodFromId
}