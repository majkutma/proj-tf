// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { App, CloudBackend, NamedCloudWorkspace } from 'cdktf'
import { getBranchName, getStackId } from './utils/param-utils'
import { STACK_ID_DEFAULT } from './constants/proj-info'
import { MyStack } from './components/tf-stacks'

const app = new App()

const stackId = getStackId() ?? STACK_ID_DEFAULT
const branchName = getBranchName()
// const region = app.node.tryGetContext('defaultRegion')
// const profile = app.node.tryGetContext('defaultProfile')
// const creds = app.node.tryGetContext('credentialsPath')

console.log('-----------------------------------------------------')
console.log(' On branch: ', branchName)
console.log(' Please review the stack name: ', stackId)
// console.log(' Region: ', region, ' Profile: ', profile)
console.log('-----------------------------------------------------')

const stack = new MyStack(app, stackId)
new CloudBackend(stack, {
  hostname: 'app.terraform.io',
  organization: 'marekmajkut',
  workspaces: new NamedCloudWorkspace('proj-tf')
})
app.synth()
