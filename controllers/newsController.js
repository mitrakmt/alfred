let newsController = {}

newsController.GET = function(req, res) {
  res.status(200).send('Get to /news/')
}

module.exports = newsController;
