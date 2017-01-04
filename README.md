
## ReqBot

ReqBot is a simple ChatBot built which can provide information regarding your Requests and help you to create a new one. It requires a CSV file with the Request data.

Its written in Node.js, uses the Microsoft Bot Framework and Recast.ai (for Language understanding). 

## Contributors

I used the following tutorial 'https://chatbotsmagazine.com/a-nodejs-chatbot-tutorial-part-1-a2abd1b1c715#.xkoxkhin4' as a starting point, credits also to the stackoverflow cumminity for their.

## Installation

* Requires an account for [Microsoft Bot Framework](https://dev.botframework.com/) and [Recast](https://www.recast.ai) account plus the required config for a new bot.

* Clone this Repository

```
git clone https://github.com/deanmarti/reqbot.git
```

* Fill the config.js with your Tokens

```
var tokens =
{
	recast: 'Recast Token',
	AppId: 'Application Id',
	Secret: 'Your Microsoft Secret',
}
```
* Edit the download url for your CSV in ./intents/reqstatus.js
```
  var url = 'yoururl/netreqs.csv';       
```

* install the dependencies

```
npm install
```

* run ReqBot

```
npm run build
npm run start
```

* use ngrok or similar to run the endpoint (this deployment runs fine on a Azure Web App)
```
./ngrok http 8080
```

## ToDo / please note

* Has quite a lot of hardcoded things
* Very specific for our usecase
* Waterfall/dialogs not implemented
* Text only, no cards/buttons
