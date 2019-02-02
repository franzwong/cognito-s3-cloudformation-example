module.exports = function (userPool) {
  return function(event) {
    event.preventDefault()

    const form = event.target
    const userName = form.elements['username'].value
    const password = form.elements['password'].value
    const givenName = form.elements['given_name'].value
    const familyName = form.elements['family_name'].value
  
    const attributeList = [{
      Name : 'given_name',
      Value : givenName
    }, {
      Name : 'family_name',
      Value : familyName
    }]
  
    userPool.signUp(userName, password, attributeList, null, (err, result) => {
      if (err) {
        return alert(err.message || JSON.stringify(err))
      }
      alert('You\'ve signed up')
    })
  }
}
