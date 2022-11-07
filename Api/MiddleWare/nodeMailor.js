const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const nodemailor = async (
  projectName,
  projectDescription,
  
  timeline,
  emaillist,
  filename,
) => {
 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mayurisoniwork@gmail.com",
      pass: "jmavovpgbcawdzgq",
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  // using  a template file
  transporter.use("compile", hbs(handlebarOptions));
  const list = await emaillist();
  console.log(list)
 if(filename){
  var mailOptions = {
    from: "<mayurisoniwork@gmail.com>",
    to: list,
    subject: "Welcome!",
    template: "email",
    context: {
      name: "mayuri",
      company: "I-pangram",
      projectName: projectName,
      ProjectRequiremnet: projectDescription,
      timeline: timeline,
    },
    attachments: [{ filename: "pic-1.png", path: `./uploads/${filename}` }],

    //html:'<h1>hello</h1>'
  };
 }
 else{
  var mailOptions = {
    from: "<mayurisoniwork@gmail.com>",
    to: list,
    subject: "Welcome!",
    template: "email",
    context: {
      name: "mayuri",
      company: "I-pangram",
      projectName: projectName,
      ProjectRequiremnet: projectDescription,
      timeline: timeline,
    }
   

    //html:'<h1>hello</h1>'
  };
 }
 

  // list.forEach(function (to, i , array) {
  //     var mailOptions = {
  //         from: '<mayurisoniwork@gmail.com>',
  //         subject: 'Welcome!',
  //          template: 'email',
  //         context:{
  //             name: "mayuri",
  //             company: 'I-pangram' ,
  //             projectName:projectName,
  //             ProjectRequiremnet:projectDescription,
  //             timeline:timeline
  //         },
  //         attachments: [{ filename: "pic-1.png", path: `./uploads/${filename}` }],

  //         //html:'<h1>hello</h1>'

  //     };
  //     mailOptions.to = to;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};
// })}
module.exports = { nodemailor };
