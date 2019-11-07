'use strict'
const User = use('App/Models/User');
const ErrorCode = use('App/Services/ErrorCode');
const RandExp = require('randexp');

const Env = use('Env');
const Mail = use('Mail');
const Hash = use('Hash');

class UserController {
    /**
     * 
     * Login function
     * @requires username and password
     * @param {object} request adonis syntax
     * @param {string} request.username
     * @param {string} request.password
     * @param {*} auth get user authentication 
     */
    async login({ request, auth }) {
        try {
            const { username, password } = request.all();
            const data = await auth.attempt(username, password);
            return ErrorCode.CheckingError(200, data);
        } catch (error) {
            return ErrorCode.CheckingError(error.errno, error.message)
        }

    }
    async register({ request }) {
        try {
            const { username, email, password } = request.all();
            await User.create({
                username,
                email,
                password,
            })
            return ErrorCode.CheckingError(200, "Register successful!")
        } catch (error) {
            return ErrorCode.CheckingError(error.errno, error.message)
        }

    }
    async forgotpassword({ request }) {
        const { email } = request.all(); // get all req.body by request.all() | request.only('<name>') will get only special field

        // find user by email , if not found => return 404
        const user = await User.findBy('email', email);
        if (!user) return ErrorCode.CheckingError(404, "User not found!");

        var new_password = new RandExp(/[0-9]\w{6}#$/).gen();; // create new password with 6 digit
        user.merge({ password: new_password }); // update new password
        await user.save(); // save new password into database

        //sending password through email
        await Mail.send('emails.welcome', {}, (message) => {
            message.to(user.email)
                .from(Env.get('MAIL_USERNAME'), 'No reply email')
                .subject(`
                You have changed your password , your new password is : ${new_password}.
                Please reset your password with the random password we give you!
                `
                );
        })
        return {
            message: `Your password has been send to your email! See more at ${user.email}`
        }
    }
    async changepassword({ request }) {
        const { username, old_password, new_password } = request.all(); // get all req.body

        // find user by username , if not found => return 404
        const user = await User.findBy({ username: username });
        if (!user) return ErrorCode.CheckingError(404, "User not found!");

        // check if new password different from old password
        if (old_password == new_password) return ErrorCode.CheckingError(400, "New password must different from old password!")

        // check if old password is right or wrong , if wrong => return 403
        var verify = await Hash.verify(old_password, user.password);
        if (!verify) return ErrorCode.CheckingError(403, "Current password wrong!");

        // if right , save new password
        user.merge({ password: new_password });
        await user.save();

        return { message: `Change password successful!` } //then return message
    }
    async test({ request }){
        var {paymentInput} = require('../../../../frontend/src/controller/payment');
        var data = request.all();
        var n = await paymentInput(data);
        console.log(n)
        return n
    }
}

module.exports = UserController
