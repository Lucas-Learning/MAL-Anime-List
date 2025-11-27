import express from 'express';
import 'dotenv/config'
const app = express();
const port = 3000;
import {getGenerateCodeVerifier,getCodeChallenge} from './auth.js';
const codeVerifier = getGenerateCodeVerifier();
const codeChallenge = await getCodeChallenge(codeVerifier)
const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

app.get("/", (req, res) => {
    res.send(`Generated code verifier: ${codeVerifier}, Generated code challenge: ${codeChallenge}`);
});

app.get("/AuthUrl",(req,res)=>{
//Need to use this in the frontend to makea link that someone can click through
res.send(printNewAuthorisationUrl(codeChallenge));
})
function printNewAuthorisationUrl(codeChallenge){
var url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientid}&code_challenge=${codeChallenge}`;
var response = `Authorse the application by clicking here: ${url}\n`;
return response;
}


app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
})

