const config = require('./config.js')
const restify = require('restify')
const builder = require('botbuilder')
const recast = require('recastai')

const getFeelings = require('./intents/feelings.js')
const getGoodbyes = require('./intents/goodbyes.js')
const getGreetings = require('./intents/greetings.js')
const getHelp = require('./intents/help.js')
const getReqStatus = require('./intents/reqstatus.js')
const getReqNew =  require('./intents/reqnew.js')

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
  reqstatus: getReqStatus,
  reqnew: getReqNew,
  help: getHelp,
  }

// Event when Message received
bot.dialog('/', (session) => {
  recastClient.textRequest(session.message.text)
   .then(res => {
    const intent = res.intent()
    const entity = res.get('request_number')

    console.log(`UserName: ${session.message.user.name}`)
    console.log(`UserMsg: ${session.message.text}`)
    console.log(`Intent: ${intent.slug}`) 
    console.log(entity)
    
    if (intent) {
           if (intent.slug == 'reqstatus' && entity  === undefined) {
       console.log ("BotResp(reqstatus): Entity request_number not defined.")
       session.send('Sure I can help you with that. Please provide the RQ Number as well, should be should be something like RQ0123456')
         }
        INTENTS[intent.slug](entity)
        .then(res => session.send(res)) 
        .catch(err => session.send(err))
      //  console.log(res) 
    }
    })
    .catch(() => session.send('Sorry I didn\'t get that. \n\nI can provide you information regarding your ongoing Requests or help you to create a new one.\n\nPS: I only speak English for now.'))
    
})

// Server Init
const server = restify.createServer()
server.listen(process.env.PORT,process.env.IP)
server.post('/', connector.listen())