const {
  CognitoUserPool
} = require('amazon-cognito-identity-js');

// Constants to be replaced by webpack's DefinePlugin
const region = AWS_REGION
const identityPoolId = IDENTITY_POOL_ID

const userPool = new CognitoUserPool({
  UserPoolId : USER_POOL_ID,
  ClientId : USER_POOL_CLIENT_ID,
})

const fileBucketName = FILE_BUCKET_NAME

const signUp = require('./signUp')(userPool)
const verify = require('./verify')(userPool)
const login = require('./login')(region, userPool, identityPoolId)
const listFiles = require('./listFiles')(fileBucketName)
const uploadFile = require('./uploadFile')(fileBucketName)

document.getElementById("signup-form").addEventListener("submit", signUp)
document.getElementById("verification-form").addEventListener("submit", verify)
document.getElementById("login-form").addEventListener("submit", login)
document.getElementById("file-list-form").addEventListener("submit", listFiles)
document.getElementById("file-put-form").addEventListener("submit", uploadFile)
