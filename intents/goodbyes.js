const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getGoodbyes = () => {
  const answers = [
    'Was a pleasure to meet you, bye! ',
    'Speak to you soon, bye',
    'Always happy to help, cheers.',
    'See you soon, bye',
  ]
  return random(answers)
}
module.exports = getGoodbyes