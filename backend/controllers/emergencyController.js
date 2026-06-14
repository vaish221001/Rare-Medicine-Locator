// Import Emergency Request model
import EmergencyRequest from "../models/EmergencyRequest.js";



// CREATE EMERGENCY SOS REQUEST

export const createEmergencyRequest = async (req, res) => {
  try {
    const {
      medicineName,
      patientName,
      contactNumber,
      location,
      urgencyLevel,
      note,
    } = req.body;

    const emergencyRequest = await EmergencyRequest.create({
      medicineName,
      patientName,
      contactNumber,
      location,
      urgencyLevel,
      note,

      // Store logged-in user id
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Emergency SOS request created successfully",
      emergencyRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL EMERGENCY REQUESTS
// Used by pharmacy dashboard

export const getEmergencyRequests = async (req, res) => {
  try {
    const emergencyRequests = await EmergencyRequest.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Emergency requests fetched successfully",
      emergencyRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ONLY LOGGED-IN USER REQUESTS
// Used by user dashboard and user SOS page

export const getMyEmergencyRequests = async (req, res) => {
  try {
    const emergencyRequests = await EmergencyRequest.find({
      createdBy: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "My emergency requests fetched successfully",
      emergencyRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ACCEPT EMERGENCY REQUEST

export const acceptEmergencyRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const { pharmacyName } = req.body;

    const request = await EmergencyRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Emergency request not found",
      });
    }

    request.status = "ACCEPTED";
    request.assignedPharmacy = pharmacyName;

    await request.save();

    res.status(200).json({
      message: "Emergency request accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// RESERVE MEDICINE FOR 20 MINUTES

export const reserveEmergencyMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await EmergencyRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Emergency request not found",
      });
    }

    const reservedUntil = new Date(Date.now() + 20 * 60 * 1000);

    request.status = "RESERVED";
    request.reservedUntil = reservedUntil;

    await request.save();

    res.status(200).json({
      message: "Medicine reserved for 20 minutes",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// COMPLETE EMERGENCY REQUEST

export const completeEmergencyRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await EmergencyRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Emergency request not found",
      });
    }

    request.status = "COMPLETED";

    await request.save();

    res.status(200).json({
      message: "Emergency request completed successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CANCEL EMERGENCY REQUEST

export const cancelEmergencyRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await EmergencyRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Emergency request not found",
      });
    }

    request.status = "CANCELLED";

    await request.save();

    res.status(200).json({
      message: "Emergency request cancelled successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};