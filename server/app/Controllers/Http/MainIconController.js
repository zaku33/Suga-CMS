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
  /**
   * Show a list of all mainicons.
   * GET mainicons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const user = await auth.getUser();
    const main_icon = await MainIcon.fetch()
    return {

    }

  }

  /**
   * Render a form to be used for creating a new mainicon.
   * GET mainicons/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ auth , request }) {
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

  /**
   * Create/save a new mainicon.
   * POST mainicons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single mainicon.
   * GET mainicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing mainicon.
   * GET mainicons/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update mainicon details.
   * PUT or PATCH mainicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a mainicon with id.
   * DELETE mainicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = MainIconController
