import { TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

import { getResourceId } from '../utils/param-utils'

const lambdaRolePolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Action: 'sts:AssumeRole',
      Principal: {
        Service: 'lambda.amazonaws.com'
      },
      Effect: 'Allow',
      Sid: ''
    }
  ]
}

/**
 * Configuring myIamRole role
 */
export const myIamRole = (stack: TerraformStack): aws.iamRole.IamRole => {
  return new aws.iamRole.IamRole(stack, 'my-iam-role', {
    name: getResourceId('my-iam-role'),
    assumeRolePolicy: JSON.stringify(lambdaRolePolicy)
  })
}
