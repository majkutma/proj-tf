import { createMessage } from './biz-utils'

interface Event {
  pathParameters: {
    proxy: string
  }
}

/**
* Function returns message based on the event
 */
export const lambdaHandler = async (event: Event): Promise<string> => {
  try {
    console.log('The new event was created: ', event)
    const message = createMessage(event.pathParameters.proxy)
    return message
  } catch (err: unknown) {
    const errString = JSON.stringify(err)
    return `An error occured: ${errString}`
  }
}
