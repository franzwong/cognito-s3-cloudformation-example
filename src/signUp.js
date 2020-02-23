const Auth = require('@aws-amplify/auth').default;

module.exports = function () {
  return async function(event) {
    event.preventDefault();

    const form = event.target;
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;
    const givenName = form.elements['given_name'].value;
    const familyName = form.elements['family_name'].value;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          given_name: givenName,
          family_name: familyName,
        },
      });
      alert('You\'ve signed up');
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };
}
