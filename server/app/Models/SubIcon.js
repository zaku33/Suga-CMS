'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubIcon extends Model {
    // user(){
    //     return this.belongsTo('App/Models/User');
    // }
    mainIcon () {
        return this.belongsTo('App/Models/MainIcon', 'main_icon_id')
      }
}

module.exports = SubIcon
