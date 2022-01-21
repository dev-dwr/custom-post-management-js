import nodemailer from "nodemailer";

export const sendMail = (name, email, confirmationCode) => {
    const transport = nodemailer.createTransport({
        port: 1025,
        ignoreTLS: true,
    })

    let sender = "David@gmail.com"

    const mailOptions = {
        from: sender,
        to: email,
        subject: "Email confirmation",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5001/auth/verify/${confirmationCode}> Click here</a>
        </div>`
    }

    transport.sendMail(mailOptions, (err, res) =>{
        if(err){
            console.error(err);
        }
        console.log("Message sent")
    });
}