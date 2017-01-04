const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getHelp = () => {
  const answers = [
    'I\'m here to help. \n\nI can provide you information regarding your ongoing Requests (please include the RQ Number) or help you to create a new one. \n\nPS: I only speak English for now.',
  //  'Hey, nice to see you.',
  //  'Welcome back!',
  //  'Hi, how can I help you?',
  //  'Hey, what do you need?',
  ]
  return Promise.resolve(random(answers))
}
module.exports = getHelp