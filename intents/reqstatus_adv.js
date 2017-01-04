
//function getReqStatus(entity){
//const getReqStatus = (entity) => {
var getReqStatus = function (entity) {
    return new Promise(function(resolve) {

    var request = require('request');
    var request_number = entity.toLowerCase()//.match(/\d+/g)
    var output = [];
    console.log(request_number)

    // Downloading the file
    var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');                                                    

    var url = 'http://beeforce.ch/reqbot/netreqs.csv';                    

    http.request(url, function(response) {                                        
        var data = new Stream();                                                    
        response.on('data', function(chunk) {                                       
        data.push(chunk);                                                         
    });                                                                         

    response.on('end', function() {                                             
    fs.writeFileSync('netreqs.csv', data.read());                               
    });                                                                         
    }).end();


    // Processing
    var lineReader = require('readline').createInterface({
    input: fs.createReadStream('netreqs.csv')
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
                    output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved} but is not yet scheduled for implementation. \n\nThe request has been marked as urgent and we will implement it as soon as we possible.`);    
                 }
                else {
                    output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved} but is not yet scheduled for implementation. \n\nNormaly a such a request requires 10 working days, if you need it earlier please contact the Provisioning Team.`);
                }}
            else {
                output.push( `Your request ${jsonFromLine.req} was received on ${jsonFromLine.ATOS_approved}  and is shedlued for implementation on ${jsonFromLine.impl_date}. Would you require it please contact the Provisioning Team.`); 
            }
        }
        else {
        output.push( `Your request ${jsonFromLine.req} has been completed on ${jsonFromLine.compl_date}. We hope it was delivered to your satisfaction, would there be a problem please contact ${jsonFromLine.assignee} how has coordinated this request.`);    
        }
   }

    });

// return new Promise( function(resolve , reject ){
    lineReader.on('close', function (line) {
        if (output == '') {
        output.push( `I was not able to find a request like ${request_number}. Please double check your request number.`);
        }
        console.log(output); // list output
         resolve(output);
        });
 // - promise lineReader   });
//}
    });
}
//module.exports = getReqStatus
getReqStatus('rq0195240').then(function(outputOfResolve) { console.log(outputOfResolve); });
