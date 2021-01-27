const express = require('express');
const path =require('path')
const Services = require('./debtService');
const authorization = require('../../utils/authorization');



const jsonParser=express.json();
const debtRouter = express.Router();


debtRouter
.get('/', authorization, async (req, res) => { 

  try {
      const user = await Services.getById(req.app.get('db'), req.user)
     
     res.json(user)
  } catch (err) {
      console.error(err.message);
      res.status(500).json('server error');
      
  }
})
  
debtRouter
  .post('/', jsonParser, authorization, (req, res) => {
    const {name, start_bal, curr_bal, monthly_min, amt_paid, month, paid} = req.body;
    const newDebt = {name, start_bal, curr_bal, monthly_min, amt_paid, month, paid};
    
    for (const [key, value] of Object.entries(newDebt))
      if (value === null || undefined || '')
        return res.status(400).json({
          error: `Missing Value for '${key}' `
        })
    newDebt.user_id = req.user  
    Services.addNewDebt(
      req.app.get('db'),
      newDebt
    )
      .then(entry => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${entry.id}`))
          .json(entry)
      })
    })

debtRouter
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

   Services.deleteDebt(
      req.app.get('db'),
      id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = debtRouter;