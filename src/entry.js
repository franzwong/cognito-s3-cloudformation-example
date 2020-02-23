const Auth = require('@aws-amplify/auth').default;

// Constants to be replaced by webpack's DefinePlugin
const region = AWS_REGION;

Auth.configure({
  region,
  identityPoolId: IDENTITY_POOL_ID,
  userPoolId: USER_POOL_ID,
  userPoolWebClientId: USER_POOL_CLIENT_ID,
});

const fileBucketName = FILE_BUCKET_NAME;

const signUp = require('./signUp')();
const verify = require('./verify')();
const login = require('./login')();
const listFiles = require('./listFiles')(region, fileBucketName);
const uploadFile = require('./uploadFile')(region, fileBucketName);

document.getElementById("signup-form").addEventListener("submit", signUp);
document.getElementById("verification-form").addEventListener("submit", verify);
document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("file-list-form").addEventListener("submit", listFiles);
document.getElementById("file-put-form").addEventListener("submit", uploadFile);
