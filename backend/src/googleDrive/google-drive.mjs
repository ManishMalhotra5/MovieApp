import { google } from "googleapis";
import oauth2Client from "./oauth2Client.mjs";
import fs from "fs";


google.options({ auth: oauth2Client });

const drive = google.drive({ version: "v3" });

const uploadFileOnDrive = async (localFilePath) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "file",
      },
      media: {
        body: fs.createReadStream(localFilePath),
      },
      fields: "id,webViewLink,webContentLink",
    });
    console.log("response output", response.data);
    return response;
  } catch (error) {
    console.log("failed to upload on drive : " + error);
    return null;
  }
};

export { uploadFileOnDrive };
