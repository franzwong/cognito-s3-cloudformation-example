const {
  CognitoUser
} = require('amazon-cognito-identity-js')

module.exports = function(userPool) {
  return function(event) {
    event.preventDefault()

    const form = event.target
    const userName = form.elements['username'].value
    const verificationCode = form.elements['verification_code'].value
  
    const cognitoUser = new CognitoUser({
      Username : userName,
      Pool : userPool,
    })
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        return alert(err.message || JSON.stringify(err))
      }
      alert('We\'ve verified your account')
    })
  }
}
