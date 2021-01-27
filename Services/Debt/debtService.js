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
      .where(id)
      .update(newDebtFields);
  },
  
  deleteDebt(knex, id) {
    return knex('debt')
      .where(id)
      .delete();
  },
};
    
module.exports = DebtServices;