const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getFeelings = () => {
  const answers = [
    'I\'m very good thank you. What can I do for you? ',
    'Marvelouse thanks, what can I do for you? ?.',
    'Living the dream. What can I do for you? ',
    'Fine thanks, what can I do for you? ',
    'Busy answering questions :-), what can I do for you? ',
    ]
  return Promise.resolve(random(answers))
}
module.exports = getFeelings