const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  res.json({data});
}

function hasProps(req, res, next){
  const {first_name, 
         last_name, 
         mobile_number, 
         reservation_date, 
         reservation_time,
         people} = req.body;

 if(first_name && last_name && mobile_number && reservation_date && reservation_time && people){
   
   if(people < 1 || people > 6){
     return next({
       status: 400,
       message: "Party must be at least 1 and no more than 6"
     });
   };
   if(first_name.length < 2 || last_name.length < 2){
     return next({
      status: 400,
      message: "Both first and last name must be more than 2 characters."
     });
   };
   res.locals.reservation = req.body
   return next();
 }
 else{
   return next({
     status: 400,
     message: "Four hunnit"
   })
 }
}

async function post(req, res, next) {
  //total filler
  //validate request body here 
  const data = await service.post(res.locals.reservation)
  res.json({data})
}

module.exports = {
  list,
  post: [ hasProps, asyncErrorBoundary(post)],
};
