import { App, TerraformStack } from 'cdktf'
import { AwsProvider } from '@cdktf/provider-aws/lib/provider'
import { myBucket } from './s3-buckets'

/**
 * Configuting MyStack stack
 */
export class MyStack extends TerraformStack {
  constructor (scope: App, id: string) {
    super(scope, id)

    new AwsProvider(this, 'AWS', {
      sharedCredentialsFiles: ['/Users/fvg3843/.aws/credentials'],
      profile: 'private',
      region: 'us-east-1'
    })

    // Creating myBucket bucket
    myBucket(this)
  }
}
