'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MainIconSchema extends Schema {
  up () {
    this.create('main_icons', (table) => {
      table.increments()
      table.string('icon', 255)
      table.string('title', 255)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('main_icons')
  }
}

module.exports = MainIconSchema
