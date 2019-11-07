'use strict'
const AuthorizationService = use('App/Services/AuthorizationService');
const MainIcon = use('App/Models/MainIcon');
const ErrorCode = use('App/Services/ErrorCode');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with mainicons
 */
class MainIconController {
  async index({ auth }) {
    const main_icons = await MainIcon.query()
    .select(['id', 'icon', 'title', 'active'])
    .with('subIcon')
    .fetch();
    return main_icons
  }
  async create({ auth, request }) {
    try {
      const { icon, title, active } = request.all();
      const mainIcon = new MainIcon()
      mainIcon.fill({
        icon, title, active
      })
      await mainIcon.save()
      return ErrorCode.CheckingError(200, mainIcon)
    } catch (error) {
      return ErrorCode.CheckingError(error.errno, error.message)
    }
  }

  async store({ request, response }) {
  }

  async show({ params, request, response, view }) {
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = MainIconController
