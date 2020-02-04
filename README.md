# Cognito S3 Cloudformation example

This example shows how to use S3 with cognito. It includes sign up, email verification, login, file upload, download and list S3 folder. Each cognito user can only access their own folder.

The whole stack can be created by CloudFormation. The stack includes Cognito user pool, user pool client, identity pool, IAM role and S3 bucket.

## Setup

1. Create Stack

```
aws cloudformation create-stack \
  --template-body file://stack.yaml \
  --stack-name MyStack \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    ParameterKey=UserPoolName,ParameterValue=MyUserPool \
    ParameterKey=IdentityPoolName,ParameterValue=MyIdentityPool \
    ParameterKey=UserRoleName,ParameterValue=MyUserRole \
    ParameterKey=UserPolicyName,ParameterValue=MyUserRolePolicy \
    ParameterKey=AllowedOrigins,ParameterValue="*"
```

2. Create webpack configuration

```
cp webpack/sample.js webpack/dev.js
export WEBPACK_CONFIG=./webpack/dev
```

3. Modify `webpack/dev.js` (You can get the values by `aws cloudformation describe-stacks --stack-name MyStack`)

## Build

```
npm run build:dev
```

## Start

Open `dist/index.html`
