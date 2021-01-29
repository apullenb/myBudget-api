const express = require('express');
const path = require('path');
const xss = require('xss');
const Services = require('./userService');
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtGenerator');
const jsonParser = express.json();
const userRouter = express.Router();
const authorization = require('../../utils/authorization');


const serializeUser = user => ({
  id: user.id,
  first_name: xss(user.first_name),
  user_name: xss(user.user_name),
  password: xss(user.password)
});

//user registration


userRouter
  .post('/register', jsonParser, async (req, res, next) => {
    
      const { first_name, user_name, password} = req.body;
      const newUser = {first_name, user_name, password};
      const users = await Services.checkForUser(req.app.get('db'), newUser.user_name)
          if (users) {
              return res.status(400).json({error: 'user_name not available'});
          } 
        
    const saltRound = 2
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    const addUser = await Services.insertUser(req.app.get('db'), newUser.first_name, newUser.user_name, bcryptPassword); 
    const token =  jwtGenerator(addUser[0].user_id)
         res.json({token})     
    .catch(next);
  });

 
// User Login
userRouter
  .post('/login', jsonParser, async (req, res, next) => {
    const {user_name, password } = req.body;
    const loginUser = {user_name, password };
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
   const searchUsers = await Services.getUserWithUserName(req.app.get('db'), loginUser.user_name)
      if (searchUsers === undefined) {
          return res.status(400).json({
            error: 'Incorrect user_name or password',
          });
        }
    
        return Services.comparePasswords(loginUser.password, searchUsers.password)
          .then(compareMatch => {
            if (!compareMatch) {
              return res.status(400).json({
                error: 'Incorrect user_name or password',
              })
            }
        
            const token =  jwtGenerator(searchUsers.user_id)
            res.json({token}) 
      })
      .catch(next);
  });

userRouter
.get('/isverified', authorization, async (req, res) => {
    try {
       return res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
   

})

  userRouter
  .get('/' , authorization, (req, res, next) => {
    const id = req.user 
    console.log(req.user)
    const knexInstance = req.app.get('db');
    Services.getUserDash(knexInstance, id)
      .then(user => {
        console.log(user)
        res.json(user);
      })
      .catch(next);
  });

module.exports = userRouter;