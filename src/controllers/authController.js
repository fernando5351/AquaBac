const {models} = require('../../sequelize/sequelizeConnection');
const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {Jwt,Mail} = require('../../config/index');
const bcrypt = require('bcrypt');


class authController {
    async readByEmail(email){
        const user = await models.User.findOne({
            where:{
                email
            },
            include:['Role']
        })
        return user
    }

    async updatePassword(data,payload){
        const user = await this.readByEmail(payload.email);
        if (!user) {
            throw boom.unauthorized("No se encontro el usuario")
        }
        const password = await bcrypt.hash(data.password,10);
        const userUpdate = await user.update({password,status:true})
        return userUpdate
    }

    async sigInToken(user){
        const payload ={
            sub: user.id,
            code: user.status,
            role: user.Role ? user.Role.name : null,
        };
        const token = await jwt.sign(payload, Jwt.secret, {expiresIn: '72h'});
        return token
    }


    async recovery(user){
        const payload = {
            sub: user.id,
            email: user.email,
            status: user.status
        };
        const token = await jwt.sign(payload,Jwt.recovery,{expiresIn: '2h'});
        return token
    }

    async signUp(user){
        const payload = {
            sub: user.id,
            code: user.verificationCode,
            mail: user.email,
            id: user.id,
            status: user.status
        }
        const token = await jwt.sign(payload,Jwt.login,{expiresIn: '48h'})
        return token
    }

    async sendMail(user,subject,body){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth:{
                user: Mail.mail,
                pass: Mail.password
            }
        });

        const mailOption = {
            from: Mail.mail,
            to: user.email,
            subject,
            html: body
        }

        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOption,(error,info)=>{
                if (error) {
                    reject(boom.badRequest(error))
                }else{
                    resolve(info)
                }
            });
        });
    }

    async generateCode(){
        let code = ''
        for (let i = 0; i < 5; i++) {
            code += Math.floor(Math.random() *10);
        }
        return code
    }
}

module.exports = authController