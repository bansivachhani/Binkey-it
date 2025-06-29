import SubCategoryModel from "../models/subcategory.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name || !image || !category[0]) {
      return res.status(400).json({
        message: "Provide name,image and category",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    return res.json({
      message: "Sub Category Added Successfully",
      success: true,
      error: false,
      data: save,
    });
  } catch {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoryController = async(req,res)=>{
    try{
      const data = await SubCategoryModel.find().sort({name:1}).populate("category")

      return res.json({
        message: "Sub Category data",
        success: true,
        error: false,
        data:data
      })

    }
    catch(error)
    {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      })
        
    }
}