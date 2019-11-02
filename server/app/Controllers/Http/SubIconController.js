'use strict'
const SubIcon = use('App/Models/SubIcon');
const ErrorCode = use('App/Services/ErrorCode');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with subicons
 */
class SubIconController {
  /**
   * Show a list of all subicons.
   * GET subicons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new subicon.
   * GET subicons/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    try {
      const { icon, title, linkTo , main_icon_id} = request.all();
      var subIcon = new SubIcon();
      subIcon.fill({
        icon, title, linkTo , main_icon_id
      })
      await subIcon.save();
      return ErrorCode.CheckingError(200, "Create sub icon successful!")
    } catch (error) {
      return ErrorCode.CheckingError(error.errno, error.message)
    }
  }

  /**
   * Create/save a new subicon.
   * POST subicons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single subicon.
   * GET subicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing subicon.
   * GET subicons/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update subicon details.
   * PUT or PATCH subicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a subicon with id.
   * DELETE subicons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = SubIconController
