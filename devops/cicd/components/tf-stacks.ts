import { App, TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

import { myBucket } from './s3-buckets'
import { myIamRole } from './iam-roles'
import { myIntegrationLambda } from './lambda-functions'
import { myVariable } from './variables'
import { myAmplify } from './amplify-apps'
import { myBranch } from './amplify-branches'
import { myAccessTokenOutput, myBuildSpecOutput, myRoleOutput } from './outputs'
import { AWS_REGION } from '../constants/proj-info'
import { AWS_CREDENTIALS_PATH_LOCAL, AWS_USER_PROFILE_LOCAL } from '../constants/user-specific'

/**
 * Configuting MyStack stack
 */
export class MyStack extends TerraformStack {
  constructor (scope: App, id: string) {
    super(scope, id)

    new aws.provider.AwsProvider(this, 'AWS', {
      sharedCredentialsFiles: [AWS_CREDENTIALS_PATH_LOCAL],
      profile: AWS_USER_PROFILE_LOCAL,
      region: AWS_REGION
    })

    // Creating myBucket bucket
    myBucket(this)

    // Creating myIamRole role
    const myRole = myIamRole(this)
    // Creating myIntegrationLambda function
    const lambda = myIntegrationLambda(this, myRole)

    // Creating myVariable variable
    const variable = myVariable(this)
    // Creating myAmplify app
    const amplify = myAmplify(this, variable)
    // Creating myBranch branch
    myBranch(this, amplify)

    // Creating myAccessTokenOutput output
    myAccessTokenOutput(this, amplify.accessToken)
    // Creating myBuildSpecOutput output
    myBuildSpecOutput(this, amplify.buildSpec)
    // Creating myRoleOutput output
    myRoleOutput(this, lambda.role)
  }
}
