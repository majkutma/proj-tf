import { TerraformStack, TerraformVariable } from 'cdktf'

import { REPOSITORY_ACCESS_TOKEN } from '../constants/.secrets'

/**
 * Configuring myVariable variable
 */
export const myVariable = (stack: TerraformStack): TerraformVariable => {
  return new TerraformVariable(stack, 'my-variable', {
    type: 'string',
    description: 'github-token',
    default: REPOSITORY_ACCESS_TOKEN,
    sensitive: true
  })
}
