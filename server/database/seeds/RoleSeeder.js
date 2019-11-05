'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
class RoleSeeder {
  async run() {
    const createUsersPermission = new Permission()
    createUsersPermission.slug = 'create_users'
    createUsersPermission.name = 'Create Users'
    createUsersPermission.description = 'create users permission'
    await createUsersPermission.save()

    const updateUsersPermission = new Permission()
    updateUsersPermission.slug = 'update_users'
    updateUsersPermission.name = 'Update Users'
    updateUsersPermission.description = 'update users permission'
    await updateUsersPermission.save()

    const deleteUsersPermission = new Permission()
    deleteUsersPermission.slug = 'delete_users'
    deleteUsersPermission.name = 'Delete Users'
    deleteUsersPermission.description = 'delete users permission'
    await deleteUsersPermission.save()

    const readUsersPermission = new Permission()
    readUsersPermission.slug = 'read_users'
    readUsersPermission.name = 'Read Users'
    readUsersPermission.description = 'read users permission'
    await readUsersPermission.save()
  }
}

module.exports = RoleSeeder
