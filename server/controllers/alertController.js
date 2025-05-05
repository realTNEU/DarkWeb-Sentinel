import Alert from "../models/Alert.js";

export const reportAlert = async (req, res) => {
  const { userId, identityType, value, source, io } = req.body;

  if (!userId || !identityType || !value || !source) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  try {
    const existing = await Alert.findOne({ userId, identityType, value, source });
    if (existing) {
      return res.status(200).json({ msg: "Alert already exists", alert: existing });
    }

    const alert = new Alert({ userId, identityType, value, source });
    await alert.save();
    req.io.emit(`alert:${userId}`, alert);

    res.status(201).json({ msg: "Alert created", alert });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create alert", error: err.message });
  }
};

export const getUserAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ alerts });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch alerts", error: err.message });
  }
};
