const nodemailer=require('nodemailer');

const emailRegistro=async(datos)=>{
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //enviar el email
      const {correoElectronico,nombreCompleto,token}=datos;
      console.log(datos);
      const info=await transporter.sendMail({
        from: "Administrador de Ingenieria de software",
        to:correoElectronico,
        subject: "Comprueba tu cuenta en ECM",
        text:"Comprueba tu cuenta en ECM",
        html:`<p>Hola:${nombreCompleto},comprueba tu cuenta en ECM</p>
        <p>Tu cuenta ya esta lista,solo debes comprobarla en el siguiente enlace
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Comprobar tu cuenta</a></p>

        <p>Si tu no creaste esta cuenta,puedes ignorar este mensaje</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId);
}


module.exports={emailRegistro}