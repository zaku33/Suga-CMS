'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MainIcon extends Model {
    // subIcon() {
    //     return this.hasMany('App/Models/SubIcon');
    // }
    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = MainIcon
