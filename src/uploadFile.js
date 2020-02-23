const S3 = require('aws-sdk/clients/s3');
const Auth = require('@aws-amplify/auth').default;

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

      const form = event.target;
      const file = form.elements['file'].files[0];

      await s3.upload({
        Bucket: fileBucketName,
        Key: `${identityId}/${file.name}`,
        Body: file,
        ACL: 'private',
      }).promise();
      alert(`File ${file.name} is uploaded`);
    } catch (err) {
      alert(err.message || JSON.stringify(err));
    }
  };
}
