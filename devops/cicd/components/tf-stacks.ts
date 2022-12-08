import { App, TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'
import { myBucket } from './s3-buckets'
import { myIntegrationLambdaRole, myIntegrationLambda } from './lambda-functions'

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
    myIntegrationLambda(this, myRole)
  }
}
