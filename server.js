const config = require('./config.js')
const restify = require('restify')
const builder = require('botbuilder')
const recast = require('recastai')

const getFeelings = require('./intents/feelings.js')
const getGoodbyes = require('./intents/goodbyes.js')
const getGreetings = require('./intents/greetings.js')
const getHelp = require('./intents/help.js')
const getReqStatus = require('./intents/reqstatus.js')

// Connection to Recast.ai
const recastClient = new recast.Client(config.recast)


// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
    appId: config.appId,
    appPassword: config.appPassword
})

const bot = new builder.UniversalBot(connector)

// Intents based on definitions on recast
const INTENTS = {
  feelings: getFeelings,
  goodbyes: getGoodbyes,
  greetings: getGreetings,
  help: getHelp,
  reqstatus: getReqStatus,
}

// Event when Message received
bot.dialog('/', (session) => {
  recastClient.textRequest(session.message.text)
   .then(res => {
    const intent = res.intent()
    const entity = res.get('request_number')
//  session.send(`Intent: ${intent.slug}`)
//   session.send(`Entity: ${entity.name}`)
  console.log(session.message.text)
  console.log(`Intent: ${intent.slug}`) 
  if (intent) {
  session.send(INTENTS[intent.slug](entity))
 }
 })
  .catch(() => session.send('Sorry I didn\'t get that. \n\nI can provide you information regarding your ongoing Requests. What can I do for you today?\n\nPS: I only speak english for now.'))
})

// Server Init
const server = restify.createServer()
server.listen(process.env.PORT,process.env.IP)
server.post('/', connector.listen())