let newsController = {}

newsController.GET = (req, res) => {
  res.status(200).send('Get to /news/')
}

module.exports = newsController
