import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
 process.env.GDRIVE_CLIENT_ID,
 process.env.GDRIVE_CLIENT_SECRET,
 process.env.GDRIVE_REDIRECT_URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.GDRIVE_TOKEN
});

export default oauth2Client;