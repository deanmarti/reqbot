const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getFeelings = () => {
  const answers = [
    'I\'m very good thank you. What about you? ',
    'Marvelouse thanks, you?.',
    'Living the dream. What about you?',
    'Fine thanks, how are you?',
    ]
  return random(answers)
}
module.exports = getFeelings