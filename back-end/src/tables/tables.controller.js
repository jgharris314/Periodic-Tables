const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res) {
    const data = await service.list()
    res.json({data})
}

const hasValidTableData = (req, res, next) => {
    if(!req.body.data) return next({status:400, message: "no data"})
    const { table_name, capacity } = req.body.data;

    if(!table_name || table_name.length < 2 ){
        return next({status: 400, message: 'table_name must be longer tan 2 characters'})
    }
    if(!capacity || capacity === 0 || typeof capacity !== "number"){
        return next({status: 400, message: 'capacity must be a number greater than 0'})
    }
    next();
}

async function post(req,res){
    res.status(201).json({data: await service.post(req.body.data)})
}

async function put(req, res){

}

module.exports = {
    list,
    post: [ hasValidTableData, asyncErrorBoundary(post), ],
    put: [ hasValidTableData, asyncErrorBoundary(put), ],
}