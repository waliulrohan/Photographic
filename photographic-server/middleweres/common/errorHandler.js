function notFoundHandler(req,res,next) {
        res.status(404).json({ error: 'Not Found' });

    
}

function errorHandler(err, req , res ,next) {
    res.status(500).json({
        Error : err,
  
    })
}

module.exports={notFoundHandler,errorHandler};