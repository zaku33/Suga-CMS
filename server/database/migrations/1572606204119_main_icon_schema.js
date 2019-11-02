'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MainIconSchema extends Schema {
  up () {
    this.create('main_icons', (table) => {
      table.increments()
      table.string('icon', 20)
      table.string('title', 100)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('main_icons')
  }
}

module.exports = MainIconSchema
