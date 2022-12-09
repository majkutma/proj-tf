// import {
//   Stack,
//   SecretValue,
//   aws_codebuild as codebuild
// } from 'aws-cdk-lib'
// import * as amplify from '@aws-cdk/aws-amplify-alpha'
import { TerraformStack, TerraformVariable } from 'cdktf'
import * as aws from '@cdktf/provider-aws'
import { getResourceId } from '../utils/param-utils'
import { REPOSITORY, PATH } from '../constants/repo-info'

const bld = {
  version: 1,
  applications: [
    {
      frontend: {
        phases: {
          preBuild: {
            commands: [
              'npm ci'
            ]
          },
          build: {
            commands: [
              'npm run build'
            ]
          }
        },
        artifacts: {
          baseDirectory: 'dist/app',
          files: [
            '**/*'
          ]
        },
        cache: {
          paths: [
            'node_modules/**/*'
          ]
        }
      },
      appRoot: PATH
    }
  ]
}

// const amplifyOptions = {
//   name: getResourceId('my-amplify-frontend'),
//   // sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
//   //   owner: OWNER,
//   //   repository: REPOSITORY,
//   //   oauthToken: SecretValue.secretsManager('github-token')
//   // }),
//   environmentVariables: {
//     AMPLIFY_DIFF_DEPLOY: 'true',
//     AMPLIFY_MONOREPO_APP_ROOT: 'frontend'
//   },
//   buildSpec: codebuild.BuildSpec.fromObjectToYaml({
//     ...buildOptions
//   })
// }

/**
 * Configuring myAmplify frontend
 */
export const mySecret = (stack: TerraformStack): TerraformVariable => {
  return new TerraformVariable(stack, 'my-secret', {
    type: 'string',
    description: 'github-token',
    // default: process.env.TF_VAR_mySecret,
    sensitive: true
  })
}

/**
 * Configuring myAmplify frontend
 */
export const myAmplify = (stack: TerraformStack, secret: TerraformVariable): aws.amplifyApp.AmplifyApp => {
  return new aws.amplifyApp.AmplifyApp(stack, 'my-amplify-frontend', {
    // ...amplifyOptions
    name: getResourceId('my-amplify-frontend'),
    repository: REPOSITORY,
    accessToken: secret.value,
    buildSpec: JSON.stringify(bld)
  })
}
