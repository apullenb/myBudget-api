const express = require('express');
const path =require('path')
const Services = require('./incomeService');
const authorization = require('../../utils/authorization');



const jsonParser=express.json();
const incomeRouter = express.Router();


incomeRouter
.get('/', authorization, async (req, res) => { 
  try {
      const user = await Services.getById(req.app.get('db'), req.user)
     
     res.json(user)
  } catch (err) {
      console.error(err.message);
      res.status(500).json('server error');
  }
})
  

incomeRouter
  .post('/', jsonParser, authorization, (req, res) => {
    const {source, amount, date, month} = req.body;
    const newIncome = {source, amount, date, month};
    
    for (const [key, value] of Object.entries(newIncome))
      if (value === null || undefined || '')
        return res.status(400).json({
          error: `Missing Value for '${key}' `
        })
    newIncome.user_id = req.user  
    Services.addNewIncome(
      req.app.get('db'),
      newIncome
    )
      .then(entry => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${entry.id}`))
          .json(entry)
      })
    })


    incomeRouter
    .patch('/:id', authorization, (req, res, next) => {
      const {id} = req.params;
     const paid = req.body;
     Services.updateIncome(
        req.app.get('db'), id, paid
      )
        .then(() => {
          res.status(204).end();
        })
        .catch(next);
    });


    incomeRouter
    .delete('/:id', authorization, (req, res, next) => {
      const {id} = req.params;
     
     Services.deleteIncome(
        req.app.get('db'), id,
      )
        .then(() => {
          res.status(204).end();
        })
        .catch(next);
    });

module.exports = incomeRouter;