const db = require('../database/db.config');

module.exports = {
    find,
    findBy,
    findById, 
    add,
    update,
    remove
}

function find () {
    return db('users').select('id', 'username', 'password');
};

function findBy(user) {
    return db('users').where(user);
}


function findById (id) {
    return db('users')
    .where('id', id)
    .first();
};

function add(newUser) {
    return db('users')
    .insert(newUser)
    .then(ids => {
    return findById(ids[0]);
    });
}

function update(changes, id) {
    return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
    count > 0 ? findById(id) : null
    });
};

function remove (id) {
    return db('users')
    .where({ id })
    .del();
};