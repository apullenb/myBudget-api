# Divvy$
This app can be viewed live @ https://divvy.vercel.app/

## A QUICK AND EASY WAY TO MANAGE YOUR PERSONAL FINANCES!
### See Your Budget at a Glance, & Quickly Calculate Your Expenses
#### - Add Your Bills & Income for the Month!
#### - See How Much You Have Left Over!
#### - Plan Towards Paying Down Your Long Term Debt!

***

> ![Home](/ScreenShots/Home%20Screen.jpg)
> ![Dashboard](/ScreenShots/Divvy%20User%20Dash.jpg)
> ![Add Bills](/ScreenShots/Add%20Bills.jpg)

***

## API Documentation:
> ** In order to Access This Information, A User Must Be Authenticated ** 
#### GET /api/bills
Retrieves the user's bills that have been added for the current month. Returns a response like the following:

  {
        "id": 5,
        "bill_name": "Mortgage",
        "bill_amt": 5757,
        "amt_paid": 586,
        "month": "January",
        "user_id": 548264648,
        "year": 2021,
        "date": null,
        "paid": false
    }

#### POST /api/bills 
 In order to post successfully, a user must be logged in. This POST method will retrieve your user information and authentication status before attempting to post. 
 See the example below:


      method: "POST",
      headers: { "content-type": "application/json", token: `${token}` },
      body: { 
        "bill_name" : "car payment",
      "bill_amt" : "500",
      "amt_paid" : "0",
      "month" : "january",
       }

***

## Technology info:
### Backend: 
<ul>
<li>Node for interacting with the file system</li> 
<li>Express for handling API requests</li> 
<li>Knex.js for interacting with the PostgreSQL database</li> 
<li>Postgrator for database migration</li> 
<li>Mocha, Chai, Supertest for testing</li> 
<li>JSON Web Token and bcryptjs for user authentication / authorization</li> 
</ul>

***
### Front End:
<ul>
<li>React</li> 
<li>HTML5</li> 
<li>CSS3</li> 
<li>Jest/Enzyme</li> 
</ul>
