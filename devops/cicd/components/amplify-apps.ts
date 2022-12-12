import { TerraformStack, TerraformVariable } from 'cdktf'
import * as aws from '@cdktf/provider-aws'

import { getResourceId } from '../utils/param-utils'
import { REPOSITORY_URL, REPOSITORY_FOLDER_PATH } from '../constants/repo-info'

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
      appRoot: REPOSITORY_FOLDER_PATH
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
const getAmplifyOptions = (secret: TerraformVariable): aws.amplifyApp.AmplifyAppConfig => {
  return {
    name: getResourceId('my-amplify-frontend'),
    repository: REPOSITORY_URL,
    accessToken: secret.value,
    buildSpec: JSON.stringify(bld)
  }
}

/**
 * Configuring myAmplify frontend
 */
export const myAmplify = (stack: TerraformStack, secret: TerraformVariable): aws.amplifyApp.AmplifyApp => {
  const amplifyOptions = getAmplifyOptions(secret)
  return new aws.amplifyApp.AmplifyApp(stack, 'my-amplify-frontend', {
    ...amplifyOptions
  })
}
