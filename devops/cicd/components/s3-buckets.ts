import { TerraformStack } from 'cdktf'
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket'
import { getResourceId } from '../utils/param-utils'

const bucketOptions = {
  bucket: getResourceId('my-bucket'),
  versioning: {
    enabled: true
  }
}

/**
 * Configuring myBucket bucket
 */
export const myBucket = (stack: TerraformStack): S3Bucket => {
  return new S3Bucket(stack, 'my-bucket', {
    ...bucketOptions
  })
}
