# Alfred - your stock market assistant

## API:
### Getting Started:
All data can be accessed from the https://api.alfred.com. All data is sent and received as JSON.

### Requests:
#### Users:
- POST /api/signup

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

- POST /api/login
- POST /api/logout

#### Stocks:
- GET /api/stocks
- POST /api/stocks
- GET /api/stocks/:stockId

#### News:
- GET /api/news
- GET /api/news/:stockId

### Errors:
Sometimes your API call will generate an error. Every response to an API call that generates an error will include an error code, the reason for the error, and an error message to help you debug your request.

| Code  | Response Text   | Description                                                            |
| ----- |:---------------:| ----------------------------------------------------------------------:|
| 400   | Bad Request     |                                                                        |
| 401   | Unauthorized    | You do not have authorization to make the request.                     |
| 403   | Forbidden       |                                                                        |
| 404   | Not Found       | The resource you tried to locate could not be found or does not exist. |
| 500   | Server Error    | An error occurred on our server.                                       |


## Team:
- [Michel Mitrakos](https://www.michaelmitrakos.com) - Back-end
- [Michael Flores](https://www.twitter.com/mike_flores23) - Front-end

## Built With:
### Front-end:
- React JS
- Webpack
- Redux

### Back-end:
- Mongo Db
- Mongoose
- Node JS
- Express JS

### Modules Used:
- BodyParser
- Babel
- Morgan
- Path
- Request
- Bcrypt
- Router
- Lodash
- Express-session
- Cors
- Moment
- Dotenv

### Testing frameworks used:
- Mocha
- Chai
