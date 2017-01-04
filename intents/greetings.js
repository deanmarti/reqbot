const getGreetings = () => {
  const answers = [
    'Hi, my name is ReqBot. \n\nI can provide you information regarding your ongoing Requests (please include the RQ Number) or help you to create a new one.',
  ]
  return Promise.resolve((answers))
  }
module.exports = getGreetings