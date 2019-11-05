'use strict'
const Provider = use('App/Models/Provider');
const ErrorCode = use('App/Services/ErrorCode');
var Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with providers
 */
class ProviderController {
  /**
   * Show a list of all providers.
   * GET providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {

    let providers = await Database.table('providers').groupByRaw('provider_name, bonus')
    return providers

    // let providers = await Provider.all();
    // return providers
  }

  /**
   * Render a form to be used for creating a new provider.
   * GET providers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, auth }) {
    try {
      await auth.getUser();
      const { provider_name, amount_money, convert_to_chip, bonus } = request.all();

      if (amount_money.length != convert_to_chip.length || amount_money.length != bonus.length || convert_to_chip.length != bonus.length)
        return ErrorCode.CheckingError(400)
      for (var i = 0; i < bonus.length; i++) {
        await Provider.create({
          provider_name,
          amount_money: amount_money[i],
          convert_to_chips: convert_to_chip[i],
          bonus: bonus[i]
        })

      }
      return ErrorCode.CheckingError(200, "Create Provider and list money successful!")

    } catch (error) {
      return ErrorCode.CheckingError(error.errno, error.message)
    }


  }

  /**
   * Create/save a new provider.
   * POST providers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single provider.
   * GET providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    // LUCID ORM , findBy params then return array of datas
    let providers = await Provider.query()
      .where('provider_name', '=', request.params.id)
      .fetch()
    return providers
  }

  /**
   * Render a form to update an existing provider.
   * GET providers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update provider details.
   * PUT or PATCH providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a provider with id.
   * DELETE providers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ProviderController
