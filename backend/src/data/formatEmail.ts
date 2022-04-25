export {};
const EmailGuesser = require('../models/emailguesser');
const FormatEmail=require('../models/formatEmail');
const fs = require('fs');

class FormatEmailData {
    constructor() {}
    async AddFormats(params: any,filepath:any, header?: any) {
        try{
        let rawdata = fs.readFileSync(filepath);
        let sampleFormats = JSON.parse(rawdata);
        for (let key of Object.keys(sampleFormats)){
            let fullName=key;
            let firstName=fullName.substring(0, fullName.indexOf(' ')).toLowerCase();
            let lastName=fullName.substring(fullName.indexOf(' ') + 1).toLowerCase();
            let email=sampleFormats[key];
            let firstPortion=email.substring(0, email.indexOf('@')).toLowerCase();
            let domain=email.substring(email.indexOf('@') + 1).toLowerCase();
            let format;
            if(firstPortion==firstName+lastName){
                format='first_name_last_name'
            }
            else{
                format='first_name_initial_last_name'
            }
            
                let formatEmail=new FormatEmail({
                    format:format,
                    domain:domain
                })
                formatEmail.save();
        }
    }
    catch(err){
        throw err;
    }
        return true;
    }
}
module.exports=FormatEmailData;