'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubIconSchema extends Schema {
  up () {
    this.create('sub_icons', (table) => {
      table.increments()
      table.integer('main_icon_id').unsigned().references('id').inTable('main_icons')
      table.string('icon', 20)
      table.string('title', 100)
      table.string('linkTo', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_icons')
  }
}

module.exports = SubIconSchema
