import ns from 'imajs/client/core/namespace.js';

ns.namespace('App.Page.NotFound');

/**
 * @class Controller
 * @extends Core.Abstract.Controller
 * @namespace App.Page.NotFound
 * @module App
 * @submodule App.Page
 * */
class Controller extends ns.App.Base.Controller {

	/**
	 * @method constructor
	 * @constructor
	 * @param {Vendor.Rsvp.Promise} promise
	 * */
	constructor(promise) {
		super();
		this._status = 404;

		/**
		 * Promise Vendor
		 *
		 * @property _promise
		 * @type {Vendor.Rsvp.Promise}
		 */
		this._promise = promise;
	}

	/**
	 * Load all needed data.
	 *
	 * @method load
	 * @return {Object} object of promise
	 * */
	load() {
		return {
			status: this._promise.resolve(this._status)
		};
	}
}

ns.App.Page.NotFound.Controller = Controller;