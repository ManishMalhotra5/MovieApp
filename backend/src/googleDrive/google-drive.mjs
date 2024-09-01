import { google } from "googleapis";
import oauth2Client from "./oauth2Client.mjs";

import fs from "fs";
import {v4 as uuidv4} from "uuid"


google.options({ auth: oauth2Client });


const uploadFileOnDrive = async (localFilePath) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "file"+uuidv4(),
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

    fs.unlinkSync(localFilePath);
    return `https://drive.google.com/file/d/${response.data.id}/view`;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("failed to upload on drive : " + error);
    return null;
  }
};

export { uploadFileOnDrive };
