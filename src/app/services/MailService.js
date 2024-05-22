const {Mailer} = require('../utils')
const CreateMailContent = (full_name, OPT_code) =>{
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>OTP Confirmation</title>
    <style>
        body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
    }

        /* Container styles */
        .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

        h1 {
        text-align: center;
        color: #333;
    }
        .content {
        padding: 20px;
        text-align: center;
    }
    </style>
</head>
    <body>
    <div class="container">
        <h1>Email OTP Confirmation</h1>
        <div class="content">
            <p>Hi, ${full_name}</p>
            <p>Thank you for registering an account with us!</p>
            <p>Your OTP code is: <strong>${OPT_code}</strong></p>
        </div>
    </div>
    </body>
</html>`
}


const MailService = {
    async Send(to_email, full_name, OPT_code){
        let subject = 'Cyber Go OTP Code'
        let content = CreateMailContent(full_name, OPT_code)
        return await Mailer(
            process.env.EMAIL,
            to_email,
            subject,
            content,
        )
    }
}

module.exports = MailService