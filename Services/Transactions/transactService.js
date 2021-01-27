const transactService = {

  
  addNewBill(knex, newEntry){
    return knex
      .insert(newEntry)
      .into('transactions')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from('transactions')
      .select('*')
      .where('user_id', id);
  },
  updateBill(knex, id, newTransact) {
    return knex('transactions')
      .where(id)
      .update(newTransact);
  },
  
  deleteBill(knex, id) {
    return knex('transactions')
      .where(id)
      .delete();
  },
};
    
module.exports = transactService;