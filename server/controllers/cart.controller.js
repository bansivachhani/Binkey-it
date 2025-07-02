import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    const checkItemCart = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item already exists in cart",
        success: false,
        error: true,
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });

    const save = await cartItem.save();

    const updareCartUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: { shopping_cart: productId },
      }
    );

    return res.json({
      message: "Item added to cart successfully",
      success: true,
      error: false,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return res.json({
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
