const express = require('express');
const path =require('path')
const Services = require('./billsService');
const authorization = require('../../utils/authorization');



const jsonParser=express.json();
const billsRouter = express.Router();


billsRouter
.get('/', authorization, async (req, res) => { 

  try {
      const user = await Services.getById(req.app.get('db'), req.user)
     
     res.json(user)
  } catch (err) {
      console.error(err.message);
      res.status(500).json('server error');
      
  }
})
  
billsRouter
  .post('/', jsonParser, authorization, (req, res) => {
    const {name, bill_amt, amt_paid, month, paid} = req.body;
    const newBill = {name, bill_amt, amt_paid, month, paid};
    
    for (const [key, value] of Object.entries(newBill))
      if (value === null || undefined || '')
        return res.status(400).json({
          error: `Missing Value for '${key}' `
        })
    newBill.user_id = req.user  
    Services.addNewBill(
      req.app.get('db'),
      newBill
    )
      .then(entry => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${entry.id}`))
          .json(entry)
      })
    })

billsRouter
  .route('/:user_id')
  .all((req, res, next) => {
    Services.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(entry => {
        if (!entry) {
          return res.status(404).json({
            error: { message: 'Does not exist' }
          })
        }
        res.entry = entry
        next()
      })
      .catch(next)
  })
    
  .delete((req, res, next) => {
    const { id } = req.params;

   Services.deleteBill(
      req.app.get('db'),
      id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = billsRouter;