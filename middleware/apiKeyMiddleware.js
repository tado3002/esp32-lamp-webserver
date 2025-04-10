require("dotenv").config();

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  try {
    const hashedApiKey = process.env.APP_API_KEY_HASH;
    const isMatch = apiKey === hashedApiKey;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    next(); // lanjut ke handler berikutnya
  } catch (err) {
    console.error("API key verification error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = apiKeyMiddleware;
