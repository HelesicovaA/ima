import ns from 'imajs/client/core/namespace.js';

ns.namespace('Core.Window');

/**
 * Client-side implementation of the {@code Core.Interface.Window} utility API.
 *
 * @class Client
 * @implements ns.Core.Interface.Window
 * @namespace Core.Window
 * @module Core
 * @submodule Core.Window
 */
class Client extends ns.Core.Interface.Window {

	/**
	 * Returns {@code true} if invoked at the client side.
	 *
	 * @inheritdoc
	 * @override
	 * @method isClient
	 * @return {boolean} {@code true} if invoked at the client side.
	 */
	isClient() {
		return true;
	}

	/**
	 * Returns {@code true} if the cookies are set and processed on the HTTP
	 * requests and responses automatically by the environment.
	 *
	 * @inheritdoc
	 * @override
	 * @method isCookieEnabled
	 * @return {boolean} {@code true} if cookies are handled automatically by the
	 *         environment.
	 */
	isCookieEnabled() {
		return navigator.cookieEnabled;
	}

	/**
	 * Returns {@code true} if the session storage is supported.
	 *
	 * @inheritdoc
	 * @override
	 * @method hasSessionStorage
	 * @return {boolean} {@code true} if the session storage is supported.
	 */
	hasSessionStorage() {
		return !!window.sessionStorage;
	}

	/**
	 * Returns {@code true} if the WebSockets are supported.
	 *
	 * @inheritdoc
	 * @override
	 * @method hasWebSocket
	 * @return {boolean} {@code true} if the WebSockets are supported.
	 */
	hasWebSocket() {
		return window.WebSocket || window.MozWebSocket;
	}

	/**
	 * Returns {@code true} if the history manipulation API is supported.
	 *
	 * @inheritdoc
	 * @override
	 * @method hasHistoryAPI
	 * @return {boolean} {@code true} if the history manipulation API is
	 *         supported.
	 */
	hasHistoryAPI() {
		return !!(window.history) && !!(window.history.pushState);
	}

	/**
	 * Sets the new page title to the document.
	 *
	 * @inheritdoc
	 * @override
	 * @method setTitle
	 * @param {string} title The new page title.
	 */
	setTitle(title) {
		document.title = title;
	}

	/**
	 * Returns the current {@code WebSocket} implementation to use.
	 *
	 * @inheritdoc
	 * @override
	 * @method getWebSocket
	 * @return {function(new: WebSocket)} The current {@code WebSocket}
	 *         implementation.
	 */
	getWebSocket() {
		return window.WebSocket || window.MozWebSocket;
	}

	/**
	 * Returns the {@code window} object representing the global context at the
	 * client side. The method returns {@code undefined} if used at the server
	 * side.
	 *
	 * @inheritdoc
	 * @override
	 * @method getWindow
	 * @return {(undefined|Window)} The {@code window} object at the client side,
	 *         or {@code undefined} at the server side.
	 */
	getWindow() {
		return window;
	}

	/**
	 * Returns the domain of the current URL as `${protocol}://${host}`.
	 *
	 * @inheritdoc
	 * @override
	 * @method getDomain
	 * @return {string} The current domain.
	 */
	getDomain() {
		return window.location.protocol + '//' + window.location.host;
	}

	/**
	 * Returns the path part of the current URL, including the query string.
	 *
	 * @inheritdoc
	 * @override
	 * @method getPath
	 * @return {string} The path and query string parts of the current URL.
	 */
	getPath() {
		return decodeURI(window.location.pathname + window.location.search);
	}

	/**
	 * Returns the current URL.
	 *
	 * @inheritdoc
	 * @override
	 * @method getUrl
	 * @return {string} The current URL.
	 */
	getUrl() {
		return decodeURI(window.location.href);
	}

	/**
	 * Returns the {@code &lt;body&gt;} body element. The method returns
	 * {@code undefined} if invoked at the server side.
	 *
	 * @inheritdoc
	 * @override
	 * @method getBody
	 * @return {(undefined|HTMLBodyElement)} The {@code &lt;body&gt;} body
	 *         element, or {@code undefined} if invoked at the server side.
	 */
	getBody() {
		return document.body;
	}

