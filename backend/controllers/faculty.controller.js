const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
const Faculty = require("../models/faculty.model");

exports.addFaculty = async (req, res) => {
  try {
    const { name, role } = req.body;
    const file = req.file;

    console.log("Request received:", req.body);

    if (!name || !role || !file) {
      return res.status(400).json({ error: "Name, role, and signature image are required." });
    }

    const fileKey = `faculty/${Date.now()}_${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    console.log("Uploading to S3...");
    await s3.send(new PutObjectCommand(uploadParams));

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const newFaculty = new Faculty({ name, role, imageUrl });
    await newFaculty.save();

    return res.status(201).json({
      message: "Faculty added successfully",
      data: newFaculty,
    });
  } catch (error) {
    console.error("Error in addFaculty:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
