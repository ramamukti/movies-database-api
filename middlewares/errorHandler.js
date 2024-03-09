const errorHandler = (req, res, next) => {

    // Log to console to make dev easier
    console.log(err);

    switch (err.name) {
        case 'Unathenticated':
            res.status(403).json({name: err.name, message:'Unathenticated'})
            break;
        
        case 'Unauthorized':
            res.status(403).json({name: err.name, message:'Unauthorized'})
            break;
    
        default:
            res.status(500).json({message:'Internal Server Error'})
            break;
    }
}

export default errorHandler;

