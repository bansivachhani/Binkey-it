import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const addCategory = CategoryModel({
      name,
      image,
    });

    const saveCatgeory = await addCategory.save();

    if (!saveCatgeory) {
      return res.status(400).json({
        message: "Failed to add category",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Category Added Successfully",
      error: false,
      success: true,
      data: saveCatgeory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find();

    return res.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    return res.json({
      message: "Updated Category",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
