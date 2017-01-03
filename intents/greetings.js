const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getGreetings = () => {
  const answers = [
    'Hi, my name is ReqBot. Nice to meet you! \n\nI can provide you information regarding your ongoing Requests. What can I do for you today? \n\nPS: I only speak english for now.',
  //  'Hey, nice to see you.',
  //  'Welcome back!',
  //  'Hi, how can I help you?',
  //  'Hey, what do you need?',
  ]
  return random(answers)
}
module.exports = getGreetings