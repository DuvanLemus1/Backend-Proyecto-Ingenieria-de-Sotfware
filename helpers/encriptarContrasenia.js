const bcryptjs = require('bcryptjs');


const encriptarContra=(password)=>{
   const salt = bcryptjs.genSaltSync();
   return bcryptjs.hashSync(password, salt);
}


module.exports ={encriptarContra}