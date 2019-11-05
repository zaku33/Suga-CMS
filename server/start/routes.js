'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// Instead of writing '/api/auth/register' , '/api/auth/login' , we can group '/api' into prefix
Route.group(() => {
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login','UserController.login')
  Route.post('auth/forgot-password','UserController.forgotpassword')
  Route.post('auth/change-password','UserController.changepassword')
}).prefix('api')

Route.group(()=>{
  Route.post('main-icon','MainIconController.create')
  Route.post('sub-icon','SubIconController.create')
}).prefix('system').middleware('auth','is:admninistrator')

Route.group(()=>{
  Route.post('/providers','ProviderController.create').middleware('auth')
  Route.get('/providers','ProviderController.index')
  Route.get('/provider/:id','ProviderController.show')
}).prefix('payment')


