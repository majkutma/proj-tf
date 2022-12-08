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
 * Configuring myIntegrationLambda role
 */
export const myIntegrationLambdaRole = (stack: TerraformStack): aws.iamRole.IamRole => {
  return new aws.iamRole.IamRole(stack, 'my-integration-lambda-role', {
    name: getResourceId('my-integration-lambda-role'),
    assumeRolePolicy: JSON.stringify(lambdaRolePolicy)
  })
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