	/**
	 * Returns the HTML element with the specified {@code id} attribute value.
	 *
	 * @inheritdoc
	 * @override
	 * @method getElementById
	 * @param {string} id The value of the {@code id} attribute to look for.
	 * @return {?HTMLElement} The element with the specified id, or {@code null}
	 *         if no such element exists.
	 */
	getElementById(id) {
		return document.getElementById(id);
	}

	/**
	 * Returns the first element matching the specified CSS 2.1 (or CSS 3 since
	 * IE9) selector.
	 *
	 * @inheritdoc
	 * @override
	 * @method querySelector
	 * @param {string} selector The CSS selector.
	 * @return {?HTMLElement} The first element matching the CSS selector or
	 *         {@code null} if no such element exists.
	 */
	querySelector(selector) {
		return document.querySelector(selector);
	}

	/**
	 * Returns a node list of all elements matching the specified CSS 2.1 (or
	 * CSS 3 since IE9) selector.
	 *
	 * @inheritdoc
	 * @override
	 * @method querySelectorAll
	 * @param {string} selector The CSS selector.
	 * @return {NodeList} A node list containing all elements matching the
	 *         specified CSS selector.
	 */
	querySelectorAll(selector) {
		return document.querySelectorAll(selector);
	}

	/**
	 * Performs a hard redirect (discarding the current JavaScript state) to the
	 * specified URL.
	 *
	 * @inheritdoc
	 * @override
	 * @method redirect
	 * @param {string} url The URL to which the browser will be redirected.
	 */
	redirect(url) {
		window.location.href = url;
	}

	/**
	 * Pushes a new state to the browser history.
	 *
	 * @inheritdoc
	 * @override
	 * @method pushStateToHistoryAPI
	 * @param {Object<string, *>} state A state object associated with the
	 *        history item, preferably representing the page state.
	 * @param {string} title The page title related to the state. Note that this
	 *        parameter is ignored by some browsers.
	 * @param {string} url The new URL at which the state is available.
	 */
	pushStateToHistoryAPI(state, title, url) {
		window.history.pushState(state, title, url);
	}

	/**
	 * Registers the provided event listener to be executed when the specified
	 * event occurrs on the specified event target.
	 *
	 * Registering the same event listener for the same event on the same event
	 * target with the same {@code useCapture} flag value repeatedly has no
	 * effect.
	 *
	 * @inheritdoc
	 * @override
	 * @method bindEventListener
	 * @param {EventTarget} eventTarget The event target.
	 * @param {string} event The name of the event.
	 * @param {function(Event)} listener The event listener.
	 * @param {boolean=} [useCapture=false] If true, the method initiates event
	 *        capture. After initiating capture, all events of the specified type
	 *        will be dispatched to the registered listener before being
	 *        dispatched to any EventTarget beneath it in the DOM tree. Events
	 *        which are bubbling upward through the tree will not trigger a
	 *        listener designated to use capture.
	 */
	bindEventListener(element, event, listener, useCapture = false) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, useCapture);
		} else {
			if (element.attachEvent) {
				element.attachEvent(`on${event}`, listener);
			}
		}
	}

	/**
	 * Unregisters the provided event listener, so it will no longer we executed
	 * when the specified event occurrs on the specified event target.
	 *
	 * The method has no effect if the provided event listener is not registered
	 * to be executed at the specified event.
	 *
	 * @inheritdoc
	 * @override
	 * @method unbindEventListener
	 * @param {EventTarget} eventTarget The event target.
	 * @param {string} event The name of the event.
	 * @param {function(Event)} listener The event listener.
	 * @param {boolean=} [useCapture=false] The {@code useCapture} flag value
	 *        that was used when the listener was registered.
	 */
	unbindEventListener(element, event, listener, useCapture = false) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, useCapture);
		} else {
			if (element.detachEvent) {
				element.detachEvent(`on${event}`, listener);
			}
		}
	}

	/**
	 * Prevents the default browser action for the provided event.
	 *
	 * @inheritdoc
	 * @override
	 * @method preventDefault
	 * @param {Event} event The event.
	 */
	preventDefault(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
}

ns.Core.Window.Client = Client;