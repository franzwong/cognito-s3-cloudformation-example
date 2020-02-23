const Auth = require('@aws-amplify/auth').default;

module.exports = function() {
  return async function(event) {
    event.preventDefault();

    const form = event.target;
    const username = form.elements['username'].value;
    const code = form.elements['verification_code'].value;
    
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,    
      });
      alert('You\'ve verified your account');
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };
}
