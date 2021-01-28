const BillServices = {

  
  addNewBill(knex, newEntry){
    return knex
      .insert(newEntry)
      .into('bills')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from('bills')
      .select('*')
      .where('user_id', id);
  },
  updateBill(knex, id, newBillFields) {
    return knex('bills')
      .where(id)
      .update(newBillFields);
  },

  deleteBill(knex, id) {
    return knex('bills')
      .where('id', id)
      .delete();
  },
};
  
module.exports = BillServices;