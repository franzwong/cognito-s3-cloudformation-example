const S3 = require('aws-sdk/clients/s3');
const Auth = require('@aws-amplify/auth').default;

const escapeHtml = require('escape-html');

const getFileName = filePath => filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);

module.exports = function(region, fileBucketName) {
  return async function(event) {
    event.preventDefault();

    try {
      const credentials = await Auth.currentCredentials();

      if (!credentials) {
        return alert('Please login');
      }

      const s3 = new S3({
        region, // Browser will complain for CORS if region is not set
        credentials: Auth.essentialCredentials(credentials),
      });
      const identityId = credentials.identityId;
      const s3Objects = await s3.listObjects({
        Bucket: fileBucketName,
        Prefix: `${identityId}/`,
      }).promise();

      const html = s3Objects.Contents
        .map(obj => obj.Key)
        .map(key => ({
          originalKey: key,
          key: escapeHtml(getFileName(key)),
          url: s3.getSignedUrl('getObject', {
            Bucket: fileBucketName,
            Key: key,
          }),
        }))
        .reduce((accumulator, obj) => accumulator + `<li><a href='${obj.url}'>${obj.key}</a></li>`, '');
      document.getElementById('file-list').innerHTML = html;
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };
}