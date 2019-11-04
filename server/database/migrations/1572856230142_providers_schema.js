'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvidersSchema extends Schema {
  up() {
    this.create('providers', (table) => {
      table.increments()
      table.string('provider_name', 80)
      table.integer('amount_money').unsigned()
      table.integer('convert_to_chip').unsigned()
      table.integer('bonus').unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('providers')
  }
}

module.exports = ProvidersSchema
