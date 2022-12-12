import { TerraformStack, TerraformOutput } from 'cdktf'

/**
 * Configuring myAccessTokenOutput output
 */
export const myAccessTokenOutput = (stack: TerraformStack, accessToken: string): TerraformOutput => {
  return new TerraformOutput(stack, 'access-token', {
    value: accessToken,
    sensitive: true
  })
}
/**
 * Configuring myBuildSpecOutput output
 */
export const myBuildSpecOutput = (stack: TerraformStack, buildSpec: string): TerraformOutput => {
  return new TerraformOutput(stack, 'build-spec', {
    value: buildSpec
  })
}
/**
 * Configuring myRoleOutput output
 */
export const myRoleOutput = (stack: TerraformStack, role: string): TerraformOutput => {
  return new TerraformOutput(stack, 'role', {
    value: role
  })
}
