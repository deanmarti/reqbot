const getReqStatus = (entity) => {

    return new Promise(function(resolve) {

    var request = require('request');
    var entity_in = entity.value // .raw
    //var request_number = entity.toLowerCase()
    var request_number_in = entity_in.toLowerCase().match(/\d+/g) 
    var request_number = "rq"+request_number_in;
    
    var output = [];
    // console.log(request_number)

    // Downloading the file
    var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');                                                    

    var url = 'http://reqbotweb.azurewebsites.net/netreqs.csv';                    

    http.request(url, function(response) {                                        
        var data = new Stream();                                                    
        response.on('data', function(chunk) {                                       
        data.push(chunk);                                                         
    });                                                                         

    response.on('end', function() {                                             
    fs.writeFileSync('./data/netreqs.csv', data.read());                               
    });                                                                         
    }).end();


    // Processing
    var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./data/netreqs.csv')
    }); 

    lineReader.on('line', function (line) {
    var jsonFromLine = {};
    var lineSplit = line.split(';');
    jsonFromLine.req = lineSplit[0];
    jsonFromLine.req_count = lineSplit[1];
    jsonFromLine.req_type = lineSplit[2];
    jsonFromLine.ATOS_approved = lineSplit[3];
    jsonFromLine.urgent = lineSplit[4];
    jsonFromLine.assignee = lineSplit[5];
    jsonFromLine.change = lineSplit[6];
    jsonFromLine.impl_date = lineSplit[7];
    jsonFromLine.change_approved = lineSplit[8];
    jsonFromLine.compl_date = lineSplit[9];
    jsonFromLine.req_closed = lineSplit[10];
    var req_lower = jsonFromLine.req.toLowerCase()//.match(/\d+/g)
    if (req_lower == request_number) {
        var req_closed_lower = jsonFromLine.req_closed.toLowerCase();
        if (req_closed_lower !== 'yes') {
             if (jsonFromLine.impl_date == '' ) { 
                var urgent_lower = jsonFromLine.urgent.toLowerCase();
                if (urgent_lower == 'yes'){
                    output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved} but is not yet scheduled for implementation. \n\nThe request has been marked as urgent and we will implement it as soon as we possible. For further questions please contact the Provisioning Team.`);    
                 }
                else {
                    output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved} but is not yet scheduled for implementation. \n\nNormaly a such a request requires 10 working days, if you need it earlier please contact the Provisioning Team.`);
                }}
            else {
                output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved} and is scheduled for implementation on ${jsonFromLine.impl_date}. \n\nWould it be extremly urgent and have to be implemented earlier please contact ${jsonFromLine.assignee} who coordinates this request.`); 
            }
        }
        else {
        output.push( `Your request ${jsonFromLine.req} has been completed on ${jsonFromLine.compl_date}. We hope it was delivered to your satisfaction, would there be a problem please contact ${jsonFromLine.assignee} how has coordinated this request.`);    
        }
   }

    });

    lineReader.on('close', function (line) {
        if (output == '') {
        output.push( `I was not able to find the Request ${request_number}. Please check your request number, should be something like RQ0123456 (RQ + 7 digits)`);
        }
        console.log(`BotResp(reqstatus): ${output}`); // list output
         resolve(output);
        });
    });
}
module.exports = getReqStatus
//getReqStatus('rq0195240').then(function(outputOfResolve) { console.log(outputOfResolve); });
