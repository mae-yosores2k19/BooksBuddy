const SGmail = require("@sendgrid/mail");

//supply the SENDGRID_API_KEY 
// const SENDGRID_API_KEY = "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"; 
SGmail.setApiKey(SENDGRID_API_KEY); // Input Api key or add to environment config
// Api key here!!

function sendEmail(receiver) {
   return new Promise((resolve, reject) => {
       const message = {
           to: receiver, 
           from: "jessamaehortadoyosores@gmail.com", //email sa sender email pod ni na naka register sa sendgrid
           subject: "BooksBuddy", //Title sa Project
           text: "Email",
           html: "<div style='border:solid 2px black'>"+
                   "<center>"+
                   "<h1>Library Management System</h1><br/><br/>"+
                   "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0PJyNGCV-JAKUUGRUGKCHXQUSi3aaviu-YmV75uMk_9h1coO&s'>"+
                   `<h4>Hi! You must Return the books you borrowed within this day</h4>`+ //edit ka dri unsa ganahan nmo na message
                   `<h5>Visit BooksBuddy for more details</h5>`+
                   "</center>"+
               "</div>"
       };
       SGmail.send(message)
           .then(sent => {
               resolve(sent);
           })
           .catch(err => {
               reject(err);
           });
   });
}
module.exports = {
   sendEmail
};