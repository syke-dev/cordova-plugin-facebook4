var exec = require('cordova/exec')

var facebookConnectPlugin = {}

facebookConnectPlugin.getLoginStatus = function getLoginStatus (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'getLoginStatus', [])
}

facebookConnectPlugin.showDialog = function showDialog (options, s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'showDialog', [options])
}

facebookConnectPlugin.login = function login (permissions, s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'login', permissions)
}

facebookConnectPlugin.checkHasCorrectPermissions = function checkHasCorrectPermissions (permissions, s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'checkHasCorrectPermissions', permissions)
}

facebookConnectPlugin.logEvent = function logEvent (name, params, valueToSum, s, f) {
  // Prevent NSNulls getting into iOS, messes up our [command.argument count]
  if (!params && !valueToSum) {
    exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name])
  } else if (params && !valueToSum) {
    exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name, params])
  } else if (params && valueToSum) {
    exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name, params, valueToSum])
  } else {
    f('Invalid arguments')
  }
}

facebookConnectPlugin.logPurchase = function logPurchase (value, currency, s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'logPurchase', [value, currency])
}

facebookConnectPlugin.getAccessToken = function getAccessToken (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'getAccessToken', [])
}

facebookConnectPlugin.logout = function logout (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'logout', [])
}

facebookConnectPlugin.api = function api (graphPath, permissions, s, f) {
  permissions = permissions || []
  exec(s, f, 'FacebookConnectPlugin', 'graphApi', [graphPath, permissions])
}

/*
    This function will do its best to provide the same logic as the Facebook Javascript SDK version,
    however it has many quirks not specified in the documentation.

    The signature in the docs is FB.api(path, method, params, callback)
    where path is the only required parameter and must be a string.

    method will default to 'get'

    The rest of the parameters can be in any order and are all optional.
    
    Also, any parameter besides path can be specified as many times as possible, 
    but the sdk will choose the last one in the arguments list.

    Also, if parameters are specified in the query string in path, but there is also a params object
    passed in, the parameters in the params object will be used.
*/
facebookConnectPlugin.api_v2 = function api () {
  
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift()

  if (typeof path !== 'string') {
    throw 'Invalid path'
  }

  var method
  var params
  var callback
  
  // See function comments as to why this is
  for (i = 0; i < args.length; i++) {
    var arg = args[i]
    
    if (typeof arg === 'string') method = arg
    if (typeof arg === 'object') params = arg
    if (typeof arg === 'array') permissions = arg
    if (typeof arg === 'function') callback = arg
  }
  
  // Inputs
  console.log("api path: " + JSON.stringify(path))
  console.log("api method: " + JSON.stringify(method))
  console.log("api params: " + JSON.stringify(params))
  
  // To match JS SDK, any error in native should make us throw an exception
  // The provided callback is only called when a graph request is succesful
  var failure = function (err) { 
    throw err
  }
  
  // Just pass path as is. Don't try to parse query string parameters.
  // Let the android/ios sdk merge in parameters in the path and parameters in the params object for us.
  exec(callback, failure, 'FacebookConnectPlugin', 'graphApi', [path, method, params])
    
};

facebookConnectPlugin.exec = exec;

facebookConnectPlugin.appInvite = function appLinks (options, s, f) {
  options = options || {}
  exec(s, f, 'FacebookConnectPlugin', 'appInvite', [options])
}

facebookConnectPlugin.getDeferredApplink = function (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'getDeferredApplink', [])
}

facebookConnectPlugin.activateApp = function (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'activateApp', [])
}

facebookConnectPlugin.getDeferredApplink = function (s, f) {
  exec(s, f, 'FacebookConnectPlugin', 'getDeferredApplink', [])
}

module.exports = facebookConnectPlugin