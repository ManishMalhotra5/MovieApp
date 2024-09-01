import { google } from "googleapis";
import oauth2Client from "./oauth2Client.mjs";
import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { v4 as uuidv4 } from "uuid";

google.options({ auth: oauth2Client });
const drive = google.drive({ version: "v3" });

const uploadFileOnDrive = async (localFilePath) => {
  try {
    const filename = path.basename(localFilePath);
    const response = await drive.files.create({
      requestBody: {
        name: filename + uuidv4(),
      },
      media: {
        body: fs.createReadStream(localFilePath),
      },
      fields: "id,webViewLink,webContentLink",
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    await fsPromise.unlink(localFilePath);
    return `https://drive.google.com/file/d/${response.data.id}/view`;
  } catch (error) {
    await fsPromise.unlink(localFilePath);
    console.log("failed to upload on drive : " + error);
    return null;
  }
};

export { uploadFileOnDrive };
