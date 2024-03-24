import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import DatauriParser from "datauri/parser";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
export const uploadToCloudinary = async (
  buffer: string,
  options: {
    public_id: string;
    folder?: string;
    width?: number;
  }
) => {
  return await cloudinary.uploader.upload(buffer, options);
};

export async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

export const generateUniqueFilename = () => {
  return "img_" + Date.now() + (Math.random() * 10).toString();
};

export async function convertToDataURI(file: {
  buffer: string;
  originalname: string;
}) {
  const parser = new DatauriParser();

  const extName = path.extname(file["originalname"] || "").substring(0, 10);
  const fileData = parser.format(extName, file["buffer"] || "") as {
    content: string;
  };
  const uniqueFilename = generateUniqueFilename();

  return { file: fileData, public_id: uniqueFilename };
}

export const uploadedFile = async (fileData: any) => {
  const uploadedFile = await uploadToCloudinary(fileData.file.content, {
    public_id: fileData.public_id,
    folder: ``,
  });
  const Data: {
    publicId: string;
    url: string;
  } = {
    publicId: uploadedFile.public_id,
    url: uploadedFile.url,
  };
  return Data;
};
export const deleteFile = async (publicId: string) => {
  console.log(publicId);
  return await cloudinary.uploader.destroy(publicId);
};
