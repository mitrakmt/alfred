# Alfred - your stock market assistant
Alfred is the assistant who shows up with what you need, before you knew you needed it, for your investments.

## API:
### Getting Started:
All data can be accessed from the https://api.alfred.com. All data is sent and received as JSON.

### Requests:
#### Users:
| Request | Endpoint              | Description                     | Required data                                                 |
| ------- |:---------------------:| :-------------------------------|:--------------------------------------------------------------|
| POST    | /api/signup           | Post a user to the database.    | Required: name (String), password (String), password (String) |


  ```javascript
  $.ajax({
    url: '/api/signup',
    data: {
      name: "Joe Bones",
      email: "exampleEmail@gmail.com",
      password: "password123"
    },
    success: function (response) {
      console.log("Successful signup!")
    },
    dataType: 'JSON'
  });
  ```


| Request | Endpoint              | Description                           | Required data                                    |
| ------- |:---------------------:| :-------------------------------------|:-------------------------------------------------|
| POST    | /api/login            | Login a user to the application       | Required: email (String), password (String)      |
| POST    | /api/logout           | Post a user to the database.          | Required: None                                   |


#### Stocks:
| Request | Endpoint              | Description                           | Required data                                    |
| ------- |:---------------------:| :-------------------------------------|:-------------------------------------------------|
| GET     | /api/stocks           | Get the user's saved list of stocks   | Required: None                                   |
| POST    | /api/stocks           | Add stock to user's stock list        | Required: stock (String)                         |
| GET     | /api/stocks:stockId   | Get specific stock data               | Required: None                                   |
| DELETE  | /api/stocks           | Delete stock from user's stock list   | Required: stock (String)                         |

#### News:
| Request | Endpoint              | Description                           | Required data                                    |
| ------- |:---------------------:| :-------------------------------------|:-------------------------------------------------|
| GET     | /api/news             | Get the news for user's stocks        | Required: None                                   |
| GET     | /api/news/:stockId    | Get news for a selected stock         | Required: None                                   |

### Errors:
Sometimes your API call will generate an error. Every response to an API call that generates an error will include an error code, the reason for the error, and an error message to help you debug your request.

| Code  | Response Text   | Description                                                                                      |
| ----- |:---------------:| :------------------------------------------------------------------------------------------------|
| 400   | Bad Request     |                                                                                                  |
| 401   | Unauthorized    | You do not have authorization to make the request.                                               |
| 403   | Forbidden       |                                                                                                  |
| 404   | Not Found       | The resource you tried to locate could not be found or does not exist.                           |
| 500   | Server Error    | An error occurred on our server.                                                                 |


## Team:
- [Michel Mitrakos](https://www.michaelmitrakos.com) - Back-end
- [Michael Flores](https://www.twitter.com/mike_flores23) - Front-end


## Built With:
| Front-End    | Back-End     | Modules         | Testing Frameworks  |
| ------------ |:------------:| :---------------|:--------------------|
| React        | Node JS      | Babel           | Mocha               |
| Redux        | Express      | BodyParser      | Chai                |
| Webpack      | Mongo Db     | Morgan          |                     |
|              |              | Mongoose        |                     |
|              |              | Request         |                     |
|              |              | Bcrypt          |                     |
|              |              | Express-session |                     |
|              |              | Moment          |                     |
|              |              | Cors            |                     |
|              |              | Dotenv          |                     |
