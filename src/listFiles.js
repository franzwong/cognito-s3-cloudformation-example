const AWS = require('aws-sdk/global')
require('aws-sdk/clients/s3')
const escapeHtml = require('escape-html')

const getFileName = filePath => filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length)

module.exports = function(fileBucketName) {
  return function(event) {
    event.preventDefault()

    if (!AWS.config.credentials) {
      return alert('Please login')
    }

    const identityId = AWS.config.credentials.params.IdentityId

    const s3 = new AWS.S3()
    const params = {
      Bucket: fileBucketName,
      Prefix: `${identityId}/`
    }
    s3.listObjects(params, (err, data) => {
      if (err) {
        return alert(err.message || JSON.stringify(err))
      }
      const html = data.Contents
        .map(obj => obj.Key)
        .map(key => ({
          originalKey: key,
          key: escapeHtml(getFileName(key)),
          url: s3.getSignedUrl('getObject', {
            Bucket: fileBucketName,
            Key: key,
          }),
        }))
        .reduce((accumulator, obj) => accumulator + `<li><a href='${obj.url}'>${obj.key}</a></li>`, '')
      document.getElementById('file-list').innerHTML = html
    })
  }
}