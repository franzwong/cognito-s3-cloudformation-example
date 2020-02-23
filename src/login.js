const Auth = require('@aws-amplify/auth').default;

module.exports = function() {
  return async function(event) {
    event.preventDefault();

    const form = event.target;
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    try {
      await Auth.signIn(username, password);
      const user = await Auth.currentAuthenticatedUser();

      const { attributes } = user;
      const givenName = attributes['given_name'];
      const familyName = attributes['family_name'];
      alert(`Welcome ${givenName} ${familyName}`);
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };
}
