//importing medicine model
import Medicine from "../models/Medicine.js";

//add medicine
export const addMedicine = async (req,res) => {
    try {
        const {
            name,
            description,
            quantity,
            location,
            pharmacyName,
            contactNumber,
            isRare,
        } = req.body;

        //creating medicine mongodb
        const medicine = await Medicine.create({
            name,
            description,
            quantity,
            location,
            pharmacyName,
            contactNumber,
            isRare,


        });
        //sdend success response
        res.status(201).json({message:"medicine added succesfully",medicine});
    }
    catch (error) {
        res.status(500).json({message:error.message});

    }

        };


        //get all medicines
        export const getMedicines = async (req,res) => {
            try {
                const medicines = await Medicine.find();
                res.status(200).json({message:"medicines fetched successfully",medicines});
            } catch (error) {
                res.status(500).json({message:error.message});


            }
        };
        


        //search medicines
        export const searchMedicine = async (req,res) => {
            try {
                //get search query from url
                const {name,location} = req.query;
                //search consition
                const searchCondition = {};
                //if name is provided
                if(name){
                    searchCondition.name = {$regex:name,$options:"i"};

                }
                //if locatin is provided
                if(location){
                    searchCondition.location = {$regex:location,$options:"i"};
                }


                //finding medicines
                const medicines = await Medicine.find(searchCondition);
                res.status(200).json({message:"medicines fetched successfully",medicines});
            } catch (error) {
                res.status(500).json({message:error.message});
            }
            };
        

   //UPDATE MEDICINE STOCK

export const updateMedicineStock = async (req, res) => {
  try {
    // Get medicine id from URL
    const { id } = req.params;

    // Get updated stock details
    const { quantity, status } = req.body;

    // Find medicine and update
    const medicine = await Medicine.findByIdAndUpdate(
      id,
      {
        quantity,
        status,
      },
      {
        new: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine stock updated successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




   //DELETE MEDICINE


export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findByIdAndDelete(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};