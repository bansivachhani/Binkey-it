const uploadImageController = (req,res)=>{
    try{

        const file = req.file;



    }
    catch(error)
    {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success : false

        })
    }
}

export default uploadImageController;