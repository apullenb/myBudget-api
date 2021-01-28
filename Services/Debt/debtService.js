const DebtServices = {

  
  addNewDebt(knex, newEntry){
    return knex
      .insert(newEntry)
      .into('debt')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from('debt')
      .select('*')
      .where('user_id', id);
  },
  updateDebt(knex, id, newDebtFields) {
    return knex('debt')
      .where('id', id)
      .update(newDebtFields)
      .then(rows => {
        return rows[0];
      });
  },
  
  deleteDebt(knex, id) {
    return knex('debt')
      .where('id', id)
      .delete();
  },
};
    
module.exports = DebtServices;