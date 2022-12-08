import getGitBranchName from 'current-git-branch'
import { PREFIX, BRANCH_ID_DEFAULT, RESOURCE_ID_DEFAULT } from '../constants/proj-info'

const gitBranchName = getGitBranchName()
const sanitizeString = (s: string): string => {
  return s.replace(/[^a-z0-9-]/gi, '-')
}
export const getBranchName = (): string => {
  const branchName = (gitBranchName ?? BRANCH_ID_DEFAULT)
  if (typeof branchName === 'string') {
    return branchName
  }
  return BRANCH_ID_DEFAULT
}
const createId = (defaultId: string, resId: string): string => {
  const branchId = getBranchName()
  let myId = defaultId
  if (branchId.length !== 0) {
    myId = [PREFIX, branchId.substring(0, 31), resId]
      .join('-')
      .replace('--', '-')
      .substring(0, 62)
  }
  return sanitizeString(myId)
}
export const getStackId = (): string => {
  return createId(PREFIX + '-' + BRANCH_ID_DEFAULT, 'stack')
}
export const getResourceId = (resourcSlug: string): string => {
  if (resourcSlug.length === 0) {
    throw new Error('Missing Resource Id!')
  }
  if (resourcSlug.length > 32) {
    throw new Error('Resource Id must not be onger than 32 characters!')
  }
  return createId(RESOURCE_ID_DEFAULT, resourcSlug)
}
