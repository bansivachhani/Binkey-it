import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming user ID is stored in req.user
    const { address_line, city, state, pincode, country, mobile } = req.body;

    const craeteAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });

    const saveAddress = await craeteAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: { address_details: saveAddress._id },
    });

    return res.json({
      message: "Address created successfully",
      success: true,
      error: false,
      data: saveAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getAddressController = async (req, res) => {
    try{
        const userId = req.userId; // Assuming user ID is stored in req.user

        const data = await AddressModel.find({userId :userId }).sort({createdAt : -1})

        return res.json({
            message: "Address fetched successfully",
            success: true,
            error: false,
            data: data,
        });

    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }

}