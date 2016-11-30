let stockModel = {}

stockModel.GET_STOCKS = (userid) => {
    User.findOne({
        '_id': userid
    })
    .then(user => {
        return {
            status: 200,
            stocks: user.stocks,
            favoriteStocks: user.favoriteStocks
        }
    })
    .catch(err => {
        return {
            status: 500,
            err: err
        }
    })
}

stockModel.ADD_STOCK = (userid, stock) => {
    User.findOne({
        '_id': userid
    })
    .then(user => {
        user.stocks.push(stock)
        user.save((err, user) => {
            if (err) {
                return {
                    status: 500,
                    err: err
                }
            }
            
            return {
                status: 200,
                stocks: user.stocks
            }
        })
    })
}

stockModel.UPDATE_FAVORITE_STOCK = (userid, stock) => {
    User.findOne({
        '_id': userid
    })
    .then(user => {
        if (user.favoriteStocks._includes(stock)) {
            user.favoriteStocks.pull(stock)
            user.stocks.push(stock)
        } else {
            user.favoriteStocks.push(stock)
            user.stocks.pull(stock)
        }

        user.save((err, user) => {
            if (err) {
                return {
                    status: 500,
                    err: err
                }
            }
                return {
                    status: 200,
                    stocks: user.stocks,
                    favoriteStocks: user.favoriteStocks
                }
        })
    })
}

stockModel.REMOVE_STOCK = (userid, stock) => {
    User.findOne({
        '_id': userid
    })
    .then(user => {
        user.stocks.pull(stock)
        user.save((err, user) => {
            if (err) {
                return {
                    status: 500,
                    err: err
                }
            }

            return {
                status: 200,
                stocks: user.stocks    
            }
        })
    })
}

module.exports = stockModel