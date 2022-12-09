import { TerraformStack, TerraformOutput } from 'cdktf'

/**
 * Configuring myBucket bucket
 */
export const myOutput1 = (stack: TerraformStack, accessToken: string): TerraformOutput => {
  return new TerraformOutput(stack, 'access-token', {
    value: accessToken,
    sensitive: true
  })
}
/**
 * Configuring myBucket bucket
 */
export const myOutput2 = (stack: TerraformStack, buildSpec: string): TerraformOutput => {
  return new TerraformOutput(stack, 'build-spec', {
    value: buildSpec
  })
}
/**
 * Configuring myBucket bucket
 */
export const myOutput3 = (stack: TerraformStack, role: string): TerraformOutput => {
  return new TerraformOutput(stack, 'role', {
    value: role
  })
}
