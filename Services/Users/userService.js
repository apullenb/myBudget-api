const bcrypt = require('bcrypt');

const Services= {

  getAllUsers(knex) {
    return knex.select('*').from('user');
  },

  checkForUser(knex, user_name) {
    return knex
      .from('user')
      .select('*')
      .where('user_name', user_name)
      .first();
  },
  
  insertUser(knex, first_name, user_name, password) {
    return knex
      .insert({first_name, user_name, password})
      .into('user')
      .returning('*')
      .then(rows => {
        return rows;
      });
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('user')
      .where('user_id', id)
      .first();
  },

  getUserWithUserName(db, user_name) {
    return db('user')
      .where({ user_name })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  getUserDash(knex, id) {
    return knex
      .select('first_name')
      .from('user')
      .where('user_id', id)
      .first();
  }
};
module.exports = Services;