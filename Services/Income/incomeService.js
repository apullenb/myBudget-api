const IncomeServices = {

  
  addNewIncome(knex, newEntry){
    return knex
      .insert(newEntry)
      .into('income')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from('income')
      .select('*')
      .where('user_id', id);
  },
  updateIncome(knex, id, newIncomeFields) {
    return knex('income')
      .where('id', id)
      .update(newIncomeFields);
  },
  
  deleteIncome(knex, id) {
    return knex('income')
      .where('id', id)
      .delete();
  },
};
    
module.exports = IncomeServices;