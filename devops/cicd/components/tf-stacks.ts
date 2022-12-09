import { App, TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'
import { myBucket } from './s3-buckets'
import { myIntegrationLambdaRole, myIntegrationLambda } from './lambda-functions'
import { mySecret, myAmplify } from './amplify-apps'
import { myOutput1, myOutput2, myOutput3 } from './outputs'

/**
 * Configuting MyStack stack
 */
export class MyStack extends TerraformStack {
  constructor (scope: App, id: string) {
    super(scope, id)

    new aws.provider.AwsProvider(this, 'AWS', {
      sharedCredentialsFiles: ['/Users/fvg3843/.aws/credentials'],
      profile: 'private',
      region: 'us-east-1'
    })

    // Creating myBucket bucket
    myBucket(this)
    // Creating myIntegrationLambdaRole role
    const myRole = myIntegrationLambdaRole(this)
    // Creating myIntegrationLambda function
    const lambda = myIntegrationLambda(this, myRole)
    // Creating myBucket bucket
    const secret = mySecret(this)
    // Creating myBucket bucket
    const amplify = myAmplify(this, secret)
    // Creating myBucket bucket
    myOutput1(this, amplify.accessToken)
    // Creating myBucket bucket
    myOutput2(this, amplify.buildSpec)
    // Creating myBucket bucket
    myOutput3(this, lambda.role)
  }
}
