'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubIconSchema extends Schema {
  up () {
    this.create('sub_icons', (table) => {
      table.increments()
      table.integer('main_icon_id').unsigned().references('id').inTable('main_icons')
      table.string('icon', 255)
      table.string('title', 255)
      table.string('linkTo', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_icons')
  }
}

module.exports = SubIconSchema
