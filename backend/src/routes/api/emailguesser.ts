export {};
let express = require('express');
let router = express.Router();
const EmailGuesserData = require('../../data/emailguesser');

router.post('/email', async (req: any, res: any, next: any) => {
    let emailGuesserData = new EmailGuesserData();
    let result = await emailGuesserData.AddEmail(req.body, req.header);
  
    if (result==null){
      result = {
        success: false,
        message: 'Format not given. Please add sample format',
      };
    }
    else if(result==false){
      result={
        success:false,
        message:'Please add space in Name'
      }
    }
    else{
      result = {
        success: true,
        result: result,
        message: 'Email Genenrated',
      };
    }
    res.status(200).send(result);
  });

module.exports=router;