import { TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

import { getResourceId } from '../utils/param-utils'

const getLambdaOptions = (role: aws.iamRole.IamRole): aws.lambdaFunction.LambdaFunctionConfig => {
  return {
    functionName: getResourceId('my-integration-lambda'),
    role: role.arn,
    filename: 'C:/Users/fvg3843/PROJECTS/PROJ/proj-tf/backend/integration/my-integration-lambda/package.zip',
    handler: 'dist/app.lambdaHandler',
    runtime: 'nodejs18.x'
  }
}

/**
 * Configuring myIntegrationLambda function
 */
export const myIntegrationLambda = (stack: TerraformStack, role: aws.iamRole.IamRole): aws.lambdaFunction.LambdaFunction => {
  const lambdaOptions = getLambdaOptions(role)
  return new aws.lambdaFunction.LambdaFunction(stack, 'my-integration-lambda', {
    ...lambdaOptions
  })
}
