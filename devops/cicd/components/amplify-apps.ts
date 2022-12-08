// import {
//   Stack,
//   SecretValue,
//   aws_codebuild as codebuild
// } from 'aws-cdk-lib'
// import * as amplify from '@aws-cdk/aws-amplify-alpha'
import { TerraformStack } from 'cdktf'
import * as aws from '@cdktf/provider-aws'
import { getResourceId } from '../utils/param-utils'
import { OWNER, REPOSITORY, PATH } from '../constants/repo-info'

const buildOptions = {
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

const amplifyOptions = {
  name: getResourceId('my-amplify-frontend'),
  sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
    owner: OWNER,
    repository: REPOSITORY,
    oauthToken: SecretValue.secretsManager('github-token')
  }),
  environmentVariables: {
    AMPLIFY_DIFF_DEPLOY: 'true',
    AMPLIFY_MONOREPO_APP_ROOT: 'frontend'
  },
  buildSpec: codebuild.BuildSpec.fromObjectToYaml({
    ...buildOptions
  })
}

/**
 * Configuring myAmplify frontend
 */
export const myAmplify = (stack: TerraformStack): aws.amplifyApp.AmplifyApp => {
  return new aws.amplifyApp.AmplifyApp(stack, 'my-amplify-frontend', {
    ...amplifyOptions
  })
}
