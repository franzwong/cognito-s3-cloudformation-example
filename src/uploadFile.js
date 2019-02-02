const AWS = require('aws-sdk/global')
require('aws-sdk/clients/s3')

module.exports = function(fileBucketName) {
  return function(event) {
    event.preventDefault()

    if (!AWS.config.credentials) {
      return alert('Please login')
    }

    const identityId = AWS.config.credentials.params.IdentityId

    const form = event.target
    const file = form.elements['file'].files[0]

    const s3 = new AWS.S3()
    const params = {
      Bucket: fileBucketName,
      Key: `${identityId}/${file.name}`,
      Body: file,
      ACL: 'private'
    }
    s3.upload(params, (err, data) => {
      if (err) {
        return alert(err.message || JSON.stringify(err))
      }
      alert(`File ${file.name} is uploaded`)
    })
  }
}
