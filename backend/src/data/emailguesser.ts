
export {};
const EmailGuesser = require('../models/emailguesser');
const FormatEmail=require('../models/formatEmail');
class EmailGuesserData {
    constructor() {}
    async AddEmail(params: any, header?: any) {
        let fullName=params['full_name']
        
        let firstName=fullName.substring(0, fullName.indexOf(' ')).toLowerCase();
        if(firstName.length==0){
            return false;
        }
        let lastName=fullName.substring(fullName.indexOf(' ') + 1).toLowerCase();
        let domain=params['domain'].toLowerCase();
        let formatObj=await FormatEmail.find({domain:domain}).lean()
        if(formatObj.length==0){
            return null;
        }
        let format=formatObj[0].format
        let email;
        if(format=='first_name_last_name'){
            email=firstName+lastName+'@'+domain
        }
        else{
            email=firstName.charAt(0)+lastName+'@'+domain
        }
        try{
            let emailGuesser=new EmailGuesser({
                firstName:firstName,
                lastName:lastName,
                domain:domain,
                email:email
            })
            emailGuesser.save()
            return emailGuesser;
        } 
        catch(err){
            throw err;
        }   
    }
}
module.exports=EmailGuesserData;