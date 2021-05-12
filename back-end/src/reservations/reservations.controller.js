const service = require("./reservations.service")

async function list(req, res) {
  const data = await service.list()
  res.json({data});
}

async function post(req, res, next) {
  //total filler 
  const data = await service.post(req.body)
  res.json({data})
}

module.exports = {
  list,
  post,
};
