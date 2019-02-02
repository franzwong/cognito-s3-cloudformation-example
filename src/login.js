const {
  CognitoUser,
  AuthenticationDetails
} = require('amazon-cognito-identity-js')

const AWS = require('aws-sdk/global')

module.exports = function(region, userPool, identityPoolId) {
  return function(event) {
    event.preventDefault()

    const form = event.target
    const userName = form.elements['username'].value
    const password = form.elements['password'].value
  
    const authenticationDetails = new AuthenticationDetails({
      Username : userName,
      Password : password,
    })
  
    const cognitoUser = new CognitoUser({
      Username : userName,
      Pool : userPool,
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        const idToken = result.getIdToken().getJwtToken()
        AWS.config.region = region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : identityPoolId,
          Logins : {
            [`cognito-idp.${region}.amazonaws.com/${userPool.getUserPoolId()}`] : idToken
          }
        })

        // If a different user is logged in before, we need to prevent reusing the cached identity ID 
        // of previously logged user.
        AWS.config.credentials.clearCachedId()

        const p1 = AWS.config.credentials.refreshPromise()

        const p2 = new Promise((resolve, reject) => {
          cognitoUser.getUserAttributes((err, result) => {
            if (err) {
              return reject(err)
            }
            resolve(result)
          })
        })

        Promise.all([p1 , p2])
          .then((results) => {
            const givenName = results[1].find(item => item.Name === 'given_name').getValue()
            const familyName = results[1].find(item => item.Name === 'family_name').getValue()
            console.log(`Identity id: ${AWS.config.credentials.params.IdentityId}`)
            alert(`Welcome ${givenName} ${familyName}`)
          })
          .catch(err => {
            alert(err.message || JSON.stringify(err))
          })
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err))
      }
    })
  }
}