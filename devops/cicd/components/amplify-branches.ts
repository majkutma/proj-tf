import { TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

import { getBranchName } from '../utils/param-utils'

const branchName = getBranchName()

/**
 * Configuring myBranch branch
 */
export const myBranch = (stack: TerraformStack, amplifyApp: aws.amplifyApp.AmplifyApp): aws.amplifyBranch.AmplifyBranch => {
  return new aws.amplifyBranch.AmplifyBranch(stack, 'my-branch', {
    branchName,
    appId: amplifyApp.id
  })
}
