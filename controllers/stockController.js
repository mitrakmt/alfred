let stockController = {}

stockController.GET = function(req, res) {
  res.status(200).send('Get to /stocks/')
}

module.exports = stockController;
