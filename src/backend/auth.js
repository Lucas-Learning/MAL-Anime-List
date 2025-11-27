import crypto from 'crypto'

function dec2hex(dec){
    return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier(){
    var array = new Uint32Array(56/2);
    console.log(crypto.getRandomValues(array));
    return Array.from(array, dec2hex).join("");
}

export function getGenerateCodeVerifier(){
    var verifier = generateCodeVerifier();
    return verifier;
}

function sha256(plain){
const encoder = new TextEncoder();
const data = encoder.encode(plain);
return crypto.subtle.digest("SHA-256",data);
}

function base64urlencode(a){
    var str = "";
    var bytes = new Uint8Array(a);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++){
        str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v) {
    var hashed = await sha256(v);
    var base64encoded = base64urlencode(hashed);
    return base64encoded;
}

export async function getCodeChallenge(codeVerifier){
    try{
        let code_challenge = await generateCodeChallengeFromVerifier(codeVerifier);
        return code_challenge;
    }
    catch(error){
        console.log(error)
    }
}
