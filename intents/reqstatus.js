//const random = array => { return array[Math.floor(Math.random() * array.length)] }

const getReqStatus = (entity) => {
  const answers = [
  `Sure I can help you with that. Let me check... \n\n Your request ${entity.value} will be implemented on 25.1.2017`

  ]
 return Promise.resolve((answers))
}
module.exports = getReqStatus