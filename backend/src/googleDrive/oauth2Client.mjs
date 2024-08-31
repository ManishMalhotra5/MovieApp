import { google } from "googleapis";
import { client_id,client_secret,token,redirect_url } from "../config/googleCredentials.mjs";

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_url
);

oauth2Client.setCredentials({
  refresh_token: token,
});

export default oauth2Client;