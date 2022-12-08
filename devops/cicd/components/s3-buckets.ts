import { TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'
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
export const myBucket = (stack: TerraformStack): aws.s3Bucket.S3Bucket => {
  return new aws.s3Bucket.S3Bucket(stack, 'my-bucket', {
    ...bucketOptions
  })
}
