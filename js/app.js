(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports;}
var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports;}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter});}};__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if((mode&4)&&typeof value==='object'&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,'default',{enumerable:true,value:value});if(mode&2&&typeof value!='string')for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key];}.bind(null,key));return ns;};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module['default'];}:function getModuleExports(){return module;};__webpack_require__.d(getter,'a',getter);return getter;};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};__webpack_require__.p="/";return __webpack_require__(__webpack_require__.s=0);})
({"./node_modules/axios/index.js":/*!*************************************!*\
!*** ./node_modules/axios/index.js ***!
\*************************************//*!no static exports found*/(function(module,exports,__webpack_require__){module.exports=__webpack_require__(/*!./lib/axios*/"./node_modules/axios/lib/axios.js");}),"./node_modules/axios/lib/adapters/xhr.js":/*!************************************************!*\
!*** ./node_modules/axios/lib/adapters/xhr.js ***!
\************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");var settle=__webpack_require__(/*!./../core/settle*/"./node_modules/axios/lib/core/settle.js");var cookies=__webpack_require__(/*!./../helpers/cookies*/"./node_modules/axios/lib/helpers/cookies.js");var buildURL=__webpack_require__(/*!./../helpers/buildURL*/"./node_modules/axios/lib/helpers/buildURL.js");var buildFullPath=__webpack_require__(/*!../core/buildFullPath*/"./node_modules/axios/lib/core/buildFullPath.js");var parseHeaders=__webpack_require__(/*!./../helpers/parseHeaders*/"./node_modules/axios/lib/helpers/parseHeaders.js");var isURLSameOrigin=__webpack_require__(/*!./../helpers/isURLSameOrigin*/"./node_modules/axios/lib/helpers/isURLSameOrigin.js");var createError=__webpack_require__(/*!../core/createError*/"./node_modules/axios/lib/core/createError.js");module.exports=function xhrAdapter(config){return new Promise(function dispatchXhrRequest(resolve,reject){var requestData=config.data;var requestHeaders=config.headers;var responseType=config.responseType;if(utils.isFormData(requestData)){delete requestHeaders['Content-Type'];}
var request=new XMLHttpRequest();if(config.auth){var username=config.auth.username||'';var password=config.auth.password?unescape(encodeURIComponent(config.auth.password)):'';requestHeaders.Authorization='Basic '+btoa(username+':'+password);}
var fullPath=buildFullPath(config.baseURL,config.url);request.open(config.method.toUpperCase(),buildURL(fullPath,config.params,config.paramsSerializer),true);request.timeout=config.timeout;function onloadend(){if(!request){return;}
var responseHeaders='getAllResponseHeaders'in request?parseHeaders(request.getAllResponseHeaders()):null;var responseData=!responseType||responseType==='text'||responseType==='json'?request.responseText:request.response;var response={data:responseData,status:request.status,statusText:request.statusText,headers:responseHeaders,config:config,request:request};settle(resolve,reject,response);request=null;}
if('onloadend'in request){request.onloadend=onloadend;}else{request.onreadystatechange=function handleLoad(){if(!request||request.readyState!==4){return;}
if(request.status===0&&!(request.responseURL&&request.responseURL.indexOf('file:')===0)){return;}
setTimeout(onloadend);};}
request.onabort=function handleAbort(){if(!request){return;}
reject(createError('Request aborted',config,'ECONNABORTED',request));request=null;};request.onerror=function handleError(){reject(createError('Network Error',config,null,request));request=null;};request.ontimeout=function handleTimeout(){var timeoutErrorMessage='timeout of '+config.timeout+'ms exceeded';if(config.timeoutErrorMessage){timeoutErrorMessage=config.timeoutErrorMessage;}
reject(createError(timeoutErrorMessage,config,config.transitional&&config.transitional.clarifyTimeoutError?'ETIMEDOUT':'ECONNABORTED',request));request=null;};if(utils.isStandardBrowserEnv()){var xsrfValue=(config.withCredentials||isURLSameOrigin(fullPath))&&config.xsrfCookieName?cookies.read(config.xsrfCookieName):undefined;if(xsrfValue){requestHeaders[config.xsrfHeaderName]=xsrfValue;}}
if('setRequestHeader'in request){utils.forEach(requestHeaders,function setRequestHeader(val,key){if(typeof requestData==='undefined'&&key.toLowerCase()==='content-type'){delete requestHeaders[key];}else{request.setRequestHeader(key,val);}});}
if(!utils.isUndefined(config.withCredentials)){request.withCredentials=!!config.withCredentials;}
if(responseType&&responseType!=='json'){request.responseType=config.responseType;}
if(typeof config.onDownloadProgress==='function'){request.addEventListener('progress',config.onDownloadProgress);}
if(typeof config.onUploadProgress==='function'&&request.upload){request.upload.addEventListener('progress',config.onUploadProgress);}
if(config.cancelToken){config.cancelToken.promise.then(function onCanceled(cancel){if(!request){return;}
request.abort();reject(cancel);request=null;});}
if(!requestData){requestData=null;}
request.send(requestData);});};}),"./node_modules/axios/lib/axios.js":/*!*****************************************!*\
!*** ./node_modules/axios/lib/axios.js ***!
\*****************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./utils*/"./node_modules/axios/lib/utils.js");var bind=__webpack_require__(/*!./helpers/bind*/"./node_modules/axios/lib/helpers/bind.js");var Axios=__webpack_require__(/*!./core/Axios*/"./node_modules/axios/lib/core/Axios.js");var mergeConfig=__webpack_require__(/*!./core/mergeConfig*/"./node_modules/axios/lib/core/mergeConfig.js");var defaults=__webpack_require__(/*!./defaults*/"./node_modules/axios/lib/defaults.js");function createInstance(defaultConfig){var context=new Axios(defaultConfig);var instance=bind(Axios.prototype.request,context);utils.extend(instance,Axios.prototype,context);utils.extend(instance,context);return instance;}
var axios=createInstance(defaults);axios.Axios=Axios;axios.create=function create(instanceConfig){return createInstance(mergeConfig(axios.defaults,instanceConfig));};axios.Cancel=__webpack_require__(/*!./cancel/Cancel*/"./node_modules/axios/lib/cancel/Cancel.js");axios.CancelToken=__webpack_require__(/*!./cancel/CancelToken*/"./node_modules/axios/lib/cancel/CancelToken.js");axios.isCancel=__webpack_require__(/*!./cancel/isCancel*/"./node_modules/axios/lib/cancel/isCancel.js");axios.all=function all(promises){return Promise.all(promises);};axios.spread=__webpack_require__(/*!./helpers/spread*/"./node_modules/axios/lib/helpers/spread.js");axios.isAxiosError=__webpack_require__(/*!./helpers/isAxiosError*/"./node_modules/axios/lib/helpers/isAxiosError.js");module.exports=axios;module.exports.default=axios;}),"./node_modules/axios/lib/cancel/Cancel.js":/*!*************************************************!*\
!*** ./node_modules/axios/lib/cancel/Cancel.js ***!
\*************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";function Cancel(message){this.message=message;}
Cancel.prototype.toString=function toString(){return 'Cancel'+(this.message?': '+this.message:'');};Cancel.prototype.__CANCEL__=true;module.exports=Cancel;}),"./node_modules/axios/lib/cancel/CancelToken.js":/*!******************************************************!*\
!*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
\******************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var Cancel=__webpack_require__(/*!./Cancel*/"./node_modules/axios/lib/cancel/Cancel.js");function CancelToken(executor){if(typeof executor!=='function'){throw new TypeError('executor must be a function.');}
var resolvePromise;this.promise=new Promise(function promiseExecutor(resolve){resolvePromise=resolve;});var token=this;executor(function cancel(message){if(token.reason){return;}
token.reason=new Cancel(message);resolvePromise(token.reason);});}
CancelToken.prototype.throwIfRequested=function throwIfRequested(){if(this.reason){throw this.reason;}};CancelToken.source=function source(){var cancel;var token=new CancelToken(function executor(c){cancel=c;});return{token:token,cancel:cancel};};module.exports=CancelToken;}),"./node_modules/axios/lib/cancel/isCancel.js":/*!***************************************************!*\
!*** ./node_modules/axios/lib/cancel/isCancel.js ***!
\***************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function isCancel(value){return!!(value&&value.__CANCEL__);};}),"./node_modules/axios/lib/core/Axios.js":/*!**********************************************!*\
!*** ./node_modules/axios/lib/core/Axios.js ***!
\**********************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");var buildURL=__webpack_require__(/*!../helpers/buildURL*/"./node_modules/axios/lib/helpers/buildURL.js");var InterceptorManager=__webpack_require__(/*!./InterceptorManager*/"./node_modules/axios/lib/core/InterceptorManager.js");var dispatchRequest=__webpack_require__(/*!./dispatchRequest*/"./node_modules/axios/lib/core/dispatchRequest.js");var mergeConfig=__webpack_require__(/*!./mergeConfig*/"./node_modules/axios/lib/core/mergeConfig.js");var validator=__webpack_require__(/*!../helpers/validator*/"./node_modules/axios/lib/helpers/validator.js");var validators=validator.validators;function Axios(instanceConfig){this.defaults=instanceConfig;this.interceptors={request:new InterceptorManager(),response:new InterceptorManager()};}
Axios.prototype.request=function request(config){if(typeof config==='string'){config=arguments[1]||{};config.url=arguments[0];}else{config=config||{};}
config=mergeConfig(this.defaults,config);if(config.method){config.method=config.method.toLowerCase();}else if(this.defaults.method){config.method=this.defaults.method.toLowerCase();}else{config.method='get';}
var transitional=config.transitional;if(transitional!==undefined){validator.assertOptions(transitional,{silentJSONParsing:validators.transitional(validators.boolean,'1.0.0'),forcedJSONParsing:validators.transitional(validators.boolean,'1.0.0'),clarifyTimeoutError:validators.transitional(validators.boolean,'1.0.0')},false);}
var requestInterceptorChain=[];var synchronousRequestInterceptors=true;this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor){if(typeof interceptor.runWhen==='function'&&interceptor.runWhen(config)===false){return;}
synchronousRequestInterceptors=synchronousRequestInterceptors&&interceptor.synchronous;requestInterceptorChain.unshift(interceptor.fulfilled,interceptor.rejected);});var responseInterceptorChain=[];this.interceptors.response.forEach(function pushResponseInterceptors(interceptor){responseInterceptorChain.push(interceptor.fulfilled,interceptor.rejected);});var promise;if(!synchronousRequestInterceptors){var chain=[dispatchRequest,undefined];Array.prototype.unshift.apply(chain,requestInterceptorChain);chain=chain.concat(responseInterceptorChain);promise=Promise.resolve(config);while(chain.length){promise=promise.then(chain.shift(),chain.shift());}
return promise;}
var newConfig=config;while(requestInterceptorChain.length){var onFulfilled=requestInterceptorChain.shift();var onRejected=requestInterceptorChain.shift();try{newConfig=onFulfilled(newConfig);}catch(error){onRejected(error);break;}}
try{promise=dispatchRequest(newConfig);}catch(error){return Promise.reject(error);}
while(responseInterceptorChain.length){promise=promise.then(responseInterceptorChain.shift(),responseInterceptorChain.shift());}
return promise;};Axios.prototype.getUri=function getUri(config){config=mergeConfig(this.defaults,config);return buildURL(config.url,config.params,config.paramsSerializer).replace(/^\?/,'');};utils.forEach(['delete','get','head','options'],function forEachMethodNoData(method){Axios.prototype[method]=function(url,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:(config||{}).data}));};});utils.forEach(['post','put','patch'],function forEachMethodWithData(method){Axios.prototype[method]=function(url,data,config){return this.request(mergeConfig(config||{},{method:method,url:url,data:data}));};});module.exports=Axios;}),"./node_modules/axios/lib/core/InterceptorManager.js":/*!***********************************************************!*\
!*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
\***********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");function InterceptorManager(){this.handlers=[];}
InterceptorManager.prototype.use=function use(fulfilled,rejected,options){this.handlers.push({fulfilled:fulfilled,rejected:rejected,synchronous:options?options.synchronous:false,runWhen:options?options.runWhen:null});return this.handlers.length-1;};InterceptorManager.prototype.eject=function eject(id){if(this.handlers[id]){this.handlers[id]=null;}};InterceptorManager.prototype.forEach=function forEach(fn){utils.forEach(this.handlers,function forEachHandler(h){if(h!==null){fn(h);}});};module.exports=InterceptorManager;}),"./node_modules/axios/lib/core/buildFullPath.js":/*!******************************************************!*\
!*** ./node_modules/axios/lib/core/buildFullPath.js ***!
\******************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var isAbsoluteURL=__webpack_require__(/*!../helpers/isAbsoluteURL*/"./node_modules/axios/lib/helpers/isAbsoluteURL.js");var combineURLs=__webpack_require__(/*!../helpers/combineURLs*/"./node_modules/axios/lib/helpers/combineURLs.js");module.exports=function buildFullPath(baseURL,requestedURL){if(baseURL&&!isAbsoluteURL(requestedURL)){return combineURLs(baseURL,requestedURL);}
return requestedURL;};}),"./node_modules/axios/lib/core/createError.js":/*!****************************************************!*\
!*** ./node_modules/axios/lib/core/createError.js ***!
\****************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var enhanceError=__webpack_require__(/*!./enhanceError*/"./node_modules/axios/lib/core/enhanceError.js");module.exports=function createError(message,config,code,request,response){var error=new Error(message);return enhanceError(error,config,code,request,response);};}),"./node_modules/axios/lib/core/dispatchRequest.js":/*!********************************************************!*\
!*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
\********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");var transformData=__webpack_require__(/*!./transformData*/"./node_modules/axios/lib/core/transformData.js");var isCancel=__webpack_require__(/*!../cancel/isCancel*/"./node_modules/axios/lib/cancel/isCancel.js");var defaults=__webpack_require__(/*!../defaults*/"./node_modules/axios/lib/defaults.js");function throwIfCancellationRequested(config){if(config.cancelToken){config.cancelToken.throwIfRequested();}}
module.exports=function dispatchRequest(config){throwIfCancellationRequested(config);config.headers=config.headers||{};config.data=transformData.call(config,config.data,config.headers,config.transformRequest);config.headers=utils.merge(config.headers.common||{},config.headers[config.method]||{},config.headers);utils.forEach(['delete','get','head','post','put','patch','common'],function cleanHeaderConfig(method){delete config.headers[method];});var adapter=config.adapter||defaults.adapter;return adapter(config).then(function onAdapterResolution(response){throwIfCancellationRequested(config);response.data=transformData.call(config,response.data,response.headers,config.transformResponse);return response;},function onAdapterRejection(reason){if(!isCancel(reason)){throwIfCancellationRequested(config);if(reason&&reason.response){reason.response.data=transformData.call(config,reason.response.data,reason.response.headers,config.transformResponse);}}
return Promise.reject(reason);});};}),"./node_modules/axios/lib/core/enhanceError.js":/*!*****************************************************!*\
!*** ./node_modules/axios/lib/core/enhanceError.js ***!
\*****************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function enhanceError(error,config,code,request,response){error.config=config;if(code){error.code=code;}
error.request=request;error.response=response;error.isAxiosError=true;error.toJSON=function toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code};};return error;};}),"./node_modules/axios/lib/core/mergeConfig.js":/*!****************************************************!*\
!*** ./node_modules/axios/lib/core/mergeConfig.js ***!
\****************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!../utils*/"./node_modules/axios/lib/utils.js");module.exports=function mergeConfig(config1,config2){config2=config2||{};var config={};var valueFromConfig2Keys=['url','method','data'];var mergeDeepPropertiesKeys=['headers','auth','proxy','params'];var defaultToConfig2Keys=['baseURL','transformRequest','transformResponse','paramsSerializer','timeout','timeoutMessage','withCredentials','adapter','responseType','xsrfCookieName','xsrfHeaderName','onUploadProgress','onDownloadProgress','decompress','maxContentLength','maxBodyLength','maxRedirects','transport','httpAgent','httpsAgent','cancelToken','socketPath','responseEncoding'];var directMergeKeys=['validateStatus'];function getMergedValue(target,source){if(utils.isPlainObject(target)&&utils.isPlainObject(source)){return utils.merge(target,source);}else if(utils.isPlainObject(source)){return utils.merge({},source);}else if(utils.isArray(source)){return source.slice();}
return source;}
function mergeDeepProperties(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(config1[prop],config2[prop]);}else if(!utils.isUndefined(config1[prop])){config[prop]=getMergedValue(undefined,config1[prop]);}}
utils.forEach(valueFromConfig2Keys,function valueFromConfig2(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(undefined,config2[prop]);}});utils.forEach(mergeDeepPropertiesKeys,mergeDeepProperties);utils.forEach(defaultToConfig2Keys,function defaultToConfig2(prop){if(!utils.isUndefined(config2[prop])){config[prop]=getMergedValue(undefined,config2[prop]);}else if(!utils.isUndefined(config1[prop])){config[prop]=getMergedValue(undefined,config1[prop]);}});utils.forEach(directMergeKeys,function merge(prop){if(prop in config2){config[prop]=getMergedValue(config1[prop],config2[prop]);}else if(prop in config1){config[prop]=getMergedValue(undefined,config1[prop]);}});var axiosKeys=valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);var otherKeys=Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key){return axiosKeys.indexOf(key)===-1;});utils.forEach(otherKeys,mergeDeepProperties);return config;};}),"./node_modules/axios/lib/core/settle.js":/*!***********************************************!*\
!*** ./node_modules/axios/lib/core/settle.js ***!
\***********************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var createError=__webpack_require__(/*!./createError*/"./node_modules/axios/lib/core/createError.js");module.exports=function settle(resolve,reject,response){var validateStatus=response.config.validateStatus;if(!response.status||!validateStatus||validateStatus(response.status)){resolve(response);}else{reject(createError('Request failed with status code '+response.status,response.config,null,response.request,response));}};}),"./node_modules/axios/lib/core/transformData.js":/*!******************************************************!*\
!*** ./node_modules/axios/lib/core/transformData.js ***!
\******************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");var defaults=__webpack_require__(/*!./../defaults*/"./node_modules/axios/lib/defaults.js");module.exports=function transformData(data,headers,fns){var context=this||defaults;utils.forEach(fns,function transform(fn){data=fn.call(context,data,headers);});return data;};}),"./node_modules/axios/lib/defaults.js":/*!********************************************!*\
!*** ./node_modules/axios/lib/defaults.js ***!
\********************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";(function(process){var utils=__webpack_require__(/*!./utils*/"./node_modules/axios/lib/utils.js");var normalizeHeaderName=__webpack_require__(/*!./helpers/normalizeHeaderName*/"./node_modules/axios/lib/helpers/normalizeHeaderName.js");var enhanceError=__webpack_require__(/*!./core/enhanceError*/"./node_modules/axios/lib/core/enhanceError.js");var DEFAULT_CONTENT_TYPE={'Content-Type':'application/x-www-form-urlencoded'};function setContentTypeIfUnset(headers,value){if(!utils.isUndefined(headers)&&utils.isUndefined(headers['Content-Type'])){headers['Content-Type']=value;}}
function getDefaultAdapter(){var adapter;if(typeof XMLHttpRequest!=='undefined'){adapter=__webpack_require__(/*!./adapters/xhr*/"./node_modules/axios/lib/adapters/xhr.js");}else if(typeof process!=='undefined'&&Object.prototype.toString.call(process)==='[object process]'){adapter=__webpack_require__(/*!./adapters/http*/"./node_modules/axios/lib/adapters/xhr.js");}
return adapter;}
function stringifySafely(rawValue,parser,encoder){if(utils.isString(rawValue)){try{(parser||JSON.parse)(rawValue);return utils.trim(rawValue);}catch(e){if(e.name!=='SyntaxError'){throw e;}}}
return(encoder||JSON.stringify)(rawValue);}
var defaults={transitional:{silentJSONParsing:true,forcedJSONParsing:true,clarifyTimeoutError:false},adapter:getDefaultAdapter(),transformRequest:[function transformRequest(data,headers){normalizeHeaderName(headers,'Accept');normalizeHeaderName(headers,'Content-Type');if(utils.isFormData(data)||utils.isArrayBuffer(data)||utils.isBuffer(data)||utils.isStream(data)||utils.isFile(data)||utils.isBlob(data)){return data;}
if(utils.isArrayBufferView(data)){return data.buffer;}
if(utils.isURLSearchParams(data)){setContentTypeIfUnset(headers,'application/x-www-form-urlencoded;charset=utf-8');return data.toString();}
if(utils.isObject(data)||(headers&&headers['Content-Type']==='application/json')){setContentTypeIfUnset(headers,'application/json');return stringifySafely(data);}
return data;}],transformResponse:[function transformResponse(data){var transitional=this.transitional;var silentJSONParsing=transitional&&transitional.silentJSONParsing;var forcedJSONParsing=transitional&&transitional.forcedJSONParsing;var strictJSONParsing=!silentJSONParsing&&this.responseType==='json';if(strictJSONParsing||(forcedJSONParsing&&utils.isString(data)&&data.length)){try{return JSON.parse(data);}catch(e){if(strictJSONParsing){if(e.name==='SyntaxError'){throw enhanceError(e,this,'E_JSON_PARSE');}
throw e;}}}
return data;}],timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,maxBodyLength:-1,validateStatus:function validateStatus(status){return status>=200&&status<300;}};defaults.headers={common:{'Accept':'application/json, text/plain, */*'}};utils.forEach(['delete','get','head'],function forEachMethodNoData(method){defaults.headers[method]={};});utils.forEach(['post','put','patch'],function forEachMethodWithData(method){defaults.headers[method]=utils.merge(DEFAULT_CONTENT_TYPE);});module.exports=defaults;}.call(this,__webpack_require__(/*!./../../process/browser.js*/"./node_modules/process/browser.js")))}),"./node_modules/axios/lib/helpers/bind.js":/*!************************************************!*\
!*** ./node_modules/axios/lib/helpers/bind.js ***!
\************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function bind(fn,thisArg){return function wrap(){var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}
return fn.apply(thisArg,args);};};}),"./node_modules/axios/lib/helpers/buildURL.js":/*!****************************************************!*\
!*** ./node_modules/axios/lib/helpers/buildURL.js ***!
\****************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");function encode(val){return encodeURIComponent(val).replace(/%3A/gi,':').replace(/%24/g,'$').replace(/%2C/gi,',').replace(/%20/g,'+').replace(/%5B/gi,'[').replace(/%5D/gi,']');}
module.exports=function buildURL(url,params,paramsSerializer){if(!params){return url;}
var serializedParams;if(paramsSerializer){serializedParams=paramsSerializer(params);}else if(utils.isURLSearchParams(params)){serializedParams=params.toString();}else{var parts=[];utils.forEach(params,function serialize(val,key){if(val===null||typeof val==='undefined'){return;}
if(utils.isArray(val)){key=key+'[]';}else{val=[val];}
utils.forEach(val,function parseValue(v){if(utils.isDate(v)){v=v.toISOString();}else if(utils.isObject(v)){v=JSON.stringify(v);}
parts.push(encode(key)+'='+encode(v));});});serializedParams=parts.join('&');}
if(serializedParams){var hashmarkIndex=url.indexOf('#');if(hashmarkIndex!==-1){url=url.slice(0,hashmarkIndex);}
url+=(url.indexOf('?')===-1?'?':'&')+serializedParams;}
return url;};}),"./node_modules/axios/lib/helpers/combineURLs.js":/*!*******************************************************!*\
!*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
\*******************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function combineURLs(baseURL,relativeURL){return relativeURL?baseURL.replace(/\/+$/,'')+'/'+relativeURL.replace(/^\/+/,''):baseURL;};}),"./node_modules/axios/lib/helpers/cookies.js":/*!***************************************************!*\
!*** ./node_modules/axios/lib/helpers/cookies.js ***!
\***************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");module.exports=(utils.isStandardBrowserEnv()?(function standardBrowserEnv(){return{write:function write(name,value,expires,path,domain,secure){var cookie=[];cookie.push(name+'='+encodeURIComponent(value));if(utils.isNumber(expires)){cookie.push('expires='+new Date(expires).toGMTString());}
if(utils.isString(path)){cookie.push('path='+path);}
if(utils.isString(domain)){cookie.push('domain='+domain);}
if(secure===true){cookie.push('secure');}
document.cookie=cookie.join('; ');},read:function read(name){var match=document.cookie.match(new RegExp('(^|;\\s*)('+name+')=([^;]*)'));return(match?decodeURIComponent(match[3]):null);},remove:function remove(name){this.write(name,'',Date.now()-86400000);}};})():(function nonStandardBrowserEnv(){return{write:function write(){},read:function read(){return null;},remove:function remove(){}};})());}),"./node_modules/axios/lib/helpers/isAbsoluteURL.js":/*!*********************************************************!*\
!*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
\*********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function isAbsoluteURL(url){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);};}),"./node_modules/axios/lib/helpers/isAxiosError.js":/*!********************************************************!*\
!*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
\********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function isAxiosError(payload){return(typeof payload==='object')&&(payload.isAxiosError===true);};}),"./node_modules/axios/lib/helpers/isURLSameOrigin.js":/*!***********************************************************!*\
!*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
\***********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");module.exports=(utils.isStandardBrowserEnv()?(function standardBrowserEnv(){var msie=/(msie|trident)/i.test(navigator.userAgent);var urlParsingNode=document.createElement('a');var originURL;function resolveURL(url){var href=url;if(msie){urlParsingNode.setAttribute('href',href);href=urlParsingNode.href;}
urlParsingNode.setAttribute('href',href);return{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,''):'',host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,''):'',hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,''):'',hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:(urlParsingNode.pathname.charAt(0)==='/')?urlParsingNode.pathname:'/'+urlParsingNode.pathname};}
originURL=resolveURL(window.location.href);return function isURLSameOrigin(requestURL){var parsed=(utils.isString(requestURL))?resolveURL(requestURL):requestURL;return(parsed.protocol===originURL.protocol&&parsed.host===originURL.host);};})():(function nonStandardBrowserEnv(){return function isURLSameOrigin(){return true;};})());}),"./node_modules/axios/lib/helpers/normalizeHeaderName.js":/*!***************************************************************!*\
!*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
\***************************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!../utils*/"./node_modules/axios/lib/utils.js");module.exports=function normalizeHeaderName(headers,normalizedName){utils.forEach(headers,function processHeader(value,name){if(name!==normalizedName&&name.toUpperCase()===normalizedName.toUpperCase()){headers[normalizedName]=value;delete headers[name];}});};}),"./node_modules/axios/lib/helpers/parseHeaders.js":/*!********************************************************!*\
!*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
\********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var utils=__webpack_require__(/*!./../utils*/"./node_modules/axios/lib/utils.js");var ignoreDuplicateOf=['age','authorization','content-length','content-type','etag','expires','from','host','if-modified-since','if-unmodified-since','last-modified','location','max-forwards','proxy-authorization','referer','retry-after','user-agent'];module.exports=function parseHeaders(headers){var parsed={};var key;var val;var i;if(!headers){return parsed;}
utils.forEach(headers.split('\n'),function parser(line){i=line.indexOf(':');key=utils.trim(line.substr(0,i)).toLowerCase();val=utils.trim(line.substr(i+1));if(key){if(parsed[key]&&ignoreDuplicateOf.indexOf(key)>=0){return;}
if(key==='set-cookie'){parsed[key]=(parsed[key]?parsed[key]:[]).concat([val]);}else{parsed[key]=parsed[key]?parsed[key]+', '+val:val;}}});return parsed;};}),"./node_modules/axios/lib/helpers/spread.js":/*!**************************************************!*\
!*** ./node_modules/axios/lib/helpers/spread.js ***!
\**************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";module.exports=function spread(callback){return function wrap(arr){return callback.apply(null,arr);};};}),"./node_modules/axios/lib/helpers/validator.js":/*!*****************************************************!*\
!*** ./node_modules/axios/lib/helpers/validator.js ***!
\*****************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var pkg=__webpack_require__(/*!./../../package.json*/"./node_modules/axios/package.json");var validators={};['object','boolean','number','function','string','symbol'].forEach(function(type,i){validators[type]=function validator(thing){return typeof thing===type||'a'+(i<1?'n ':' ')+type;};});var deprecatedWarnings={};var currentVerArr=pkg.version.split('.');function isOlderVersion(version,thanVersion){var pkgVersionArr=thanVersion?thanVersion.split('.'):currentVerArr;var destVer=version.split('.');for(var i=0;i<3;i++){if(pkgVersionArr[i]>destVer[i]){return true;}else if(pkgVersionArr[i]<destVer[i]){return false;}}
return false;}
validators.transitional=function transitional(validator,version,message){var isDeprecated=version&&isOlderVersion(version);function formatMessage(opt,desc){return '[Axios v'+pkg.version+'] Transitional option \''+opt+'\''+desc+(message?'. '+message:'');}
return function(value,opt,opts){if(validator===false){throw new Error(formatMessage(opt,' has been removed in '+version));}
if(isDeprecated&&!deprecatedWarnings[opt]){deprecatedWarnings[opt]=true;console.warn(formatMessage(opt,' has been deprecated since v'+version+' and will be removed in the near future'));}
return validator?validator(value,opt,opts):true;};};function assertOptions(options,schema,allowUnknown){if(typeof options!=='object'){throw new TypeError('options must be an object');}
var keys=Object.keys(options);var i=keys.length;while(i-->0){var opt=keys[i];var validator=schema[opt];if(validator){var value=options[opt];var result=value===undefined||validator(value,opt,options);if(result!==true){throw new TypeError('option '+opt+' must be '+result);}
continue;}
if(allowUnknown!==true){throw Error('Unknown option '+opt);}}}
module.exports={isOlderVersion:isOlderVersion,assertOptions:assertOptions,validators:validators};}),"./node_modules/axios/lib/utils.js":/*!*****************************************!*\
!*** ./node_modules/axios/lib/utils.js ***!
\*****************************************//*!no static exports found*/(function(module,exports,__webpack_require__){"use strict";var bind=__webpack_require__(/*!./helpers/bind*/"./node_modules/axios/lib/helpers/bind.js");var toString=Object.prototype.toString;function isArray(val){return toString.call(val)==='[object Array]';}
function isUndefined(val){return typeof val==='undefined';}
function isBuffer(val){return val!==null&&!isUndefined(val)&&val.constructor!==null&&!isUndefined(val.constructor)&&typeof val.constructor.isBuffer==='function'&&val.constructor.isBuffer(val);}
function isArrayBuffer(val){return toString.call(val)==='[object ArrayBuffer]';}
function isFormData(val){return(typeof FormData!=='undefined')&&(val instanceof FormData);}
function isArrayBufferView(val){var result;if((typeof ArrayBuffer!=='undefined')&&(ArrayBuffer.isView)){result=ArrayBuffer.isView(val);}else{result=(val)&&(val.buffer)&&(val.buffer instanceof ArrayBuffer);}
return result;}
function isString(val){return typeof val==='string';}
function isNumber(val){return typeof val==='number';}
function isObject(val){return val!==null&&typeof val==='object';}
function isPlainObject(val){if(toString.call(val)!=='[object Object]'){return false;}
var prototype=Object.getPrototypeOf(val);return prototype===null||prototype===Object.prototype;}
function isDate(val){return toString.call(val)==='[object Date]';}
function isFile(val){return toString.call(val)==='[object File]';}
function isBlob(val){return toString.call(val)==='[object Blob]';}
function isFunction(val){return toString.call(val)==='[object Function]';}
function isStream(val){return isObject(val)&&isFunction(val.pipe);}
function isURLSearchParams(val){return typeof URLSearchParams!=='undefined'&&val instanceof URLSearchParams;}
function trim(str){return str.trim?str.trim():str.replace(/^\s+|\s+$/g,'');}
function isStandardBrowserEnv(){if(typeof navigator!=='undefined'&&(navigator.product==='ReactNative'||navigator.product==='NativeScript'||navigator.product==='NS')){return false;}
return(typeof window!=='undefined'&&typeof document!=='undefined');}
function forEach(obj,fn){if(obj===null||typeof obj==='undefined'){return;}
if(typeof obj!=='object'){obj=[obj];}
if(isArray(obj)){for(var i=0,l=obj.length;i<l;i++){fn.call(null,obj[i],i,obj);}}else{for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){fn.call(null,obj[key],key,obj);}}}}
function merge(){var result={};function assignValue(val,key){if(isPlainObject(result[key])&&isPlainObject(val)){result[key]=merge(result[key],val);}else if(isPlainObject(val)){result[key]=merge({},val);}else if(isArray(val)){result[key]=val.slice();}else{result[key]=val;}}
for(var i=0,l=arguments.length;i<l;i++){forEach(arguments[i],assignValue);}
return result;}
function extend(a,b,thisArg){forEach(b,function assignValue(val,key){if(thisArg&&typeof val==='function'){a[key]=bind(val,thisArg);}else{a[key]=val;}});return a;}
function stripBOM(content){if(content.charCodeAt(0)===0xFEFF){content=content.slice(1);}
return content;}
module.exports={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isObject:isObject,isPlainObject:isPlainObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isStandardBrowserEnv:isStandardBrowserEnv,forEach:forEach,merge:merge,extend:extend,trim:trim,stripBOM:stripBOM};}),"./node_modules/axios/package.json":/*!*****************************************!*\
!*** ./node_modules/axios/package.json ***!
\*****************************************//*!exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, bundlesize, dependencies, deprecated, description, devDependencies, homepage, jsdelivr, keywords, license, main, name, repository, scripts, typings, unpkg, version, default*/(function(module){module.exports=JSON.parse("{\"_from\":\"axios@0.21.4\",\"_id\":\"axios@0.21.4\",\"_inBundle\":false,\"_integrity\":\"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"axios@0.21.4\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"0.21.4\",\"saveSpec\":null,\"fetchSpec\":\"0.21.4\"},\"_requiredBy\":[\"#DEV:/\",\"#USER\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz\",\"_shasum\":\"c67b90dc0568e5c1cf2b0b858c43ba28e2eda575\",\"_spec\":\"axios@0.21.4\",\"_where\":\"/home/berkan/domains/hwidspoofer.com\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundleDependencies\":false,\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"^1.14.0\"},\"deprecated\":false,\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.3.0\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^23.0.0\",\"grunt-karma\":\"^4.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^4.0.2\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^6.3.2\",\"karma-chrome-launcher\":\"^3.1.0\",\"karma-firefox-launcher\":\"^2.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^4.3.6\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.8\",\"karma-webpack\":\"^4.0.2\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^8.2.1\",\"sinon\":\"^4.5.0\",\"terser-webpack-plugin\":\"^4.2.3\",\"typescript\":\"^4.0.5\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^4.44.2\",\"webpack-dev-server\":\"^3.11.0\"},\"homepage\":\"https://axios-http.com\",\"jsdelivr\":\"dist/axios.min.js\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"unpkg\":\"dist/axios.min.js\",\"version\":\"0.21.4\"}");}),"./node_modules/laravel-echo/dist/echo.js":/*!************************************************!*\
!*** ./node_modules/laravel-echo/dist/echo.js ***!
\************************************************//*!exports provided: default*/(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"default",function(){return Echo;});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}
function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}
function _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}
return target;};return _extends.apply(this,arguments);}
function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}
subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});Object.defineProperty(subClass,"prototype",{writable:false});if(superClass)_setPrototypeOf(subClass,superClass);}
function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}
function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}
function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}
function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}
return self;}
function _possibleConstructorReturn(self,call){if(call&&(typeof call==="object"||typeof call==="function")){return call;}else if(call!==void 0){throw new TypeError("Derived constructors may only return object or undefined");}
return _assertThisInitialized(self);}
function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}
return _possibleConstructorReturn(this,result);};}
var Connector=function(){function Connector(options){_classCallCheck(this,Connector);this._defaultOptions={auth:{headers:{}},authEndpoint:'/broadcasting/auth',broadcaster:'pusher',csrfToken:null,host:null,key:null,namespace:'App.Events'};this.setOptions(options);this.connect();}
_createClass(Connector,[{key:"setOptions",value:function setOptions(options){this.options=_extends(this._defaultOptions,options);if(this.csrfToken()){this.options.auth.headers['X-CSRF-TOKEN']=this.csrfToken();}
return options;}},{key:"csrfToken",value:function csrfToken(){var selector;if(typeof window!=='undefined'&&window['Laravel']&&window['Laravel'].csrfToken){return window['Laravel'].csrfToken;}else if(this.options.csrfToken){return this.options.csrfToken;}else if(typeof document!=='undefined'&&typeof document.querySelector==='function'&&(selector=document.querySelector('meta[name="csrf-token"]'))){return selector.getAttribute('content');}
return null;}}]);return Connector;}();var Channel=function(){function Channel(){_classCallCheck(this,Channel);}
_createClass(Channel,[{key:"listenForWhisper",value:function listenForWhisper(event,callback){return this.listen('.client-'+event,callback);}},{key:"notification",value:function notification(callback){return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',callback);}},{key:"stopListeningForWhisper",value:function stopListeningForWhisper(event,callback){return this.stopListening('.client-'+event,callback);}}]);return Channel;}();var EventFormatter=function(){function EventFormatter(namespace){_classCallCheck(this,EventFormatter);this.setNamespace(namespace);}
_createClass(EventFormatter,[{key:"format",value:function format(event){if(event.charAt(0)==='.'||event.charAt(0)==='\\'){return event.substr(1);}else if(this.namespace){event=this.namespace+'.'+event;}
return event.replace(/\./g,'\\');}},{key:"setNamespace",value:function setNamespace(value){this.namespace=value;}}]);return EventFormatter;}();var PusherChannel=function(_Channel){_inherits(PusherChannel,_Channel);var _super=_createSuper(PusherChannel);function PusherChannel(pusher,name,options){var _this;_classCallCheck(this,PusherChannel);_this=_super.call(this);_this.name=name;_this.pusher=pusher;_this.options=options;_this.eventFormatter=new EventFormatter(_this.options.namespace);_this.subscribe();return _this;}
_createClass(PusherChannel,[{key:"subscribe",value:function subscribe(){this.subscription=this.pusher.subscribe(this.name);}},{key:"unsubscribe",value:function unsubscribe(){this.pusher.unsubscribe(this.name);}},{key:"listen",value:function listen(event,callback){this.on(this.eventFormatter.format(event),callback);return this;}},{key:"listenToAll",value:function listenToAll(callback){var _this2=this;this.subscription.bind_global(function(event,data){if(event.startsWith('pusher:')){return;}
var namespace=_this2.options.namespace.replace(/\./g,'\\');var formattedEvent=event.startsWith(namespace)?event.substring(namespace.length+1):'.'+event;callback(formattedEvent,data);});return this;}},{key:"stopListening",value:function stopListening(event,callback){if(callback){this.subscription.unbind(this.eventFormatter.format(event),callback);}else{this.subscription.unbind(this.eventFormatter.format(event));}
return this;}},{key:"stopListeningToAll",value:function stopListeningToAll(callback){if(callback){this.subscription.unbind_global(callback);}else{this.subscription.unbind_global();}
return this;}},{key:"subscribed",value:function subscribed(callback){this.on('pusher:subscription_succeeded',function(){callback();});return this;}},{key:"error",value:function error(callback){this.on('pusher:subscription_error',function(status){callback(status);});return this;}},{key:"on",value:function on(event,callback){this.subscription.bind(event,callback);return this;}}]);return PusherChannel;}(Channel);var PusherPrivateChannel=function(_PusherChannel){_inherits(PusherPrivateChannel,_PusherChannel);var _super=_createSuper(PusherPrivateChannel);function PusherPrivateChannel(){_classCallCheck(this,PusherPrivateChannel);return _super.apply(this,arguments);}
_createClass(PusherPrivateChannel,[{key:"whisper",value:function whisper(eventName,data){this.pusher.channels.channels[this.name].trigger("client-".concat(eventName),data);return this;}}]);return PusherPrivateChannel;}(PusherChannel);var PusherEncryptedPrivateChannel=function(_PusherChannel){_inherits(PusherEncryptedPrivateChannel,_PusherChannel);var _super=_createSuper(PusherEncryptedPrivateChannel);function PusherEncryptedPrivateChannel(){_classCallCheck(this,PusherEncryptedPrivateChannel);return _super.apply(this,arguments);}
_createClass(PusherEncryptedPrivateChannel,[{key:"whisper",value:function whisper(eventName,data){this.pusher.channels.channels[this.name].trigger("client-".concat(eventName),data);return this;}}]);return PusherEncryptedPrivateChannel;}(PusherChannel);var PusherPresenceChannel=function(_PusherChannel){_inherits(PusherPresenceChannel,_PusherChannel);var _super=_createSuper(PusherPresenceChannel);function PusherPresenceChannel(){_classCallCheck(this,PusherPresenceChannel);return _super.apply(this,arguments);}
_createClass(PusherPresenceChannel,[{key:"here",value:function here(callback){this.on('pusher:subscription_succeeded',function(data){callback(Object.keys(data.members).map(function(k){return data.members[k];}));});return this;}},{key:"joining",value:function joining(callback){this.on('pusher:member_added',function(member){callback(member.info);});return this;}},{key:"leaving",value:function leaving(callback){this.on('pusher:member_removed',function(member){callback(member.info);});return this;}},{key:"whisper",value:function whisper(eventName,data){this.pusher.channels.channels[this.name].trigger("client-".concat(eventName),data);return this;}}]);return PusherPresenceChannel;}(PusherChannel);var SocketIoChannel=function(_Channel){_inherits(SocketIoChannel,_Channel);var _super=_createSuper(SocketIoChannel);function SocketIoChannel(socket,name,options){var _this;_classCallCheck(this,SocketIoChannel);_this=_super.call(this);_this.events={};_this.listeners={};_this.name=name;_this.socket=socket;_this.options=options;_this.eventFormatter=new EventFormatter(_this.options.namespace);_this.subscribe();return _this;}
_createClass(SocketIoChannel,[{key:"subscribe",value:function subscribe(){this.socket.emit('subscribe',{channel:this.name,auth:this.options.auth||{}});}},{key:"unsubscribe",value:function unsubscribe(){this.unbind();this.socket.emit('unsubscribe',{channel:this.name,auth:this.options.auth||{}});}},{key:"listen",value:function listen(event,callback){this.on(this.eventFormatter.format(event),callback);return this;}},{key:"stopListening",value:function stopListening(event,callback){this.unbindEvent(this.eventFormatter.format(event),callback);return this;}},{key:"subscribed",value:function subscribed(callback){this.on('connect',function(socket){callback(socket);});return this;}},{key:"error",value:function error(callback){return this;}},{key:"on",value:function on(event,callback){var _this2=this;this.listeners[event]=this.listeners[event]||[];if(!this.events[event]){this.events[event]=function(channel,data){if(_this2.name===channel&&_this2.listeners[event]){_this2.listeners[event].forEach(function(cb){return cb(data);});}};this.socket.on(event,this.events[event]);}
this.listeners[event].push(callback);return this;}},{key:"unbind",value:function unbind(){var _this3=this;Object.keys(this.events).forEach(function(event){_this3.unbindEvent(event);});}},{key:"unbindEvent",value:function unbindEvent(event,callback){this.listeners[event]=this.listeners[event]||[];if(callback){this.listeners[event]=this.listeners[event].filter(function(cb){return cb!==callback;});}
if(!callback||this.listeners[event].length===0){if(this.events[event]){this.socket.removeListener(event,this.events[event]);delete this.events[event];}
delete this.listeners[event];}}}]);return SocketIoChannel;}(Channel);var SocketIoPrivateChannel=function(_SocketIoChannel){_inherits(SocketIoPrivateChannel,_SocketIoChannel);var _super=_createSuper(SocketIoPrivateChannel);function SocketIoPrivateChannel(){_classCallCheck(this,SocketIoPrivateChannel);return _super.apply(this,arguments);}
_createClass(SocketIoPrivateChannel,[{key:"whisper",value:function whisper(eventName,data){this.socket.emit('client event',{channel:this.name,event:"client-".concat(eventName),data:data});return this;}}]);return SocketIoPrivateChannel;}(SocketIoChannel);var SocketIoPresenceChannel=function(_SocketIoPrivateChann){_inherits(SocketIoPresenceChannel,_SocketIoPrivateChann);var _super=_createSuper(SocketIoPresenceChannel);function SocketIoPresenceChannel(){_classCallCheck(this,SocketIoPresenceChannel);return _super.apply(this,arguments);}
_createClass(SocketIoPresenceChannel,[{key:"here",value:function here(callback){this.on('presence:subscribed',function(members){callback(members.map(function(m){return m.user_info;}));});return this;}},{key:"joining",value:function joining(callback){this.on('presence:joining',function(member){return callback(member.user_info);});return this;}},{key:"leaving",value:function leaving(callback){this.on('presence:leaving',function(member){return callback(member.user_info);});return this;}}]);return SocketIoPresenceChannel;}(SocketIoPrivateChannel);var NullChannel=function(_Channel){_inherits(NullChannel,_Channel);var _super=_createSuper(NullChannel);function NullChannel(){_classCallCheck(this,NullChannel);return _super.apply(this,arguments);}
_createClass(NullChannel,[{key:"subscribe",value:function subscribe(){}},{key:"unsubscribe",value:function unsubscribe(){}},{key:"listen",value:function listen(event,callback){return this;}},{key:"stopListening",value:function stopListening(event,callback){return this;}},{key:"subscribed",value:function subscribed(callback){return this;}},{key:"error",value:function error(callback){return this;}},{key:"on",value:function on(event,callback){return this;}}]);return NullChannel;}(Channel);var NullPrivateChannel=function(_NullChannel){_inherits(NullPrivateChannel,_NullChannel);var _super=_createSuper(NullPrivateChannel);function NullPrivateChannel(){_classCallCheck(this,NullPrivateChannel);return _super.apply(this,arguments);}
_createClass(NullPrivateChannel,[{key:"whisper",value:function whisper(eventName,data){return this;}}]);return NullPrivateChannel;}(NullChannel);var NullPresenceChannel=function(_NullChannel){_inherits(NullPresenceChannel,_NullChannel);var _super=_createSuper(NullPresenceChannel);function NullPresenceChannel(){_classCallCheck(this,NullPresenceChannel);return _super.apply(this,arguments);}
_createClass(NullPresenceChannel,[{key:"here",value:function here(callback){return this;}},{key:"joining",value:function joining(callback){return this;}},{key:"leaving",value:function leaving(callback){return this;}},{key:"whisper",value:function whisper(eventName,data){return this;}}]);return NullPresenceChannel;}(NullChannel);var PusherConnector=function(_Connector){_inherits(PusherConnector,_Connector);var _super=_createSuper(PusherConnector);function PusherConnector(){var _this;_classCallCheck(this,PusherConnector);_this=_super.apply(this,arguments);_this.channels={};return _this;}
_createClass(PusherConnector,[{key:"connect",value:function connect(){if(typeof this.options.client!=='undefined'){this.pusher=this.options.client;}else{this.pusher=new Pusher(this.options.key,this.options);}}},{key:"listen",value:function listen(name,event,callback){return this.channel(name).listen(event,callback);}},{key:"channel",value:function channel(name){if(!this.channels[name]){this.channels[name]=new PusherChannel(this.pusher,name,this.options);}
return this.channels[name];}},{key:"privateChannel",value:function privateChannel(name){if(!this.channels['private-'+name]){this.channels['private-'+name]=new PusherPrivateChannel(this.pusher,'private-'+name,this.options);}
return this.channels['private-'+name];}},{key:"encryptedPrivateChannel",value:function encryptedPrivateChannel(name){if(!this.channels['private-encrypted-'+name]){this.channels['private-encrypted-'+name]=new PusherEncryptedPrivateChannel(this.pusher,'private-encrypted-'+name,this.options);}
return this.channels['private-encrypted-'+name];}},{key:"presenceChannel",value:function presenceChannel(name){if(!this.channels['presence-'+name]){this.channels['presence-'+name]=new PusherPresenceChannel(this.pusher,'presence-'+name,this.options);}
return this.channels['presence-'+name];}},{key:"leave",value:function leave(name){var _this2=this;var channels=[name,'private-'+name,'presence-'+name];channels.forEach(function(name,index){_this2.leaveChannel(name);});}},{key:"leaveChannel",value:function leaveChannel(name){if(this.channels[name]){this.channels[name].unsubscribe();delete this.channels[name];}}},{key:"socketId",value:function socketId(){return this.pusher.connection.socket_id;}},{key:"disconnect",value:function disconnect(){this.pusher.disconnect();}}]);return PusherConnector;}(Connector);var SocketIoConnector=function(_Connector){_inherits(SocketIoConnector,_Connector);var _super=_createSuper(SocketIoConnector);function SocketIoConnector(){var _this;_classCallCheck(this,SocketIoConnector);_this=_super.apply(this,arguments);_this.channels={};return _this;}
_createClass(SocketIoConnector,[{key:"connect",value:function connect(){var _this2=this;var io=this.getSocketIO();this.socket=io(this.options.host,this.options);this.socket.on('reconnect',function(){Object.values(_this2.channels).forEach(function(channel){channel.subscribe();});});return this.socket;}},{key:"getSocketIO",value:function getSocketIO(){if(typeof this.options.client!=='undefined'){return this.options.client;}
if(typeof io!=='undefined'){return io;}
throw new Error('Socket.io client not found. Should be globally available or passed via options.client');}},{key:"listen",value:function listen(name,event,callback){return this.channel(name).listen(event,callback);}},{key:"channel",value:function channel(name){if(!this.channels[name]){this.channels[name]=new SocketIoChannel(this.socket,name,this.options);}
return this.channels[name];}},{key:"privateChannel",value:function privateChannel(name){if(!this.channels['private-'+name]){this.channels['private-'+name]=new SocketIoPrivateChannel(this.socket,'private-'+name,this.options);}
return this.channels['private-'+name];}},{key:"presenceChannel",value:function presenceChannel(name){if(!this.channels['presence-'+name]){this.channels['presence-'+name]=new SocketIoPresenceChannel(this.socket,'presence-'+name,this.options);}
return this.channels['presence-'+name];}},{key:"leave",value:function leave(name){var _this3=this;var channels=[name,'private-'+name,'presence-'+name];channels.forEach(function(name){_this3.leaveChannel(name);});}},{key:"leaveChannel",value:function leaveChannel(name){if(this.channels[name]){this.channels[name].unsubscribe();delete this.channels[name];}}},{key:"socketId",value:function socketId(){return this.socket.id;}},{key:"disconnect",value:function disconnect(){this.socket.disconnect();}}]);return SocketIoConnector;}(Connector);var NullConnector=function(_Connector){_inherits(NullConnector,_Connector);var _super=_createSuper(NullConnector);function NullConnector(){var _this;_classCallCheck(this,NullConnector);_this=_super.apply(this,arguments);_this.channels={};return _this;}
_createClass(NullConnector,[{key:"connect",value:function connect(){}},{key:"listen",value:function listen(name,event,callback){return new NullChannel();}},{key:"channel",value:function channel(name){return new NullChannel();}},{key:"privateChannel",value:function privateChannel(name){return new NullPrivateChannel();}},{key:"presenceChannel",value:function presenceChannel(name){return new NullPresenceChannel();}},{key:"leave",value:function leave(name){}},{key:"leaveChannel",value:function leaveChannel(name){}},{key:"socketId",value:function socketId(){return 'fake-socket-id';}},{key:"disconnect",value:function disconnect(){}}]);return NullConnector;}(Connector);var Echo=function(){function Echo(options){_classCallCheck(this,Echo);this.options=options;this.connect();if(!this.options.withoutInterceptors){this.registerInterceptors();}}
_createClass(Echo,[{key:"channel",value:function channel(_channel){return this.connector.channel(_channel);}},{key:"connect",value:function connect(){if(this.options.broadcaster=='pusher'){this.connector=new PusherConnector(this.options);}else if(this.options.broadcaster=='socket.io'){this.connector=new SocketIoConnector(this.options);}else if(this.options.broadcaster=='null'){this.connector=new NullConnector(this.options);}else if(typeof this.options.broadcaster=='function'){this.connector=new this.options.broadcaster(this.options);}}},{key:"disconnect",value:function disconnect(){this.connector.disconnect();}},{key:"join",value:function join(channel){return this.connector.presenceChannel(channel);}},{key:"leave",value:function leave(channel){this.connector.leave(channel);}},{key:"leaveChannel",value:function leaveChannel(channel){this.connector.leaveChannel(channel);}},{key:"listen",value:function listen(channel,event,callback){return this.connector.listen(channel,event,callback);}},{key:"private",value:function _private(channel){return this.connector.privateChannel(channel);}},{key:"encryptedPrivate",value:function encryptedPrivate(channel){return this.connector.encryptedPrivateChannel(channel);}},{key:"socketId",value:function socketId(){return this.connector.socketId();}},{key:"registerInterceptors",value:function registerInterceptors(){if(typeof Vue==='function'&&Vue.http){this.registerVueRequestInterceptor();}
if(typeof axios==='function'){this.registerAxiosRequestInterceptor();}
if(typeof jQuery==='function'){this.registerjQueryAjaxSetup();}}},{key:"registerVueRequestInterceptor",value:function registerVueRequestInterceptor(){var _this=this;Vue.http.interceptors.push(function(request,next){if(_this.socketId()){request.headers.set('X-Socket-ID',_this.socketId());}
next();});}},{key:"registerAxiosRequestInterceptor",value:function registerAxiosRequestInterceptor(){var _this2=this;axios.interceptors.request.use(function(config){if(_this2.socketId()){config.headers['X-Socket-Id']=_this2.socketId();}
return config;});}},{key:"registerjQueryAjaxSetup",value:function registerjQueryAjaxSetup(){var _this3=this;if(typeof jQuery.ajax!='undefined'){jQuery.ajaxPrefilter(function(options,originalOptions,xhr){if(_this3.socketId()){xhr.setRequestHeader('X-Socket-Id',_this3.socketId());}});}}}]);return Echo;}();}),"./node_modules/lodash/lodash.js":/*!***************************************!*\
!*** ./node_modules/lodash/lodash.js ***!
\***************************************//*!no static exports found*/(function(module,exports,__webpack_require__){(function(global,module){var __WEBPACK_AMD_DEFINE_RESULT__;;(function(){var undefined;var VERSION='4.17.21';var LARGE_ARRAY_SIZE=200;var CORE_ERROR_TEXT='Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',FUNC_ERROR_TEXT='Expected a function',INVALID_TEMPL_VAR_ERROR_TEXT='Invalid `variable` option passed into `_.template`';var HASH_UNDEFINED='__lodash_hash_undefined__';var MAX_MEMOIZE_SIZE=500;var PLACEHOLDER='__lodash_placeholder__';var CLONE_DEEP_FLAG=1,CLONE_FLAT_FLAG=2,CLONE_SYMBOLS_FLAG=4;var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;var WRAP_BIND_FLAG=1,WRAP_BIND_KEY_FLAG=2,WRAP_CURRY_BOUND_FLAG=4,WRAP_CURRY_FLAG=8,WRAP_CURRY_RIGHT_FLAG=16,WRAP_PARTIAL_FLAG=32,WRAP_PARTIAL_RIGHT_FLAG=64,WRAP_ARY_FLAG=128,WRAP_REARG_FLAG=256,WRAP_FLIP_FLAG=512;var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...';var HOT_COUNT=800,HOT_SPAN=16;var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2,LAZY_WHILE_FLAG=3;var INFINITY=1/0,MAX_SAFE_INTEGER=9007199254740991,MAX_INTEGER=1.7976931348623157e+308,NAN=0/0;var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH-1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH>>>1;var wrapFlags=[['ary',WRAP_ARY_FLAG],['bind',WRAP_BIND_FLAG],['bindKey',WRAP_BIND_KEY_FLAG],['curry',WRAP_CURRY_FLAG],['curryRight',WRAP_CURRY_RIGHT_FLAG],['flip',WRAP_FLIP_FLAG],['partial',WRAP_PARTIAL_FLAG],['partialRight',WRAP_PARTIAL_RIGHT_FLAG],['rearg',WRAP_REARG_FLAG]];var argsTag='[object Arguments]',arrayTag='[object Array]',asyncTag='[object AsyncFunction]',boolTag='[object Boolean]',dateTag='[object Date]',domExcTag='[object DOMException]',errorTag='[object Error]',funcTag='[object Function]',genTag='[object GeneratorFunction]',mapTag='[object Map]',numberTag='[object Number]',nullTag='[object Null]',objectTag='[object Object]',promiseTag='[object Promise]',proxyTag='[object Proxy]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]',undefinedTag='[object Undefined]',weakMapTag='[object WeakMap]',weakSetTag='[object WeakSet]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g;var reEscapedHtml=/&(?:amp|lt|gt|quot|#39);/g,reUnescapedHtml=/[&<>"']/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source);var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g;var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;var reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source);var reTrimStart=/^\s+/;var reWhitespace=/\s/;var reWrapComment=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,reWrapDetails=/\{\n\/\* \[wrapped with (.+)\] \*/,reSplitDetails=/,? & /;var reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;var reForbiddenIdentifierChars=/[()=,{}\[\]\/\s]/;var reEscapeChar=/\\(\\)?/g;var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;var reFlags=/\w*$/;var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;var reIsBinary=/^0b[01]+$/i;var reIsHostCtor=/^\[object .+?Constructor\]$/;var reIsOctal=/^0o[0-7]+$/i;var reIsUint=/^(?:0|[1-9]\d*)$/;var reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;var reNoMatch=/($^)/;var reUnescapedString=/['\n\r\u2028\u2029\\]/g;var rsAstralRange='\\ud800-\\udfff',rsComboMarksRange='\\u0300-\\u036f',reComboHalfMarksRange='\\ufe20-\\ufe2f',rsComboSymbolsRange='\\u20d0-\\u20ff',rsComboRange=rsComboMarksRange+reComboHalfMarksRange+rsComboSymbolsRange,rsDingbatRange='\\u2700-\\u27bf',rsLowerRange='a-z\\xdf-\\xf6\\xf8-\\xff',rsMathOpRange='\\xac\\xb1\\xd7\\xf7',rsNonCharRange='\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',rsPunctuationRange='\\u2000-\\u206f',rsSpaceRange=' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',rsUpperRange='A-Z\\xc0-\\xd6\\xd8-\\xde',rsVarRange='\\ufe0e\\ufe0f',rsBreakRange=rsMathOpRange+rsNonCharRange+rsPunctuationRange+rsSpaceRange;var rsApos="['\u2019]",rsAstral='['+rsAstralRange+']',rsBreak='['+rsBreakRange+']',rsCombo='['+rsComboRange+']',rsDigits='\\d+',rsDingbat='['+rsDingbatRange+']',rsLower='['+rsLowerRange+']',rsMisc='[^'+rsAstralRange+rsBreakRange+rsDigits+rsDingbatRange+rsLowerRange+rsUpperRange+']',rsFitz='\\ud83c[\\udffb-\\udfff]',rsModifier='(?:'+rsCombo+'|'+rsFitz+')',rsNonAstral='[^'+rsAstralRange+']',rsRegional='(?:\\ud83c[\\udde6-\\uddff]){2}',rsSurrPair='[\\ud800-\\udbff][\\udc00-\\udfff]',rsUpper='['+rsUpperRange+']',rsZWJ='\\u200d';var rsMiscLower='(?:'+rsLower+'|'+rsMisc+')',rsMiscUpper='(?:'+rsUpper+'|'+rsMisc+')',rsOptContrLower='(?:'+rsApos+'(?:d|ll|m|re|s|t|ve))?',rsOptContrUpper='(?:'+rsApos+'(?:D|LL|M|RE|S|T|VE))?',reOptMod=rsModifier+'?',rsOptVar='['+rsVarRange+']?',rsOptJoin='(?:'+rsZWJ+'(?:'+[rsNonAstral,rsRegional,rsSurrPair].join('|')+')'+rsOptVar+reOptMod+')*',rsOrdLower='\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',rsOrdUpper='\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',rsSeq=rsOptVar+reOptMod+rsOptJoin,rsEmoji='(?:'+[rsDingbat,rsRegional,rsSurrPair].join('|')+')'+rsSeq,rsSymbol='(?:'+[rsNonAstral+rsCombo+'?',rsCombo,rsRegional,rsSurrPair,rsAstral].join('|')+')';var reApos=RegExp(rsApos,'g');var reComboMark=RegExp(rsCombo,'g');var reUnicode=RegExp(rsFitz+'(?='+rsFitz+')|'+rsSymbol+rsSeq,'g');var reUnicodeWord=RegExp([rsUpper+'?'+rsLower+'+'+rsOptContrLower+'(?='+[rsBreak,rsUpper,'$'].join('|')+')',rsMiscUpper+'+'+rsOptContrUpper+'(?='+[rsBreak,rsUpper+rsMiscLower,'$'].join('|')+')',rsUpper+'?'+rsMiscLower+'+'+rsOptContrLower,rsUpper+'+'+rsOptContrUpper,rsOrdUpper,rsOrdLower,rsDigits,rsEmoji].join('|'),'g');var reHasUnicode=RegExp('['+rsZWJ+rsAstralRange+rsComboRange+rsVarRange+']');var reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;var contextProps=['Array','Buffer','DataView','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Map','Math','Object','Promise','RegExp','Set','String','Symbol','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap','_','clearTimeout','isFinite','parseInt','setTimeout'];var templateCounter=-1;var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false;var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcc':'I','\xcd':'I','\xce':'I','\xcf':'I','\xec':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss','\u0100':'A','\u0102':'A','\u0104':'A','\u0101':'a','\u0103':'a','\u0105':'a','\u0106':'C','\u0108':'C','\u010a':'C','\u010c':'C','\u0107':'c','\u0109':'c','\u010b':'c','\u010d':'c','\u010e':'D','\u0110':'D','\u010f':'d','\u0111':'d','\u0112':'E','\u0114':'E','\u0116':'E','\u0118':'E','\u011a':'E','\u0113':'e','\u0115':'e','\u0117':'e','\u0119':'e','\u011b':'e','\u011c':'G','\u011e':'G','\u0120':'G','\u0122':'G','\u011d':'g','\u011f':'g','\u0121':'g','\u0123':'g','\u0124':'H','\u0126':'H','\u0125':'h','\u0127':'h','\u0128':'I','\u012a':'I','\u012c':'I','\u012e':'I','\u0130':'I','\u0129':'i','\u012b':'i','\u012d':'i','\u012f':'i','\u0131':'i','\u0134':'J','\u0135':'j','\u0136':'K','\u0137':'k','\u0138':'k','\u0139':'L','\u013b':'L','\u013d':'L','\u013f':'L','\u0141':'L','\u013a':'l','\u013c':'l','\u013e':'l','\u0140':'l','\u0142':'l','\u0143':'N','\u0145':'N','\u0147':'N','\u014a':'N','\u0144':'n','\u0146':'n','\u0148':'n','\u014b':'n','\u014c':'O','\u014e':'O','\u0150':'O','\u014d':'o','\u014f':'o','\u0151':'o','\u0154':'R','\u0156':'R','\u0158':'R','\u0155':'r','\u0157':'r','\u0159':'r','\u015a':'S','\u015c':'S','\u015e':'S','\u0160':'S','\u015b':'s','\u015d':'s','\u015f':'s','\u0161':'s','\u0162':'T','\u0164':'T','\u0166':'T','\u0163':'t','\u0165':'t','\u0167':'t','\u0168':'U','\u016a':'U','\u016c':'U','\u016e':'U','\u0170':'U','\u0172':'U','\u0169':'u','\u016b':'u','\u016d':'u','\u016f':'u','\u0171':'u','\u0173':'u','\u0174':'W','\u0175':'w','\u0176':'Y','\u0177':'y','\u0178':'Y','\u0179':'Z','\u017b':'Z','\u017d':'Z','\u017a':'z','\u017c':'z','\u017e':'z','\u0132':'IJ','\u0133':'ij','\u0152':'Oe','\u0153':'oe','\u0149':"'n",'\u017f':'s'};var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"};var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\u2028':'u2028','\u2029':'u2029'};var freeParseFloat=parseFloat,freeParseInt=parseInt;var freeGlobal=typeof global=='object'&&global&&global.Object===Object&&global;var freeSelf=typeof self=='object'&&self&&self.Object===Object&&self;var root=freeGlobal||freeSelf||Function('return this')();var freeExports=true&&exports&&!exports.nodeType&&exports;var freeModule=freeExports&&typeof module=='object'&&module&&!module.nodeType&&module;var moduleExports=freeModule&&freeModule.exports===freeExports;var freeProcess=moduleExports&&freeGlobal.process;var nodeUtil=(function(){try{var types=freeModule&&freeModule.require&&freeModule.require('util').types;if(types){return types;}
return freeProcess&&freeProcess.binding&&freeProcess.binding('util');}catch(e){}}());var nodeIsArrayBuffer=nodeUtil&&nodeUtil.isArrayBuffer,nodeIsDate=nodeUtil&&nodeUtil.isDate,nodeIsMap=nodeUtil&&nodeUtil.isMap,nodeIsRegExp=nodeUtil&&nodeUtil.isRegExp,nodeIsSet=nodeUtil&&nodeUtil.isSet,nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray;function apply(func,thisArg,args){switch(args.length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2]);}
return func.apply(thisArg,args);}
function arrayAggregator(array,setter,iteratee,accumulator){var index=-1,length=array==null?0:array.length;while(++index<length){var value=array[index];setter(accumulator,value,iteratee(value),array);}
return accumulator;}
function arrayEach(array,iteratee){var index=-1,length=array==null?0:array.length;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}
return array;}
function arrayEachRight(array,iteratee){var length=array==null?0:array.length;while(length--){if(iteratee(array[length],length,array)===false){break;}}
return array;}
function arrayEvery(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(!predicate(array[index],index,array)){return false;}}
return true;}
function arrayFilter(array,predicate){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[resIndex++]=value;}}
return result;}
function arrayIncludes(array,value){var length=array==null?0:array.length;return!!length&&baseIndexOf(array,value,0)>-1;}
function arrayIncludesWith(array,value,comparator){var index=-1,length=array==null?0:array.length;while(++index<length){if(comparator(value,array[index])){return true;}}
return false;}
function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}
return result;}
function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}
return array;}
function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array==null?0:array.length;if(initAccum&&length){accumulator=array[++index];}
while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}
return accumulator;}
function arrayReduceRight(array,iteratee,accumulator,initAccum){var length=array==null?0:array.length;if(initAccum&&length){accumulator=array[--length];}
while(length--){accumulator=iteratee(accumulator,array[length],length,array);}
return accumulator;}
function arraySome(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}
return false;}
var asciiSize=baseProperty('length');function asciiToArray(string){return string.split('');}
function asciiWords(string){return string.match(reAsciiWord)||[];}
function baseFindKey(collection,predicate,eachFunc){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result=key;return false;}});return result;}
function baseFindIndex(array,predicate,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?1:-1);while((fromRight?index--:++index<length)){if(predicate(array[index],index,array)){return index;}}
return-1;}
function baseIndexOf(array,value,fromIndex){return value===value?strictIndexOf(array,value,fromIndex):baseFindIndex(array,baseIsNaN,fromIndex);}
function baseIndexOfWith(array,value,fromIndex,comparator){var index=fromIndex-1,length=array.length;while(++index<length){if(comparator(array[index],value)){return index;}}
return-1;}
function baseIsNaN(value){return value!==value;}
function baseMean(array,iteratee){var length=array==null?0:array.length;return length?(baseSum(array,iteratee)/length):NAN;}
function baseProperty(key){return function(object){return object==null?undefined:object[key];};}
function basePropertyOf(object){return function(key){return object==null?undefined:object[key];};}
function baseReduce(collection,iteratee,accumulator,initAccum,eachFunc){eachFunc(collection,function(value,index,collection){accumulator=initAccum?(initAccum=false,value):iteratee(accumulator,value,index,collection);});return accumulator;}
function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--){array[length]=array[length].value;}
return array;}
function baseSum(array,iteratee){var result,index=-1,length=array.length;while(++index<length){var current=iteratee(array[index]);if(current!==undefined){result=result===undefined?current:(result+current);}}
return result;}
function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}
return result;}
function baseToPairs(object,props){return arrayMap(props,function(key){return[key,object[key]];});}
function baseTrim(string){return string?string.slice(0,trimmedEndIndex(string)+1).replace(reTrimStart,''):string;}
function baseUnary(func){return function(value){return func(value);};}
function baseValues(object,props){return arrayMap(props,function(key){return object[key];});}
function cacheHas(cache,key){return cache.has(key);}
function charsStartIndex(strSymbols,chrSymbols){var index=-1,length=strSymbols.length;while(++index<length&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}
return index;}
function charsEndIndex(strSymbols,chrSymbols){var index=strSymbols.length;while(index--&&baseIndexOf(chrSymbols,strSymbols[index],0)>-1){}
return index;}
function countHolders(array,placeholder){var length=array.length,result=0;while(length--){if(array[length]===placeholder){++result;}}
return result;}
var deburrLetter=basePropertyOf(deburredLetters);var escapeHtmlChar=basePropertyOf(htmlEscapes);function escapeStringChar(chr){return '\\'+stringEscapes[chr];}
function getValue(object,key){return object==null?undefined:object[key];}
function hasUnicode(string){return reHasUnicode.test(string);}
function hasUnicodeWord(string){return reHasUnicodeWord.test(string);}
function iteratorToArray(iterator){var data,result=[];while(!(data=iterator.next()).done){result.push(data.value);}
return result;}
function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;}
function overArg(func,transform){return function(arg){return func(transform(arg));};}
function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value===placeholder||value===PLACEHOLDER){array[index]=PLACEHOLDER;result[resIndex++]=index;}}
return result;}
function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;}
function setToPairs(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=[value,value];});return result;}
function strictIndexOf(array,value,fromIndex){var index=fromIndex-1,length=array.length;while(++index<length){if(array[index]===value){return index;}}
return-1;}
function strictLastIndexOf(array,value,fromIndex){var index=fromIndex+1;while(index--){if(array[index]===value){return index;}}
return index;}
function stringSize(string){return hasUnicode(string)?unicodeSize(string):asciiSize(string);}
function stringToArray(string){return hasUnicode(string)?unicodeToArray(string):asciiToArray(string);}
function trimmedEndIndex(string){var index=string.length;while(index--&&reWhitespace.test(string.charAt(index))){}
return index;}
var unescapeHtmlChar=basePropertyOf(htmlUnescapes);function unicodeSize(string){var result=reUnicode.lastIndex=0;while(reUnicode.test(string)){++result;}
return result;}
function unicodeToArray(string){return string.match(reUnicode)||[];}
function unicodeWords(string){return string.match(reUnicodeWord)||[];}
var runInContext=(function runInContext(context){context=context==null?root:_.defaults(root.Object(),context,_.pick(root,contextProps));var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError;var arrayProto=Array.prototype,funcProto=Function.prototype,objectProto=Object.prototype;var coreJsData=context['__core-js_shared__'];var funcToString=funcProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var idCounter=0;var maskSrcKey=(function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||'');return uid?('Symbol(src)_1.'+uid):'';}());var nativeObjectToString=objectProto.toString;var objectCtorString=funcToString.call(Object);var oldDash=root._;var reIsNative=RegExp('^'+
funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');var Buffer=moduleExports?context.Buffer:undefined,Symbol=context.Symbol,Uint8Array=context.Uint8Array,allocUnsafe=Buffer?Buffer.allocUnsafe:undefined,getPrototype=overArg(Object.getPrototypeOf,Object),objectCreate=Object.create,propertyIsEnumerable=objectProto.propertyIsEnumerable,splice=arrayProto.splice,spreadableSymbol=Symbol?Symbol.isConcatSpreadable:undefined,symIterator=Symbol?Symbol.iterator:undefined,symToStringTag=Symbol?Symbol.toStringTag:undefined;var defineProperty=(function(){try{var func=getNative(Object,'defineProperty');func({},'',{});return func;}catch(e){}}());var ctxClearTimeout=context.clearTimeout!==root.clearTimeout&&context.clearTimeout,ctxNow=Date&&Date.now!==root.Date.now&&Date.now,ctxSetTimeout=context.setTimeout!==root.setTimeout&&context.setTimeout;var nativeCeil=Math.ceil,nativeFloor=Math.floor,nativeGetSymbols=Object.getOwnPropertySymbols,nativeIsBuffer=Buffer?Buffer.isBuffer:undefined,nativeIsFinite=context.isFinite,nativeJoin=arrayProto.join,nativeKeys=overArg(Object.keys,Object),nativeMax=Math.max,nativeMin=Math.min,nativeNow=Date.now,nativeParseInt=context.parseInt,nativeRandom=Math.random,nativeReverse=arrayProto.reverse;var DataView=getNative(context,'DataView'),Map=getNative(context,'Map'),Promise=getNative(context,'Promise'),Set=getNative(context,'Set'),WeakMap=getNative(context,'WeakMap'),nativeCreate=getNative(Object,'create');var metaMap=WeakMap&&new WeakMap;var realNames={};var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);var symbolProto=Symbol?Symbol.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;function lodash(value){if(isObjectLike(value)&&!isArray(value)&&!(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}
if(hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}
return new LodashWrapper(value);}
var baseCreate=(function(){function object(){}
return function(proto){if(!isObject(proto)){return{};}
if(objectCreate){return objectCreate(proto);}
object.prototype=proto;var result=new object;object.prototype=undefined;return result;};}());function baseLodash(){}
function LodashWrapper(value,chainAll){this.__wrapped__=value;this.__actions__=[];this.__chain__=!!chainAll;this.__index__=0;this.__values__=undefined;}
lodash.templateSettings={'escape':reEscape,'evaluate':reEvaluate,'interpolate':reInterpolate,'variable':'','imports':{'_':lodash}};lodash.prototype=baseLodash.prototype;lodash.prototype.constructor=lodash;LodashWrapper.prototype=baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor=LodashWrapper;function LazyWrapper(value){this.__wrapped__=value;this.__actions__=[];this.__dir__=1;this.__filtered__=false;this.__iteratees__=[];this.__takeCount__=MAX_ARRAY_LENGTH;this.__views__=[];}
function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__=copyArray(this.__actions__);result.__dir__=this.__dir__;result.__filtered__=this.__filtered__;result.__iteratees__=copyArray(this.__iteratees__);result.__takeCount__=this.__takeCount__;result.__views__=copyArray(this.__views__);return result;}
function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__=-1;result.__filtered__=true;}else{result=this.clone();result.__dir__*=-1;}
return result;}
function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir<0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end-start,index=isRight?end:(start-1),iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr||(!isRight&&arrLength==length&&takeCount==length)){return baseWrapperValue(array,this.__actions__);}
var result=[];outer:while(length--&&resIndex<takeCount){index+=dir;var iterIndex=-1,value=array[index];while(++iterIndex<iterLength){var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type==LAZY_MAP_FLAG){value=computed;}else if(!computed){if(type==LAZY_FILTER_FLAG){continue outer;}else{break outer;}}}
result[resIndex++]=value;}
return result;}
LazyWrapper.prototype=baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor=LazyWrapper;function Hash(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};this.size=0;}
function hashDelete(key){var result=this.has(key)&&delete this.__data__[key];this.size-=result?1:0;return result;}
function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result;}
return hasOwnProperty.call(data,key)?data[key]:undefined;}
function hashHas(key){var data=this.__data__;return nativeCreate?(data[key]!==undefined):hasOwnProperty.call(data,key);}
function hashSet(key,value){var data=this.__data__;this.size+=this.has(key)?0:1;data[key]=(nativeCreate&&value===undefined)?HASH_UNDEFINED:value;return this;}
Hash.prototype.clear=hashClear;Hash.prototype['delete']=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;function ListCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function listCacheClear(){this.__data__=[];this.size=0;}
function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false;}
var lastIndex=data.length-1;if(index==lastIndex){data.pop();}else{splice.call(data,index,1);}
--this.size;return true;}
function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1];}
function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1;}
function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){++this.size;data.push([key,value]);}else{data[index][1]=value;}
return this;}
ListCache.prototype.clear=listCacheClear;ListCache.prototype['delete']=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;function MapCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}
function mapCacheClear(){this.size=0;this.__data__={'hash':new Hash,'map':new(Map||ListCache),'string':new Hash};}
function mapCacheDelete(key){var result=getMapData(this,key)['delete'](key);this.size-=result?1:0;return result;}
function mapCacheGet(key){return getMapData(this,key).get(key);}
function mapCacheHas(key){return getMapData(this,key).has(key);}
function mapCacheSet(key,value){var data=getMapData(this,key),size=data.size;data.set(key,value);this.size+=data.size==size?0:1;return this;}
MapCache.prototype.clear=mapCacheClear;MapCache.prototype['delete']=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;function SetCache(values){var index=-1,length=values==null?0:values.length;this.__data__=new MapCache;while(++index<length){this.add(values[index]);}}
function setCacheAdd(value){this.__data__.set(value,HASH_UNDEFINED);return this;}
function setCacheHas(value){return this.__data__.has(value);}
SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;SetCache.prototype.has=setCacheHas;function Stack(entries){var data=this.__data__=new ListCache(entries);this.size=data.size;}
function stackClear(){this.__data__=new ListCache;this.size=0;}
function stackDelete(key){var data=this.__data__,result=data['delete'](key);this.size=data.size;return result;}
function stackGet(key){return this.__data__.get(key);}
function stackHas(key){return this.__data__.has(key);}
function stackSet(key,value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map||(pairs.length<LARGE_ARRAY_SIZE-1)){pairs.push([key,value]);this.size=++data.size;return this;}
data=this.__data__=new MapCache(pairs);}
data.set(key,value);this.size=data.size;return this;}
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;function arrayLikeKeys(value,inherited){var isArr=isArray(value),isArg=!isArr&&isArguments(value),isBuff=!isArr&&!isArg&&isBuffer(value),isType=!isArr&&!isArg&&!isBuff&&isTypedArray(value),skipIndexes=isArr||isArg||isBuff||isType,result=skipIndexes?baseTimes(value.length,String):[],length=result.length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(key=='length'||(isBuff&&(key=='offset'||key=='parent'))||(isType&&(key=='buffer'||key=='byteLength'||key=='byteOffset'))||isIndex(key,length)))){result.push(key);}}
return result;}
function arraySample(array){var length=array.length;return length?array[baseRandom(0,length-1)]:undefined;}
function arraySampleSize(array,n){return shuffleSelf(copyArray(array),baseClamp(n,0,array.length));}
function arrayShuffle(array){return shuffleSelf(copyArray(array));}
function assignMergeValue(object,key,value){if((value!==undefined&&!eq(object[key],value))||(value===undefined&&!(key in object))){baseAssignValue(object,key,value);}}
function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||(value===undefined&&!(key in object))){baseAssignValue(object,key,value);}}
function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}
return-1;}
function baseAggregator(collection,setter,iteratee,accumulator){baseEach(collection,function(value,key,collection){setter(accumulator,value,iteratee(value),collection);});return accumulator;}
function baseAssign(object,source){return object&&copyObject(source,keys(source),object);}
function baseAssignIn(object,source){return object&&copyObject(source,keysIn(source),object);}
function baseAssignValue(object,key,value){if(key=='__proto__'&&defineProperty){defineProperty(object,key,{'configurable':true,'enumerable':true,'value':value,'writable':true});}else{object[key]=value;}}
function baseAt(object,paths){var index=-1,length=paths.length,result=Array(length),skip=object==null;while(++index<length){result[index]=skip?undefined:get(object,paths[index]);}
return result;}
function baseClamp(number,lower,upper){if(number===number){if(upper!==undefined){number=number<=upper?number:upper;}
if(lower!==undefined){number=number>=lower?number:lower;}}
return number;}
function baseClone(value,bitmask,customizer,key,object,stack){var result,isDeep=bitmask&CLONE_DEEP_FLAG,isFlat=bitmask&CLONE_FLAT_FLAG,isFull=bitmask&CLONE_SYMBOLS_FLAG;if(customizer){result=object?customizer(value,key,object,stack):customizer(value);}
if(result!==undefined){return result;}
if(!isObject(value)){return value;}
var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result);}}else{var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(isBuffer(value)){return cloneBuffer(value,isDeep);}
if(tag==objectTag||tag==argsTag||(isFunc&&!object)){result=(isFlat||isFunc)?{}:initCloneObject(value);if(!isDeep){return isFlat?copySymbolsIn(value,baseAssignIn(result,value)):copySymbols(value,baseAssign(result,value));}}else{if(!cloneableTags[tag]){return object?value:{};}
result=initCloneByTag(value,tag,isDeep);}}
stack||(stack=new Stack);var stacked=stack.get(value);if(stacked){return stacked;}
stack.set(value,result);if(isSet(value)){value.forEach(function(subValue){result.add(baseClone(subValue,bitmask,customizer,subValue,value,stack));});}else if(isMap(value)){value.forEach(function(subValue,key){result.set(key,baseClone(subValue,bitmask,customizer,key,value,stack));});}
var keysFunc=isFull?(isFlat?getAllKeysIn:getAllKeys):(isFlat?keysIn:keys);var props=isArr?undefined:keysFunc(value);arrayEach(props||value,function(subValue,key){if(props){key=subValue;subValue=value[key];}
assignValue(result,key,baseClone(subValue,bitmask,customizer,key,value,stack));});return result;}
function baseConforms(source){var props=keys(source);return function(object){return baseConformsTo(object,source,props);};}
function baseConformsTo(object,source,props){var length=props.length;if(object==null){return!length;}
object=Object(object);while(length--){var key=props[length],predicate=source[key],value=object[key];if((value===undefined&&!(key in object))||!predicate(value)){return false;}}
return true;}
function baseDelay(func,wait,args){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return setTimeout(function(){func.apply(undefined,args);},wait);}
function baseDifference(array,values,iteratee,comparator){var index=-1,includes=arrayIncludes,isCommon=true,length=array.length,result=[],valuesLength=values.length;if(!length){return result;}
if(iteratee){values=arrayMap(values,baseUnary(iteratee));}
if(comparator){includes=arrayIncludesWith;isCommon=false;}
else if(values.length>=LARGE_ARRAY_SIZE){includes=cacheHas;isCommon=false;values=new SetCache(values);}
outer:while(++index<length){var value=array[index],computed=iteratee==null?value:iteratee(value);value=(comparator||value!==0)?value:0;if(isCommon&&computed===computed){var valuesIndex=valuesLength;while(valuesIndex--){if(values[valuesIndex]===computed){continue outer;}}
result.push(value);}
else if(!includes(values,computed,comparator)){result.push(value);}}
return result;}
var baseEach=createBaseEach(baseForOwn);var baseEachRight=createBaseEach(baseForOwnRight,true);function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result=!!predicate(value,index,collection);return result;});return result;}
function baseExtremum(array,iteratee,comparator){var index=-1,length=array.length;while(++index<length){var value=array[index],current=iteratee(value);if(current!=null&&(computed===undefined?(current===current&&!isSymbol(current)):comparator(current,computed))){var computed=current,result=value;}}
return result;}
function baseFill(array,value,start,end){var length=array.length;start=toInteger(start);if(start<0){start=-start>length?0:(length+start);}
end=(end===undefined||end>length)?length:toInteger(end);if(end<0){end+=length;}
end=start>end?0:toLength(end);while(start<end){array[start++]=value;}
return array;}
function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;}
function baseFlatten(array,depth,predicate,isStrict,result){var index=-1,length=array.length;predicate||(predicate=isFlattenable);result||(result=[]);while(++index<length){var value=array[index];if(depth>0&&predicate(value)){if(depth>1){baseFlatten(value,depth-1,predicate,isStrict,result);}else{arrayPush(result,value);}}else if(!isStrict){result[result.length]=value;}}
return result;}
var baseFor=createBaseFor();var baseForRight=createBaseFor(true);function baseForOwn(object,iteratee){return object&&baseFor(object,iteratee,keys);}
function baseForOwnRight(object,iteratee){return object&&baseForRight(object,iteratee,keys);}
function baseFunctions(object,props){return arrayFilter(props,function(key){return isFunction(object[key]);});}
function baseGet(object,path){path=castPath(path,object);var index=0,length=path.length;while(object!=null&&index<length){object=object[toKey(path[index++])];}
return(index&&index==length)?object:undefined;}
function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object));}
function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag;}
return(symToStringTag&&symToStringTag in Object(value))?getRawTag(value):objectToString(value);}
function baseGt(value,other){return value>other;}
function baseHas(object,key){return object!=null&&hasOwnProperty.call(object,key);}
function baseHasIn(object,key){return object!=null&&key in Object(object);}
function baseInRange(number,start,end){return number>=nativeMin(start,end)&&number<nativeMax(start,end);}
function baseIntersection(arrays,iteratee,comparator){var includes=comparator?arrayIncludesWith:arrayIncludes,length=arrays[0].length,othLength=arrays.length,othIndex=othLength,caches=Array(othLength),maxLength=Infinity,result=[];while(othIndex--){var array=arrays[othIndex];if(othIndex&&iteratee){array=arrayMap(array,baseUnary(iteratee));}
maxLength=nativeMin(array.length,maxLength);caches[othIndex]=!comparator&&(iteratee||(length>=120&&array.length>=120))?new SetCache(othIndex&&array):undefined;}
array=arrays[0];var index=-1,seen=caches[0];outer:while(++index<length&&result.length<maxLength){var value=array[index],computed=iteratee?iteratee(value):value;value=(comparator||value!==0)?value:0;if(!(seen?cacheHas(seen,computed):includes(result,computed,comparator))){othIndex=othLength;while(--othIndex){var cache=caches[othIndex];if(!(cache?cacheHas(cache,computed):includes(arrays[othIndex],computed,comparator))){continue outer;}}
if(seen){seen.push(computed);}
result.push(value);}}
return result;}
function baseInverter(object,setter,iteratee,accumulator){baseForOwn(object,function(value,key,object){setter(accumulator,iteratee(value),key,object);});return accumulator;}
function baseInvoke(object,path,args){path=castPath(path,object);object=parent(object,path);var func=object==null?object:object[toKey(last(path))];return func==null?undefined:apply(func,object,args);}
function baseIsArguments(value){return isObjectLike(value)&&baseGetTag(value)==argsTag;}
function baseIsArrayBuffer(value){return isObjectLike(value)&&baseGetTag(value)==arrayBufferTag;}
function baseIsDate(value){return isObjectLike(value)&&baseGetTag(value)==dateTag;}
function baseIsEqual(value,other,bitmask,customizer,stack){if(value===other){return true;}
if(value==null||other==null||(!isObjectLike(value)&&!isObjectLike(other))){return value!==value&&other!==other;}
return baseIsEqualDeep(value,other,bitmask,customizer,baseIsEqual,stack);}
function baseIsEqualDeep(object,other,bitmask,customizer,equalFunc,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=objIsArr?arrayTag:getTag(object),othTag=othIsArr?arrayTag:getTag(other);objTag=objTag==argsTag?objectTag:objTag;othTag=othTag==argsTag?objectTag:othTag;var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&isBuffer(object)){if(!isBuffer(other)){return false;}
objIsArr=true;objIsObj=false;}
if(isSameTag&&!objIsObj){stack||(stack=new Stack);return(objIsArr||isTypedArray(object))?equalArrays(object,other,bitmask,customizer,equalFunc,stack):equalByTag(object,other,objTag,bitmask,customizer,equalFunc,stack);}
if(!(bitmask&COMPARE_PARTIAL_FLAG)){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){var objUnwrapped=objIsWrapped?object.value():object,othUnwrapped=othIsWrapped?other.value():other;stack||(stack=new Stack);return equalFunc(objUnwrapped,othUnwrapped,bitmask,customizer,stack);}}
if(!isSameTag){return false;}
stack||(stack=new Stack);return equalObjects(object,other,bitmask,customizer,equalFunc,stack);}
function baseIsMap(value){return isObjectLike(value)&&getTag(value)==mapTag;}
function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length;}
object=Object(object);while(index--){var data=matchData[index];if((noCustomizer&&data[2])?data[1]!==object[data[0]]:!(data[0]in object)){return false;}}
while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else{var stack=new Stack;if(customizer){var result=customizer(objValue,srcValue,key,object,source,stack);}
if(!(result===undefined?baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG,customizer,stack):result)){return false;}}}
return true;}
function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false;}
var pattern=isFunction(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value));}
function baseIsRegExp(value){return isObjectLike(value)&&baseGetTag(value)==regexpTag;}
function baseIsSet(value){return isObjectLike(value)&&getTag(value)==setTag;}
function baseIsTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[baseGetTag(value)];}
function baseIteratee(value){if(typeof value=='function'){return value;}
if(value==null){return identity;}
if(typeof value=='object'){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value);}
return property(value);}
function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}
var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}
return result;}
function baseKeysIn(object){if(!isObject(object)){return nativeKeysIn(object);}
var isProto=isPrototype(object),result=[];for(var key in object){if(!(key=='constructor'&&(isProto||!hasOwnProperty.call(object,key)))){result.push(key);}}
return result;}
function baseLt(value,other){return value<other;}
function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index]=iteratee(value,key,collection);});return result;}
function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){return matchesStrictComparable(matchData[0][0],matchData[0][1]);}
return function(object){return object===source||baseIsMatch(object,source,matchData);};}
function baseMatchesProperty(path,srcValue){if(isKey(path)&&isStrictComparable(srcValue)){return matchesStrictComparable(toKey(path),srcValue);}
return function(object){var objValue=get(object,path);return(objValue===undefined&&objValue===srcValue)?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG);};}
function baseMerge(object,source,srcIndex,customizer,stack){if(object===source){return;}
baseFor(source,function(srcValue,key){stack||(stack=new Stack);if(isObject(srcValue)){baseMergeDeep(object,source,key,srcIndex,baseMerge,customizer,stack);}
else{var newValue=customizer?customizer(safeGet(object,key),srcValue,(key+''),object,source,stack):undefined;if(newValue===undefined){newValue=srcValue;}
assignMergeValue(object,key,newValue);}},keysIn);}
function baseMergeDeep(object,source,key,srcIndex,mergeFunc,customizer,stack){var objValue=safeGet(object,key),srcValue=safeGet(source,key),stacked=stack.get(srcValue);if(stacked){assignMergeValue(object,key,stacked);return;}
var newValue=customizer?customizer(objValue,srcValue,(key+''),object,source,stack):undefined;var isCommon=newValue===undefined;if(isCommon){var isArr=isArray(srcValue),isBuff=!isArr&&isBuffer(srcValue),isTyped=!isArr&&!isBuff&&isTypedArray(srcValue);newValue=srcValue;if(isArr||isBuff||isTyped){if(isArray(objValue)){newValue=objValue;}
else if(isArrayLikeObject(objValue)){newValue=copyArray(objValue);}
else if(isBuff){isCommon=false;newValue=cloneBuffer(srcValue,true);}
else if(isTyped){isCommon=false;newValue=cloneTypedArray(srcValue,true);}
else{newValue=[];}}
else if(isPlainObject(srcValue)||isArguments(srcValue)){newValue=objValue;if(isArguments(objValue)){newValue=toPlainObject(objValue);}
else if(!isObject(objValue)||isFunction(objValue)){newValue=initCloneObject(srcValue);}}
else{isCommon=false;}}
if(isCommon){stack.set(srcValue,newValue);mergeFunc(newValue,srcValue,srcIndex,customizer,stack);stack['delete'](srcValue);}
assignMergeValue(object,key,newValue);}
function baseNth(array,n){var length=array.length;if(!length){return;}
n+=n<0?length:0;return isIndex(n,length)?array[n]:undefined;}
function baseOrderBy(collection,iteratees,orders){if(iteratees.length){iteratees=arrayMap(iteratees,function(iteratee){if(isArray(iteratee)){return function(value){return baseGet(value,iteratee.length===1?iteratee[0]:iteratee);}}
return iteratee;});}else{iteratees=[identity];}
var index=-1;iteratees=arrayMap(iteratees,baseUnary(getIteratee()));var result=baseMap(collection,function(value,key,collection){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return{'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});}
function basePick(object,paths){return basePickBy(object,paths,function(value,path){return hasIn(object,path);});}
function basePickBy(object,paths,predicate){var index=-1,length=paths.length,result={};while(++index<length){var path=paths[index],value=baseGet(object,path);if(predicate(value,path)){baseSet(result,castPath(path,object),value);}}
return result;}
function basePropertyDeep(path){return function(object){return baseGet(object,path);};}
function basePullAll(array,values,iteratee,comparator){var indexOf=comparator?baseIndexOfWith:baseIndexOf,index=-1,length=values.length,seen=array;if(array===values){values=copyArray(values);}
if(iteratee){seen=arrayMap(array,baseUnary(iteratee));}
while(++index<length){var fromIndex=0,value=values[index],computed=iteratee?iteratee(value):value;while((fromIndex=indexOf(seen,computed,fromIndex,comparator))>-1){if(seen!==array){splice.call(seen,fromIndex,1);}
splice.call(array,fromIndex,1);}}
return array;}
function basePullAt(array,indexes){var length=array?indexes.length:0,lastIndex=length-1;while(length--){var index=indexes[length];if(length==lastIndex||index!==previous){var previous=index;if(isIndex(index)){splice.call(array,index,1);}else{baseUnset(array,index);}}}
return array;}
function baseRandom(lower,upper){return lower+nativeFloor(nativeRandom()*(upper-lower+1));}
function baseRange(start,end,step,fromRight){var index=-1,length=nativeMax(nativeCeil((end-start)/(step||1)),0),result=Array(length);while(length--){result[fromRight?length:++index]=start;start+=step;}
return result;}
function baseRepeat(string,n){var result='';if(!string||n<1||n>MAX_SAFE_INTEGER){return result;}
do{if(n%2){result+=string;}
n=nativeFloor(n/2);if(n){string+=string;}}while(n);return result;}
function baseRest(func,start){return setToString(overRest(func,start,identity),func+'');}
function baseSample(collection){return arraySample(values(collection));}
function baseSampleSize(collection,n){var array=values(collection);return shuffleSelf(array,baseClamp(n,0,array.length));}
function baseSet(object,path,value,customizer){if(!isObject(object)){return object;}
path=castPath(path,object);var index=-1,length=path.length,lastIndex=length-1,nested=object;while(nested!=null&&++index<length){var key=toKey(path[index]),newValue=value;if(key==='__proto__'||key==='constructor'||key==='prototype'){return object;}
if(index!=lastIndex){var objValue=nested[key];newValue=customizer?customizer(objValue,key,nested):undefined;if(newValue===undefined){newValue=isObject(objValue)?objValue:(isIndex(path[index+1])?[]:{});}}
assignValue(nested,key,newValue);nested=nested[key];}
return object;}
var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;};var baseSetToString=!defineProperty?identity:function(func,string){return defineProperty(func,'toString',{'configurable':true,'enumerable':false,'value':constant(string),'writable':true});};function baseShuffle(collection){return shuffleSelf(values(collection));}
function baseSlice(array,start,end){var index=-1,length=array.length;if(start<0){start=-start>length?0:(length+start);}
end=end>length?length:end;if(end<0){end+=length;}
length=start>end?0:((end-start)>>>0);start>>>=0;var result=Array(length);while(++index<length){result[index]=array[index+start];}
return result;}
function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result=predicate(value,index,collection);return!result;});return!!result;}
function baseSortedIndex(array,value,retHighest){var low=0,high=array==null?low:array.length;if(typeof value=='number'&&value===value&&high<=HALF_MAX_ARRAY_LENGTH){while(low<high){var mid=(low+high)>>>1,computed=array[mid];if(computed!==null&&!isSymbol(computed)&&(retHighest?(computed<=value):(computed<value))){low=mid+1;}else{high=mid;}}
return high;}
return baseSortedIndexBy(array,value,identity,retHighest);}
function baseSortedIndexBy(array,value,iteratee,retHighest){var low=0,high=array==null?0:array.length;if(high===0){return 0;}
value=iteratee(value);var valIsNaN=value!==value,valIsNull=value===null,valIsSymbol=isSymbol(value),valIsUndefined=value===undefined;while(low<high){var mid=nativeFloor((low+high)/2),computed=iteratee(array[mid]),othIsDefined=computed!==undefined,othIsNull=computed===null,othIsReflexive=computed===computed,othIsSymbol=isSymbol(computed);if(valIsNaN){var setLow=retHighest||othIsReflexive;}else if(valIsUndefined){setLow=othIsReflexive&&(retHighest||othIsDefined);}else if(valIsNull){setLow=othIsReflexive&&othIsDefined&&(retHighest||!othIsNull);}else if(valIsSymbol){setLow=othIsReflexive&&othIsDefined&&!othIsNull&&(retHighest||!othIsSymbol);}else if(othIsNull||othIsSymbol){setLow=false;}else{setLow=retHighest?(computed<=value):(computed<value);}
if(setLow){low=mid+1;}else{high=mid;}}
return nativeMin(high,MAX_ARRAY_INDEX);}
function baseSortedUniq(array,iteratee){var index=-1,length=array.length,resIndex=0,result=[];while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;if(!index||!eq(computed,seen)){var seen=computed;result[resIndex++]=value===0?0:value;}}
return result;}
function baseToNumber(value){if(typeof value=='number'){return value;}
if(isSymbol(value)){return NAN;}
return+value;}
function baseToString(value){if(typeof value=='string'){return value;}
if(isArray(value)){return arrayMap(value,baseToString)+'';}
if(isSymbol(value)){return symbolToString?symbolToString.call(value):'';}
var result=(value+'');return(result=='0'&&(1/value)==-INFINITY)?'-0':result;}
function baseUniq(array,iteratee,comparator){var index=-1,includes=arrayIncludes,length=array.length,isCommon=true,result=[],seen=result;if(comparator){isCommon=false;includes=arrayIncludesWith;}
else if(length>=LARGE_ARRAY_SIZE){var set=iteratee?null:createSet(array);if(set){return setToArray(set);}
isCommon=false;includes=cacheHas;seen=new SetCache;}
else{seen=iteratee?[]:result;}
outer:while(++index<length){var value=array[index],computed=iteratee?iteratee(value):value;value=(comparator||value!==0)?value:0;if(isCommon&&computed===computed){var seenIndex=seen.length;while(seenIndex--){if(seen[seenIndex]===computed){continue outer;}}
if(iteratee){seen.push(computed);}
result.push(value);}
else if(!includes(seen,computed,comparator)){if(seen!==result){seen.push(computed);}
result.push(value);}}
return result;}
function baseUnset(object,path){path=castPath(path,object);object=parent(object,path);return object==null||delete object[toKey(last(path))];}
function baseUpdate(object,path,updater,customizer){return baseSet(object,path,updater(baseGet(object,path)),customizer);}
function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index<length)&&predicate(array[index],index,array)){}
return isDrop?baseSlice(array,(fromRight?0:index),(fromRight?index+1:length)):baseSlice(array,(fromRight?index+1:0),(fromRight?length:index));}
function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result=result.value();}
return arrayReduce(actions,function(result,action){return action.func.apply(action.thisArg,arrayPush([result],action.args));},result);}
function baseXor(arrays,iteratee,comparator){var length=arrays.length;if(length<2){return length?baseUniq(arrays[0]):[];}
var index=-1,result=Array(length);while(++index<length){var array=arrays[index],othIndex=-1;while(++othIndex<length){if(othIndex!=index){result[index]=baseDifference(result[index]||array,arrays[othIndex],iteratee,comparator);}}}
return baseUniq(baseFlatten(result,1),iteratee,comparator);}
function baseZipObject(props,values,assignFunc){var index=-1,length=props.length,valsLength=values.length,result={};while(++index<length){var value=index<valsLength?values[index]:undefined;assignFunc(result,props[index],value);}
return result;}
function castArrayLikeObject(value){return isArrayLikeObject(value)?value:[];}
function castFunction(value){return typeof value=='function'?value:identity;}
function castPath(value,object){if(isArray(value)){return value;}
return isKey(value,object)?[value]:stringToPath(toString(value));}
var castRest=baseRest;function castSlice(array,start,end){var length=array.length;end=end===undefined?length:end;return(!start&&end>=length)?array:baseSlice(array,start,end);}
var clearTimeout=ctxClearTimeout||function(id){return root.clearTimeout(id);};function cloneBuffer(buffer,isDeep){if(isDeep){return buffer.slice();}
var length=buffer.length,result=allocUnsafe?allocUnsafe(length):new buffer.constructor(length);buffer.copy(result);return result;}
function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);new Uint8Array(result).set(new Uint8Array(arrayBuffer));return result;}
function cloneDataView(dataView,isDeep){var buffer=isDeep?cloneArrayBuffer(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength);}
function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result;}
function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{};}
function cloneTypedArray(typedArray,isDeep){var buffer=isDeep?cloneArrayBuffer(typedArray.buffer):typedArray.buffer;return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length);}
function compareAscending(value,other){if(value!==other){var valIsDefined=value!==undefined,valIsNull=value===null,valIsReflexive=value===value,valIsSymbol=isSymbol(value);var othIsDefined=other!==undefined,othIsNull=other===null,othIsReflexive=other===other,othIsSymbol=isSymbol(other);if((!othIsNull&&!othIsSymbol&&!valIsSymbol&&value>other)||(valIsSymbol&&othIsDefined&&othIsReflexive&&!othIsNull&&!othIsSymbol)||(valIsNull&&othIsDefined&&othIsReflexive)||(!valIsDefined&&othIsReflexive)||!valIsReflexive){return 1;}
if((!valIsNull&&!valIsSymbol&&!othIsSymbol&&value<other)||(othIsSymbol&&valIsDefined&&valIsReflexive&&!valIsNull&&!valIsSymbol)||(othIsNull&&valIsDefined&&valIsReflexive)||(!othIsDefined&&valIsReflexive)||!othIsReflexive){return-1;}}
return 0;}
function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index<length){var result=compareAscending(objCriteria[index],othCriteria[index]);if(result){if(index>=ordersLength){return result;}
var order=orders[index];return result*(order=='desc'?-1:1);}}
return object.index-other.index;}
function composeArgs(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersLength=holders.length,leftIndex=-1,leftLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(leftLength+rangeLength),isUncurried=!isCurried;while(++leftIndex<leftLength){result[leftIndex]=partials[leftIndex];}
while(++argsIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[holders[argsIndex]]=args[argsIndex];}}
while(rangeLength--){result[leftIndex++]=args[argsIndex++];}
return result;}
function composeArgsRight(args,partials,holders,isCurried){var argsIndex=-1,argsLength=args.length,holdersIndex=-1,holdersLength=holders.length,rightIndex=-1,rightLength=partials.length,rangeLength=nativeMax(argsLength-holdersLength,0),result=Array(rangeLength+rightLength),isUncurried=!isCurried;while(++argsIndex<rangeLength){result[argsIndex]=args[argsIndex];}
var offset=argsIndex;while(++rightIndex<rightLength){result[offset+rightIndex]=partials[rightIndex];}
while(++holdersIndex<holdersLength){if(isUncurried||argsIndex<argsLength){result[offset+holders[holdersIndex]]=args[argsIndex++];}}
return result;}
function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}
return array;}
function copyObject(source,props,object,customizer){var isNew=!object;object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;if(newValue===undefined){newValue=source[key];}
if(isNew){baseAssignValue(object,key,newValue);}else{assignValue(object,key,newValue);}}
return object;}
function copySymbols(source,object){return copyObject(source,getSymbols(source),object);}
function copySymbolsIn(source,object){return copyObject(source,getSymbolsIn(source),object);}
function createAggregator(setter,initializer){return function(collection,iteratee){var func=isArray(collection)?arrayAggregator:baseAggregator,accumulator=initializer?initializer():{};return func(collection,setter,getIteratee(iteratee,2),accumulator);};}
function createAssigner(assigner){return baseRest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=(assigner.length>3&&typeof customizer=='function')?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}
object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,index,customizer);}}
return object;});}
function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){if(collection==null){return collection;}
if(!isArrayLike(collection)){return eachFunc(collection,iteratee);}
var length=collection.length,index=fromRight?length:-1,iterable=Object(collection);while((fromRight?index--:++index<length)){if(iteratee(iterable[index],index,iterable)===false){break;}}
return collection;};}
function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var index=-1,iterable=Object(object),props=keysFunc(object),length=props.length;while(length--){var key=props[fromRight?length:++index];if(iteratee(iterable[key],key,iterable)===false){break;}}
return object;};}
function createBind(func,bitmask,thisArg){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;return fn.apply(isBind?thisArg:this,arguments);}
return wrapper;}
function createCaseFirst(methodName){return function(string){string=toString(string);var strSymbols=hasUnicode(string)?stringToArray(string):undefined;var chr=strSymbols?strSymbols[0]:string.charAt(0);var trailing=strSymbols?castSlice(strSymbols,1).join(''):string.slice(1);return chr[methodName]()+trailing;};}
function createCompounder(callback){return function(string){return arrayReduce(words(deburr(string).replace(reApos,'')),callback,'');};}
function createCtor(Ctor){return function(){var args=arguments;switch(args.length){case 0:return new Ctor;case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}
var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args);return isObject(result)?result:thisBinding;};}
function createCurry(func,bitmask,arity){var Ctor=createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length,placeholder=getHolder(wrapper);while(index--){args[index]=arguments[index];}
var holders=(length<3&&args[0]!==placeholder&&args[length-1]!==placeholder)?[]:replaceHolders(args,placeholder);length-=holders.length;if(length<arity){return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,undefined,args,holders,undefined,undefined,arity-length);}
var fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;return apply(fn,this,args);}
return wrapper;}
function createFind(findIndexFunc){return function(collection,predicate,fromIndex){var iterable=Object(collection);if(!isArrayLike(collection)){var iteratee=getIteratee(predicate,3);collection=keys(collection);predicate=function(key){return iteratee(iterable[key],key,iterable);};}
var index=findIndexFunc(collection,predicate,fromIndex);return index>-1?iterable[iteratee?collection[index]:index]:undefined;};}
function createFlow(fromRight){return flatRest(function(funcs){var length=funcs.length,index=length,prereq=LodashWrapper.prototype.thru;if(fromRight){funcs.reverse();}
while(index--){var func=funcs[index];if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
if(prereq&&!wrapper&&getFuncName(func)=='wrapper'){var wrapper=new LodashWrapper([],true);}}
index=wrapper?index:length;while(++index<length){func=funcs[index];var funcName=getFuncName(func),data=funcName=='wrapper'?getData(func):undefined;if(data&&isLaziable(data[0])&&data[1]==(WRAP_ARY_FLAG|WRAP_CURRY_FLAG|WRAP_PARTIAL_FLAG|WRAP_REARG_FLAG)&&!data[4].length&&data[9]==1){wrapper=wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else{wrapper=(func.length==1&&isLaziable(func))?wrapper[funcName]():wrapper.thru(func);}}
return function(){var args=arguments,value=args[0];if(wrapper&&args.length==1&&isArray(value)){return wrapper.plant(value).value();}
var index=0,result=length?funcs[index].apply(this,args):value;while(++index<length){result=funcs[index].call(this,result);}
return result;};});}
function createHybrid(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask&WRAP_ARY_FLAG,isBind=bitmask&WRAP_BIND_FLAG,isBindKey=bitmask&WRAP_BIND_KEY_FLAG,isCurried=bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG),isFlip=bitmask&WRAP_FLIP_FLAG,Ctor=isBindKey?undefined:createCtor(func);function wrapper(){var length=arguments.length,args=Array(length),index=length;while(index--){args[index]=arguments[index];}
if(isCurried){var placeholder=getHolder(wrapper),holdersCount=countHolders(args,placeholder);}
if(partials){args=composeArgs(args,partials,holders,isCurried);}
if(partialsRight){args=composeArgsRight(args,partialsRight,holdersRight,isCurried);}
length-=holdersCount;if(isCurried&&length<arity){var newHolders=replaceHolders(args,placeholder);return createRecurry(func,bitmask,createHybrid,wrapper.placeholder,thisArg,args,newHolders,argPos,ary,arity-length);}
var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;length=args.length;if(argPos){args=reorder(args,argPos);}else if(isFlip&&length>1){args.reverse();}
if(isAry&&ary<length){args.length=ary;}
if(this&&this!==root&&this instanceof wrapper){fn=Ctor||createCtor(fn);}
return fn.apply(thisBinding,args);}
return wrapper;}
function createInverter(setter,toIteratee){return function(object,iteratee){return baseInverter(object,setter,toIteratee(iteratee),{});};}
function createMathOperation(operator,defaultValue){return function(value,other){var result;if(value===undefined&&other===undefined){return defaultValue;}
if(value!==undefined){result=value;}
if(other!==undefined){if(result===undefined){return other;}
if(typeof value=='string'||typeof other=='string'){value=baseToString(value);other=baseToString(other);}else{value=baseToNumber(value);other=baseToNumber(other);}
result=operator(value,other);}
return result;};}
function createOver(arrayFunc){return flatRest(function(iteratees){iteratees=arrayMap(iteratees,baseUnary(getIteratee()));return baseRest(function(args){var thisArg=this;return arrayFunc(iteratees,function(iteratee){return apply(iteratee,thisArg,args);});});});}
function createPadding(length,chars){chars=chars===undefined?' ':baseToString(chars);var charsLength=chars.length;if(charsLength<2){return charsLength?baseRepeat(chars,length):chars;}
var result=baseRepeat(chars,nativeCeil(length/stringSize(chars)));return hasUnicode(chars)?castSlice(stringToArray(result),0,length).join(''):result.slice(0,length);}
function createPartial(func,bitmask,thisArg,partials){var isBind=bitmask&WRAP_BIND_FLAG,Ctor=createCtor(func);function wrapper(){var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength+argsLength),fn=(this&&this!==root&&this instanceof wrapper)?Ctor:func;while(++leftIndex<leftLength){args[leftIndex]=partials[leftIndex];}
while(argsLength--){args[leftIndex++]=arguments[++argsIndex];}
return apply(fn,isBind?thisArg:this,args);}
return wrapper;}
function createRange(fromRight){return function(start,end,step){if(step&&typeof step!='number'&&isIterateeCall(start,end,step)){end=step=undefined;}
start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}
step=step===undefined?(start<end?1:-1):toFinite(step);return baseRange(start,end,step,fromRight);};}
function createRelationalOperation(operator){return function(value,other){if(!(typeof value=='string'&&typeof other=='string')){value=toNumber(value);other=toNumber(other);}
return operator(value,other);};}
function createRecurry(func,bitmask,wrapFunc,placeholder,thisArg,partials,holders,argPos,ary,arity){var isCurry=bitmask&WRAP_CURRY_FLAG,newHolders=isCurry?holders:undefined,newHoldersRight=isCurry?undefined:holders,newPartials=isCurry?partials:undefined,newPartialsRight=isCurry?undefined:partials;bitmask|=(isCurry?WRAP_PARTIAL_FLAG:WRAP_PARTIAL_RIGHT_FLAG);bitmask&=~(isCurry?WRAP_PARTIAL_RIGHT_FLAG:WRAP_PARTIAL_FLAG);if(!(bitmask&WRAP_CURRY_BOUND_FLAG)){bitmask&=~(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG);}
var newData=[func,bitmask,thisArg,newPartials,newHolders,newPartialsRight,newHoldersRight,argPos,ary,arity];var result=wrapFunc.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}
result.placeholder=placeholder;return setWrapToString(result,func,bitmask);}
function createRound(methodName){var func=Math[methodName];return function(number,precision){number=toNumber(number);precision=precision==null?0:nativeMin(toInteger(precision),292);if(precision&&nativeIsFinite(number)){var pair=(toString(number)+'e').split('e'),value=func(pair[0]+'e'+(+pair[1]+precision));pair=(toString(value)+'e').split('e');return+(pair[0]+'e'+(+pair[1]-precision));}
return func(number);};}
var createSet=!(Set&&(1/setToArray(new Set([,-0]))[1])==INFINITY)?noop:function(values){return new Set(values);};function createToPairs(keysFunc){return function(object){var tag=getTag(object);if(tag==mapTag){return mapToArray(object);}
if(tag==setTag){return setToPairs(object);}
return baseToPairs(object,keysFunc(object));};}
function createWrap(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask&WRAP_BIND_KEY_FLAG;if(!isBindKey&&typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
var length=partials?partials.length:0;if(!length){bitmask&=~(WRAP_PARTIAL_FLAG|WRAP_PARTIAL_RIGHT_FLAG);partials=holders=undefined;}
ary=ary===undefined?ary:nativeMax(toInteger(ary),0);arity=arity===undefined?arity:toInteger(arity);length-=holders?holders.length:0;if(bitmask&WRAP_PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials=holders=undefined;}
var data=isBindKey?undefined:getData(func);var newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);}
func=newData[0];bitmask=newData[1];thisArg=newData[2];partials=newData[3];holders=newData[4];arity=newData[9]=newData[9]===undefined?(isBindKey?0:func.length):nativeMax(newData[9]-length,0);if(!arity&&bitmask&(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG)){bitmask&=~(WRAP_CURRY_FLAG|WRAP_CURRY_RIGHT_FLAG);}
if(!bitmask||bitmask==WRAP_BIND_FLAG){var result=createBind(func,bitmask,thisArg);}else if(bitmask==WRAP_CURRY_FLAG||bitmask==WRAP_CURRY_RIGHT_FLAG){result=createCurry(func,bitmask,arity);}else if((bitmask==WRAP_PARTIAL_FLAG||bitmask==(WRAP_BIND_FLAG|WRAP_PARTIAL_FLAG))&&!holders.length){result=createPartial(func,bitmask,thisArg,partials);}else{result=createHybrid.apply(undefined,newData);}
var setter=data?baseSetData:setData;return setWrapToString(setter(result,newData),func,bitmask);}
function customDefaultsAssignIn(objValue,srcValue,key,object){if(objValue===undefined||(eq(objValue,objectProto[key])&&!hasOwnProperty.call(object,key))){return srcValue;}
return objValue;}
function customDefaultsMerge(objValue,srcValue,key,object,source,stack){if(isObject(objValue)&&isObject(srcValue)){stack.set(srcValue,objValue);baseMerge(objValue,srcValue,undefined,customDefaultsMerge,stack);stack['delete'](srcValue);}
return objValue;}
function customOmitClone(value){return isPlainObject(value)?undefined:value;}
function equalArrays(array,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false;}
var arrStacked=stack.get(array);var othStacked=stack.get(other);if(arrStacked&&othStacked){return arrStacked==other&&othStacked==array;}
var index=-1,result=true,seen=(bitmask&COMPARE_UNORDERED_FLAG)?new SetCache:undefined;stack.set(array,other);stack.set(other,array);while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack);}
if(compared!==undefined){if(compared){continue;}
result=false;break;}
if(seen){if(!arraySome(other,function(othValue,othIndex){if(!cacheHas(seen,othIndex)&&(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){return seen.push(othIndex);}})){result=false;break;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){result=false;break;}}
stack['delete'](array);stack['delete'](other);return result;}
function equalByTag(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag:if((object.byteLength!=other.byteLength)||(object.byteOffset!=other.byteOffset)){return false;}
object=object.buffer;other=other.buffer;case arrayBufferTag:if((object.byteLength!=other.byteLength)||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false;}
return true;case boolTag:case dateTag:case numberTag:return eq(+object,+other);case errorTag:return object.name==other.name&&object.message==other.message;case regexpTag:case stringTag:return object==(other+'');case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&COMPARE_PARTIAL_FLAG;convert||(convert=setToArray);if(object.size!=other.size&&!isPartial){return false;}
var stacked=stack.get(object);if(stacked){return stacked==other;}
bitmask|=COMPARE_UNORDERED_FLAG;stack.set(object,other);var result=equalArrays(convert(object),convert(other),bitmask,customizer,equalFunc,stack);stack['delete'](object);return result;case symbolTag:if(symbolValueOf){return symbolValueOf.call(object)==symbolValueOf.call(other);}}
return false;}
function equalObjects(object,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,objProps=getAllKeys(object),objLength=objProps.length,othProps=getAllKeys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false;}
var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:hasOwnProperty.call(other,key))){return false;}}
var objStacked=stack.get(object);var othStacked=stack.get(other);if(objStacked&&othStacked){return objStacked==other&&othStacked==object;}
var result=true;stack.set(object,other);stack.set(other,object);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack);}
if(!(compared===undefined?(objValue===othValue||equalFunc(objValue,othValue,bitmask,customizer,stack)):compared)){result=false;break;}
skipCtor||(skipCtor=key=='constructor');}
if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;if(objCtor!=othCtor&&('constructor'in object&&'constructor'in other)&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){result=false;}}
stack['delete'](object);stack['delete'](other);return result;}
function flatRest(func){return setToString(overRest(func,undefined,flatten),func+'');}
function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols);}
function getAllKeysIn(object){return baseGetAllKeys(object,keysIn,getSymbolsIn);}
var getData=!metaMap?noop:function(func){return metaMap.get(func);};function getFuncName(func){var result=(func.name+''),array=realNames[result],length=hasOwnProperty.call(realNames,result)?array.length:0;while(length--){var data=array[length],otherFunc=data.func;if(otherFunc==null||otherFunc==func){return data.name;}}
return result;}
function getHolder(func){var object=hasOwnProperty.call(lodash,'placeholder')?lodash:func;return object.placeholder;}
function getIteratee(){var result=lodash.iteratee||iteratee;result=result===iteratee?baseIteratee:result;return arguments.length?result(arguments[0],arguments[1]):result;}
function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=='string'?'string':'hash']:data.map;}
function getMatchData(object){var result=keys(object),length=result.length;while(length--){var key=result[length],value=object[key];result[length]=[key,value,isStrictComparable(value)];}
return result;}
function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined;}
function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true;}catch(e){}
var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag;}else{delete value[symToStringTag];}}
return result;}
var getSymbols=!nativeGetSymbols?stubArray:function(object){if(object==null){return[];}
object=Object(object);return arrayFilter(nativeGetSymbols(object),function(symbol){return propertyIsEnumerable.call(object,symbol);});};var getSymbolsIn=!nativeGetSymbols?stubArray:function(object){var result=[];while(object){arrayPush(result,getSymbols(object));object=getPrototype(object);}
return result;};var getTag=baseGetTag;if((DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag)||(Map&&getTag(new Map)!=mapTag)||(Promise&&getTag(Promise.resolve())!=promiseTag)||(Set&&getTag(new Set)!=setTag)||(WeakMap&&getTag(new WeakMap)!=weakMapTag)){getTag=function(value){var result=baseGetTag(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):'';if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag;}}
return result;};}
function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index<length){var data=transforms[index],size=data.size;switch(data.type){case 'drop':start+=size;break;case 'dropRight':end-=size;break;case 'take':end=nativeMin(end,start+size);break;case 'takeRight':start=nativeMax(start,end-size);break;}}
return{'start':start,'end':end};}
function getWrapDetails(source){var match=source.match(reWrapDetails);return match?match[1].split(reSplitDetails):[];}
function hasPath(object,path,hasFunc){path=castPath(path,object);var index=-1,length=path.length,result=false;while(++index<length){var key=toKey(path[index]);if(!(result=object!=null&&hasFunc(object,key))){break;}
object=object[key];}
if(result||++index!=length){return result;}
length=object==null?0:object.length;return!!length&&isLength(length)&&isIndex(key,length)&&(isArray(object)||isArguments(object));}
function initCloneArray(array){var length=array.length,result=new array.constructor(length);if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}
return result;}
function initCloneObject(object){return(typeof object.constructor=='function'&&!isPrototype(object))?baseCreate(getPrototype(object)):{};}
function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneArrayBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case dataViewTag:return cloneDataView(object,isDeep);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return new Ctor;case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return new Ctor;case symbolTag:return cloneSymbol(object);}}
function insertWrapDetails(source,details){var length=details.length;if(!length){return source;}
var lastIndex=length-1;details[lastIndex]=(length>1?'& ':'')+details[lastIndex];details=details.join(length>2?', ':' ');return source.replace(reWrapComment,'{\n/* [wrapped with '+details+'] */\n');}
function isFlattenable(value){return isArray(value)||isArguments(value)||!!(spreadableSymbol&&value&&value[spreadableSymbol]);}
function isIndex(value,length){var type=typeof value;length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(type=='number'||(type!='symbol'&&reIsUint.test(value)))&&(value>-1&&value%1==0&&value<length);}
function isIterateeCall(value,index,object){if(!isObject(object)){return false;}
var type=typeof index;if(type=='number'?(isArrayLike(object)&&isIndex(index,object.length)):(type=='string'&&index in object)){return eq(object[index],value);}
return false;}
function isKey(value,object){if(isArray(value)){return false;}
var type=typeof value;if(type=='number'||type=='symbol'||type=='boolean'||value==null||isSymbol(value)){return true;}
return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||(object!=null&&value in Object(object));}
function isKeyable(value){var type=typeof value;return(type=='string'||type=='number'||type=='symbol'||type=='boolean')?(value!=='__proto__'):(value===null);}
function isLaziable(func){var funcName=getFuncName(func),other=lodash[funcName];if(typeof other!='function'||!(funcName in LazyWrapper.prototype)){return false;}
if(func===other){return true;}
var data=getData(other);return!!data&&func===data[0];}
function isMasked(func){return!!maskSrcKey&&(maskSrcKey in func);}
var isMaskable=coreJsData?isFunction:stubFalse;function isPrototype(value){var Ctor=value&&value.constructor,proto=(typeof Ctor=='function'&&Ctor.prototype)||objectProto;return value===proto;}
function isStrictComparable(value){return value===value&&!isObject(value);}
function matchesStrictComparable(key,srcValue){return function(object){if(object==null){return false;}
return object[key]===srcValue&&(srcValue!==undefined||(key in Object(object)));};}
function memoizeCapped(func){var result=memoize(func,function(key){if(cache.size===MAX_MEMOIZE_SIZE){cache.clear();}
return key;});var cache=result.cache;return result;}
function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask|srcBitmask,isCommon=newBitmask<(WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG|WRAP_ARY_FLAG);var isCombo=((srcBitmask==WRAP_ARY_FLAG)&&(bitmask==WRAP_CURRY_FLAG))||((srcBitmask==WRAP_ARY_FLAG)&&(bitmask==WRAP_REARG_FLAG)&&(data[7].length<=source[8]))||((srcBitmask==(WRAP_ARY_FLAG|WRAP_REARG_FLAG))&&(source[7].length<=source[8])&&(bitmask==WRAP_CURRY_FLAG));if(!(isCommon||isCombo)){return data;}
if(srcBitmask&WRAP_BIND_FLAG){data[2]=source[2];newBitmask|=bitmask&WRAP_BIND_FLAG?0:WRAP_CURRY_BOUND_FLAG;}
var value=source[3];if(value){var partials=data[3];data[3]=partials?composeArgs(partials,value,source[4]):value;data[4]=partials?replaceHolders(data[3],PLACEHOLDER):source[4];}
value=source[5];if(value){partials=data[5];data[5]=partials?composeArgsRight(partials,value,source[6]):value;data[6]=partials?replaceHolders(data[5],PLACEHOLDER):source[6];}
value=source[7];if(value){data[7]=value;}
if(srcBitmask&WRAP_ARY_FLAG){data[8]=data[8]==null?source[8]:nativeMin(data[8],source[8]);}
if(data[9]==null){data[9]=source[9];}
data[0]=source[0];data[1]=newBitmask;return data;}
function nativeKeysIn(object){var result=[];if(object!=null){for(var key in Object(object)){result.push(key);}}
return result;}
function objectToString(value){return nativeObjectToString.call(value);}
function overRest(func,start,transform){start=nativeMax(start===undefined?(func.length-1):start,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index];}
index=-1;var otherArgs=Array(start+1);while(++index<start){otherArgs[index]=args[index];}
otherArgs[start]=transform(array);return apply(func,this,otherArgs);};}
function parent(object,path){return path.length<2?object:baseGet(object,baseSlice(path,0,-1));}
function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=copyArray(array);while(length--){var index=indexes[length];array[length]=isIndex(index,arrLength)?oldArray[index]:undefined;}
return array;}
function safeGet(object,key){if(key==='constructor'&&typeof object[key]==='function'){return;}
if(key=='__proto__'){return;}
return object[key];}
var setData=shortOut(baseSetData);var setTimeout=ctxSetTimeout||function(func,wait){return root.setTimeout(func,wait);};var setToString=shortOut(baseSetToString);function setWrapToString(wrapper,reference,bitmask){var source=(reference+'');return setToString(wrapper,insertWrapDetails(source,updateWrapDetails(getWrapDetails(source),bitmask)));}
function shortOut(func){var count=0,lastCalled=0;return function(){var stamp=nativeNow(),remaining=HOT_SPAN-(stamp-lastCalled);lastCalled=stamp;if(remaining>0){if(++count>=HOT_COUNT){return arguments[0];}}else{count=0;}
return func.apply(undefined,arguments);};}
function shuffleSelf(array,size){var index=-1,length=array.length,lastIndex=length-1;size=size===undefined?length:size;while(++index<size){var rand=baseRandom(index,lastIndex),value=array[rand];array[rand]=array[index];array[index]=value;}
array.length=size;return array;}
var stringToPath=memoizeCapped(function(string){var result=[];if(string.charCodeAt(0)===46){result.push('');}
string.replace(rePropName,function(match,number,quote,subString){result.push(quote?subString.replace(reEscapeChar,'$1'):(number||match));});return result;});function toKey(value){if(typeof value=='string'||isSymbol(value)){return value;}
var result=(value+'');return(result=='0'&&(1/value)==-INFINITY)?'-0':result;}
function toSource(func){if(func!=null){try{return funcToString.call(func);}catch(e){}
try{return(func+'');}catch(e){}}
return '';}
function updateWrapDetails(details,bitmask){arrayEach(wrapFlags,function(pair){var value='_.'+pair[0];if((bitmask&pair[1])&&!arrayIncludes(details,value)){details.push(value);}});return details.sort();}
function wrapperClone(wrapper){if(wrapper instanceof LazyWrapper){return wrapper.clone();}
var result=new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__);result.__actions__=copyArray(wrapper.__actions__);result.__index__=wrapper.__index__;result.__values__=wrapper.__values__;return result;}
function chunk(array,size,guard){if((guard?isIterateeCall(array,size,guard):size===undefined)){size=1;}else{size=nativeMax(toInteger(size),0);}
var length=array==null?0:array.length;if(!length||size<1){return[];}
var index=0,resIndex=0,result=Array(nativeCeil(length/size));while(index<length){result[resIndex++]=baseSlice(array,index,(index+=size));}
return result;}
function compact(array){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(value){result[resIndex++]=value;}}
return result;}
function concat(){var length=arguments.length;if(!length){return[];}
var args=Array(length-1),array=arguments[0],index=length;while(index--){args[index-1]=arguments[index];}
return arrayPush(isArray(array)?copyArray(array):[array],baseFlatten(args,1));}
var difference=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):[];});var differenceBy=baseRest(function(array,values){var iteratee=last(values);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),getIteratee(iteratee,2)):[];});var differenceWith=baseRest(function(array,values){var comparator=last(values);if(isArrayLikeObject(comparator)){comparator=undefined;}
return isArrayLikeObject(array)?baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true),undefined,comparator):[];});function drop(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);return baseSlice(array,n<0?0:n,length);}
function dropRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);n=length-n;return baseSlice(array,0,n<0?0:n);}
function dropRightWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),true,true):[];}
function dropWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),true):[];}
function fill(array,value,start,end){var length=array==null?0:array.length;if(!length){return[];}
if(start&&typeof start!='number'&&isIterateeCall(array,value,start)){start=0;end=length;}
return baseFill(array,value,start,end);}
function findIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}
return baseFindIndex(array,getIteratee(predicate,3),index);}
function findLastIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=length-1;if(fromIndex!==undefined){index=toInteger(fromIndex);index=fromIndex<0?nativeMax(length+index,0):nativeMin(index,length-1);}
return baseFindIndex(array,getIteratee(predicate,3),index,true);}
function flatten(array){var length=array==null?0:array.length;return length?baseFlatten(array,1):[];}
function flattenDeep(array){var length=array==null?0:array.length;return length?baseFlatten(array,INFINITY):[];}
function flattenDepth(array,depth){var length=array==null?0:array.length;if(!length){return[];}
depth=depth===undefined?1:toInteger(depth);return baseFlatten(array,depth);}
function fromPairs(pairs){var index=-1,length=pairs==null?0:pairs.length,result={};while(++index<length){var pair=pairs[index];result[pair[0]]=pair[1];}
return result;}
function head(array){return(array&&array.length)?array[0]:undefined;}
function indexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}
return baseIndexOf(array,value,index);}
function initial(array){var length=array==null?0:array.length;return length?baseSlice(array,0,-1):[];}
var intersection=baseRest(function(arrays){var mapped=arrayMap(arrays,castArrayLikeObject);return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped):[];});var intersectionBy=baseRest(function(arrays){var iteratee=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);if(iteratee===last(mapped)){iteratee=undefined;}else{mapped.pop();}
return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped,getIteratee(iteratee,2)):[];});var intersectionWith=baseRest(function(arrays){var comparator=last(arrays),mapped=arrayMap(arrays,castArrayLikeObject);comparator=typeof comparator=='function'?comparator:undefined;if(comparator){mapped.pop();}
return(mapped.length&&mapped[0]===arrays[0])?baseIntersection(mapped,undefined,comparator):[];});function join(array,separator){return array==null?'':nativeJoin.call(array,separator);}
function last(array){var length=array==null?0:array.length;return length?array[length-1]:undefined;}
function lastIndexOf(array,value,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}
var index=length;if(fromIndex!==undefined){index=toInteger(fromIndex);index=index<0?nativeMax(length+index,0):nativeMin(index,length-1);}
return value===value?strictLastIndexOf(array,value,index):baseFindIndex(array,baseIsNaN,index,true);}
function nth(array,n){return(array&&array.length)?baseNth(array,toInteger(n)):undefined;}
var pull=baseRest(pullAll);function pullAll(array,values){return(array&&array.length&&values&&values.length)?basePullAll(array,values):array;}
function pullAllBy(array,values,iteratee){return(array&&array.length&&values&&values.length)?basePullAll(array,values,getIteratee(iteratee,2)):array;}
function pullAllWith(array,values,comparator){return(array&&array.length&&values&&values.length)?basePullAll(array,values,undefined,comparator):array;}
var pullAt=flatRest(function(array,indexes){var length=array==null?0:array.length,result=baseAt(array,indexes);basePullAt(array,arrayMap(indexes,function(index){return isIndex(index,length)?+index:index;}).sort(compareAscending));return result;});function remove(array,predicate){var result=[];if(!(array&&array.length)){return result;}
var index=-1,indexes=[],length=array.length;predicate=getIteratee(predicate,3);while(++index<length){var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}
basePullAt(array,indexes);return result;}
function reverse(array){return array==null?array:nativeReverse.call(array);}
function slice(array,start,end){var length=array==null?0:array.length;if(!length){return[];}
if(end&&typeof end!='number'&&isIterateeCall(array,start,end)){start=0;end=length;}
else{start=start==null?0:toInteger(start);end=end===undefined?length:toInteger(end);}
return baseSlice(array,start,end);}
function sortedIndex(array,value){return baseSortedIndex(array,value);}
function sortedIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2));}
function sortedIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value);if(index<length&&eq(array[index],value)){return index;}}
return-1;}
function sortedLastIndex(array,value){return baseSortedIndex(array,value,true);}
function sortedLastIndexBy(array,value,iteratee){return baseSortedIndexBy(array,value,getIteratee(iteratee,2),true);}
function sortedLastIndexOf(array,value){var length=array==null?0:array.length;if(length){var index=baseSortedIndex(array,value,true)-1;if(eq(array[index],value)){return index;}}
return-1;}
function sortedUniq(array){return(array&&array.length)?baseSortedUniq(array):[];}
function sortedUniqBy(array,iteratee){return(array&&array.length)?baseSortedUniq(array,getIteratee(iteratee,2)):[];}
function tail(array){var length=array==null?0:array.length;return length?baseSlice(array,1,length):[];}
function take(array,n,guard){if(!(array&&array.length)){return[];}
n=(guard||n===undefined)?1:toInteger(n);return baseSlice(array,0,n<0?0:n);}
function takeRight(array,n,guard){var length=array==null?0:array.length;if(!length){return[];}
n=(guard||n===undefined)?1:toInteger(n);n=length-n;return baseSlice(array,n<0?0:n,length);}
function takeRightWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3),false,true):[];}
function takeWhile(array,predicate){return(array&&array.length)?baseWhile(array,getIteratee(predicate,3)):[];}
var union=baseRest(function(arrays){return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true));});var unionBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),getIteratee(iteratee,2));});var unionWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseUniq(baseFlatten(arrays,1,isArrayLikeObject,true),undefined,comparator);});function uniq(array){return(array&&array.length)?baseUniq(array):[];}
function uniqBy(array,iteratee){return(array&&array.length)?baseUniq(array,getIteratee(iteratee,2)):[];}
function uniqWith(array,comparator){comparator=typeof comparator=='function'?comparator:undefined;return(array&&array.length)?baseUniq(array,undefined,comparator):[];}
function unzip(array){if(!(array&&array.length)){return[];}
var length=0;array=arrayFilter(array,function(group){if(isArrayLikeObject(group)){length=nativeMax(group.length,length);return true;}});return baseTimes(length,function(index){return arrayMap(array,baseProperty(index));});}
function unzipWith(array,iteratee){if(!(array&&array.length)){return[];}
var result=unzip(array);if(iteratee==null){return result;}
return arrayMap(result,function(group){return apply(iteratee,undefined,group);});}
var without=baseRest(function(array,values){return isArrayLikeObject(array)?baseDifference(array,values):[];});var xor=baseRest(function(arrays){return baseXor(arrayFilter(arrays,isArrayLikeObject));});var xorBy=baseRest(function(arrays){var iteratee=last(arrays);if(isArrayLikeObject(iteratee)){iteratee=undefined;}
return baseXor(arrayFilter(arrays,isArrayLikeObject),getIteratee(iteratee,2));});var xorWith=baseRest(function(arrays){var comparator=last(arrays);comparator=typeof comparator=='function'?comparator:undefined;return baseXor(arrayFilter(arrays,isArrayLikeObject),undefined,comparator);});var zip=baseRest(unzip);function zipObject(props,values){return baseZipObject(props||[],values||[],assignValue);}
function zipObjectDeep(props,values){return baseZipObject(props||[],values||[],baseSet);}
var zipWith=baseRest(function(arrays){var length=arrays.length,iteratee=length>1?arrays[length-1]:undefined;iteratee=typeof iteratee=='function'?(arrays.pop(),iteratee):undefined;return unzipWith(arrays,iteratee);});function chain(value){var result=lodash(value);result.__chain__=true;return result;}
function tap(value,interceptor){interceptor(value);return value;}
function thru(value,interceptor){return interceptor(value);}
var wrapperAt=flatRest(function(paths){var length=paths.length,start=length?paths[0]:0,value=this.__wrapped__,interceptor=function(object){return baseAt(object,paths);};if(length>1||this.__actions__.length||!(value instanceof LazyWrapper)||!isIndex(start)){return this.thru(interceptor);}
value=value.slice(start,+start+(length?1:0));value.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(value,this.__chain__).thru(function(array){if(length&&!array.length){array.push(undefined);}
return array;});});function wrapperChain(){return chain(this);}
function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);}
function wrapperNext(){if(this.__values__===undefined){this.__values__=toArray(this.value());}
var done=this.__index__>=this.__values__.length,value=done?undefined:this.__values__[this.__index__++];return{'done':done,'value':value};}
function wrapperToIterator(){return this;}
function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash){var clone=wrapperClone(parent);clone.__index__=0;clone.__values__=undefined;if(result){previous.__wrapped__=clone;}else{result=clone;}
var previous=clone;parent=parent.__wrapped__;}
previous.__wrapped__=value;return result;}
function wrapperReverse(){var value=this.__wrapped__;if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped=new LazyWrapper(this);}
wrapped=wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[reverse],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}
return this.thru(reverse);}
function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);}
var countBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){++result[key];}else{baseAssignValue(result,key,1);}});function every(collection,predicate,guard){var func=isArray(collection)?arrayEvery:baseEvery;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}
return func(collection,getIteratee(predicate,3));}
function filter(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,getIteratee(predicate,3));}
var find=createFind(findIndex);var findLast=createFind(findLastIndex);function flatMap(collection,iteratee){return baseFlatten(map(collection,iteratee),1);}
function flatMapDeep(collection,iteratee){return baseFlatten(map(collection,iteratee),INFINITY);}
function flatMapDepth(collection,iteratee,depth){depth=depth===undefined?1:toInteger(depth);return baseFlatten(map(collection,iteratee),depth);}
function forEach(collection,iteratee){var func=isArray(collection)?arrayEach:baseEach;return func(collection,getIteratee(iteratee,3));}
function forEachRight(collection,iteratee){var func=isArray(collection)?arrayEachRight:baseEachRight;return func(collection,getIteratee(iteratee,3));}
var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else{baseAssignValue(result,key,[value]);}});function includes(collection,value,fromIndex,guard){collection=isArrayLike(collection)?collection:values(collection);fromIndex=(fromIndex&&!guard)?toInteger(fromIndex):0;var length=collection.length;if(fromIndex<0){fromIndex=nativeMax(length+fromIndex,0);}
return isString(collection)?(fromIndex<=length&&collection.indexOf(value,fromIndex)>-1):(!!length&&baseIndexOf(collection,value,fromIndex)>-1);}
var invokeMap=baseRest(function(collection,path,args){var index=-1,isFunc=typeof path=='function',result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){result[++index]=isFunc?apply(path,value,args):baseInvoke(value,path,args);});return result;});var keyBy=createAggregator(function(result,value,key){baseAssignValue(result,key,value);});function map(collection,iteratee){var func=isArray(collection)?arrayMap:baseMap;return func(collection,getIteratee(iteratee,3));}
function orderBy(collection,iteratees,orders,guard){if(collection==null){return[];}
if(!isArray(iteratees)){iteratees=iteratees==null?[]:[iteratees];}
orders=guard?undefined:orders;if(!isArray(orders)){orders=orders==null?[]:[orders];}
return baseOrderBy(collection,iteratees,orders);}
var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return[[],[]];});function reduce(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduce:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEach);}
function reduceRight(collection,iteratee,accumulator){var func=isArray(collection)?arrayReduceRight:baseReduce,initAccum=arguments.length<3;return func(collection,getIteratee(iteratee,4),accumulator,initAccum,baseEachRight);}
function reject(collection,predicate){var func=isArray(collection)?arrayFilter:baseFilter;return func(collection,negate(getIteratee(predicate,3)));}
function sample(collection){var func=isArray(collection)?arraySample:baseSample;return func(collection);}
function sampleSize(collection,n,guard){if((guard?isIterateeCall(collection,n,guard):n===undefined)){n=1;}else{n=toInteger(n);}
var func=isArray(collection)?arraySampleSize:baseSampleSize;return func(collection,n);}
function shuffle(collection){var func=isArray(collection)?arrayShuffle:baseShuffle;return func(collection);}
function size(collection){if(collection==null){return 0;}
if(isArrayLike(collection)){return isString(collection)?stringSize(collection):collection.length;}
var tag=getTag(collection);if(tag==mapTag||tag==setTag){return collection.size;}
return baseKeys(collection).length;}
function some(collection,predicate,guard){var func=isArray(collection)?arraySome:baseSome;if(guard&&isIterateeCall(collection,predicate,guard)){predicate=undefined;}
return func(collection,getIteratee(predicate,3));}
var sortBy=baseRest(function(collection,iteratees){if(collection==null){return[];}
var length=iteratees.length;if(length>1&&isIterateeCall(collection,iteratees[0],iteratees[1])){iteratees=[];}else if(length>2&&isIterateeCall(iteratees[0],iteratees[1],iteratees[2])){iteratees=[iteratees[0]];}
return baseOrderBy(collection,baseFlatten(iteratees,1),[]);});var now=ctxNow||function(){return root.Date.now();};function after(n,func){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
n=toInteger(n);return function(){if(--n<1){return func.apply(this,arguments);}};}
function ary(func,n,guard){n=guard?undefined:n;n=(func&&n==null)?func.length:n;return createWrap(func,WRAP_ARY_FLAG,undefined,undefined,undefined,undefined,n);}
function before(n,func){var result;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
n=toInteger(n);return function(){if(--n>0){result=func.apply(this,arguments);}
if(n<=1){func=undefined;}
return result;};}
var bind=baseRest(function(func,thisArg,partials){var bitmask=WRAP_BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bind));bitmask|=WRAP_PARTIAL_FLAG;}
return createWrap(func,bitmask,thisArg,partials,holders);});var bindKey=baseRest(function(object,key,partials){var bitmask=WRAP_BIND_FLAG|WRAP_BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,getHolder(bindKey));bitmask|=WRAP_PARTIAL_FLAG;}
return createWrap(key,bitmask,object,partials,holders);});function curry(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curry.placeholder;return result;}
function curryRight(func,arity,guard){arity=guard?undefined:arity;var result=createWrap(func,WRAP_CURRY_RIGHT_FLAG,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder=curryRight.placeholder;return result;}
function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=false,maxing=false,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
wait=toNumber(wait)||0;if(isObject(options)){leading=!!options.leading;maxing='maxWait'in options;maxWait=maxing?nativeMax(toNumber(options.maxWait)||0,wait):maxWait;trailing='trailing'in options?!!options.trailing:trailing;}
function invokeFunc(time){var args=lastArgs,thisArg=lastThis;lastArgs=lastThis=undefined;lastInvokeTime=time;result=func.apply(thisArg,args);return result;}
function leadingEdge(time){lastInvokeTime=time;timerId=setTimeout(timerExpired,wait);return leading?invokeFunc(time):result;}
function remainingWait(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime,timeWaiting=wait-timeSinceLastCall;return maxing?nativeMin(timeWaiting,maxWait-timeSinceLastInvoke):timeWaiting;}
function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime;return(lastCallTime===undefined||(timeSinceLastCall>=wait)||(timeSinceLastCall<0)||(maxing&&timeSinceLastInvoke>=maxWait));}
function timerExpired(){var time=now();if(shouldInvoke(time)){return trailingEdge(time);}
timerId=setTimeout(timerExpired,remainingWait(time));}
function trailingEdge(time){timerId=undefined;if(trailing&&lastArgs){return invokeFunc(time);}
lastArgs=lastThis=undefined;return result;}
function cancel(){if(timerId!==undefined){clearTimeout(timerId);}
lastInvokeTime=0;lastArgs=lastCallTime=lastThis=timerId=undefined;}
function flush(){return timerId===undefined?result:trailingEdge(now());}
function debounced(){var time=now(),isInvoking=shouldInvoke(time);lastArgs=arguments;lastThis=this;lastCallTime=time;if(isInvoking){if(timerId===undefined){return leadingEdge(lastCallTime);}
if(maxing){clearTimeout(timerId);timerId=setTimeout(timerExpired,wait);return invokeFunc(lastCallTime);}}
if(timerId===undefined){timerId=setTimeout(timerExpired,wait);}
return result;}
debounced.cancel=cancel;debounced.flush=flush;return debounced;}
var defer=baseRest(function(func,args){return baseDelay(func,1,args);});var delay=baseRest(function(func,wait,args){return baseDelay(func,toNumber(wait)||0,args);});function flip(func){return createWrap(func,WRAP_FLIP_FLAG);}
function memoize(func,resolver){if(typeof func!='function'||(resolver!=null&&typeof resolver!='function')){throw new TypeError(FUNC_ERROR_TEXT);}
var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}
var result=func.apply(this,args);memoized.cache=cache.set(key,result)||cache;return result;};memoized.cache=new(memoize.Cache||MapCache);return memoized;}
memoize.Cache=MapCache;function negate(predicate){if(typeof predicate!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return function(){var args=arguments;switch(args.length){case 0:return!predicate.call(this);case 1:return!predicate.call(this,args[0]);case 2:return!predicate.call(this,args[0],args[1]);case 3:return!predicate.call(this,args[0],args[1],args[2]);}
return!predicate.apply(this,args);};}
function once(func){return before(2,func);}
var overArgs=castRest(function(func,transforms){transforms=(transforms.length==1&&isArray(transforms[0]))?arrayMap(transforms[0],baseUnary(getIteratee())):arrayMap(baseFlatten(transforms,1),baseUnary(getIteratee()));var funcsLength=transforms.length;return baseRest(function(args){var index=-1,length=nativeMin(args.length,funcsLength);while(++index<length){args[index]=transforms[index].call(this,args[index]);}
return apply(func,this,args);});});var partial=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partial));return createWrap(func,WRAP_PARTIAL_FLAG,undefined,partials,holders);});var partialRight=baseRest(function(func,partials){var holders=replaceHolders(partials,getHolder(partialRight));return createWrap(func,WRAP_PARTIAL_RIGHT_FLAG,undefined,partials,holders);});var rearg=flatRest(function(func,indexes){return createWrap(func,WRAP_REARG_FLAG,undefined,undefined,undefined,indexes);});function rest(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
start=start===undefined?start:toInteger(start);return baseRest(func,start);}
function spread(func,start){if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
start=start==null?0:nativeMax(toInteger(start),0);return baseRest(function(args){var array=args[start],otherArgs=castSlice(args,0,start);if(array){arrayPush(otherArgs,array);}
return apply(func,this,otherArgs);});}
function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
if(isObject(options)){leading='leading'in options?!!options.leading:leading;trailing='trailing'in options?!!options.trailing:trailing;}
return debounce(func,wait,{'leading':leading,'maxWait':wait,'trailing':trailing});}
function unary(func){return ary(func,1);}
function wrap(value,wrapper){return partial(castFunction(wrapper),value);}
function castArray(){if(!arguments.length){return[];}
var value=arguments[0];return isArray(value)?value:[value];}
function clone(value){return baseClone(value,CLONE_SYMBOLS_FLAG);}
function cloneWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_SYMBOLS_FLAG,customizer);}
function cloneDeep(value){return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG);}
function cloneDeepWith(value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseClone(value,CLONE_DEEP_FLAG|CLONE_SYMBOLS_FLAG,customizer);}
function conformsTo(object,source){return source==null||baseConformsTo(object,source,keys(source));}
function eq(value,other){return value===other||(value!==value&&other!==other);}
var gt=createRelationalOperation(baseGt);var gte=createRelationalOperation(function(value,other){return value>=other;});var isArguments=baseIsArguments(function(){return arguments;}())?baseIsArguments:function(value){return isObjectLike(value)&&hasOwnProperty.call(value,'callee')&&!propertyIsEnumerable.call(value,'callee');};var isArray=Array.isArray;var isArrayBuffer=nodeIsArrayBuffer?baseUnary(nodeIsArrayBuffer):baseIsArrayBuffer;function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}
function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);}
function isBoolean(value){return value===true||value===false||(isObjectLike(value)&&baseGetTag(value)==boolTag);}
var isBuffer=nativeIsBuffer||stubFalse;var isDate=nodeIsDate?baseUnary(nodeIsDate):baseIsDate;function isElement(value){return isObjectLike(value)&&value.nodeType===1&&!isPlainObject(value);}
function isEmpty(value){if(value==null){return true;}
if(isArrayLike(value)&&(isArray(value)||typeof value=='string'||typeof value.splice=='function'||isBuffer(value)||isTypedArray(value)||isArguments(value))){return!value.length;}
var tag=getTag(value);if(tag==mapTag||tag==setTag){return!value.size;}
if(isPrototype(value)){return!baseKeys(value).length;}
for(var key in value){if(hasOwnProperty.call(value,key)){return false;}}
return true;}
function isEqual(value,other){return baseIsEqual(value,other);}
function isEqualWith(value,other,customizer){customizer=typeof customizer=='function'?customizer:undefined;var result=customizer?customizer(value,other):undefined;return result===undefined?baseIsEqual(value,other,undefined,customizer):!!result;}
function isError(value){if(!isObjectLike(value)){return false;}
var tag=baseGetTag(value);return tag==errorTag||tag==domExcTag||(typeof value.message=='string'&&typeof value.name=='string'&&!isPlainObject(value));}
function isFinite(value){return typeof value=='number'&&nativeIsFinite(value);}
function isFunction(value){if(!isObject(value)){return false;}
var tag=baseGetTag(value);return tag==funcTag||tag==genTag||tag==asyncTag||tag==proxyTag;}
function isInteger(value){return typeof value=='number'&&value==toInteger(value);}
function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}
function isObject(value){var type=typeof value;return value!=null&&(type=='object'||type=='function');}
function isObjectLike(value){return value!=null&&typeof value=='object';}
var isMap=nodeIsMap?baseUnary(nodeIsMap):baseIsMap;function isMatch(object,source){return object===source||baseIsMatch(object,source,getMatchData(source));}
function isMatchWith(object,source,customizer){customizer=typeof customizer=='function'?customizer:undefined;return baseIsMatch(object,source,getMatchData(source),customizer);}
function isNaN(value){return isNumber(value)&&value!=+value;}
function isNative(value){if(isMaskable(value)){throw new Error(CORE_ERROR_TEXT);}
return baseIsNative(value);}
function isNull(value){return value===null;}
function isNil(value){return value==null;}
function isNumber(value){return typeof value=='number'||(isObjectLike(value)&&baseGetTag(value)==numberTag);}
function isPlainObject(value){if(!isObjectLike(value)||baseGetTag(value)!=objectTag){return false;}
var proto=getPrototype(value);if(proto===null){return true;}
var Ctor=hasOwnProperty.call(proto,'constructor')&&proto.constructor;return typeof Ctor=='function'&&Ctor instanceof Ctor&&funcToString.call(Ctor)==objectCtorString;}
var isRegExp=nodeIsRegExp?baseUnary(nodeIsRegExp):baseIsRegExp;function isSafeInteger(value){return isInteger(value)&&value>=-MAX_SAFE_INTEGER&&value<=MAX_SAFE_INTEGER;}
var isSet=nodeIsSet?baseUnary(nodeIsSet):baseIsSet;function isString(value){return typeof value=='string'||(!isArray(value)&&isObjectLike(value)&&baseGetTag(value)==stringTag);}
function isSymbol(value){return typeof value=='symbol'||(isObjectLike(value)&&baseGetTag(value)==symbolTag);}
var isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;function isUndefined(value){return value===undefined;}
function isWeakMap(value){return isObjectLike(value)&&getTag(value)==weakMapTag;}
function isWeakSet(value){return isObjectLike(value)&&baseGetTag(value)==weakSetTag;}
var lt=createRelationalOperation(baseLt);var lte=createRelationalOperation(function(value,other){return value<=other;});function toArray(value){if(!value){return[];}
if(isArrayLike(value)){return isString(value)?stringToArray(value):copyArray(value);}
if(symIterator&&value[symIterator]){return iteratorToArray(value[symIterator]());}
var tag=getTag(value),func=tag==mapTag?mapToArray:(tag==setTag?setToArray:values);return func(value);}
function toFinite(value){if(!value){return value===0?value:0;}
value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=(value<0?-1:1);return sign*MAX_INTEGER;}
return value===value?value:0;}
function toInteger(value){var result=toFinite(value),remainder=result%1;return result===result?(remainder?result-remainder:result):0;}
function toLength(value){return value?baseClamp(toInteger(value),0,MAX_ARRAY_LENGTH):0;}
function toNumber(value){if(typeof value=='number'){return value;}
if(isSymbol(value)){return NAN;}
if(isObject(value)){var other=typeof value.valueOf=='function'?value.valueOf():value;value=isObject(other)?(other+''):other;}
if(typeof value!='string'){return value===0?value:+value;}
value=baseTrim(value);var isBinary=reIsBinary.test(value);return(isBinary||reIsOctal.test(value))?freeParseInt(value.slice(2),isBinary?2:8):(reIsBadHex.test(value)?NAN:+value);}
function toPlainObject(value){return copyObject(value,keysIn(value));}
function toSafeInteger(value){return value?baseClamp(toInteger(value),-MAX_SAFE_INTEGER,MAX_SAFE_INTEGER):(value===0?value:0);}
function toString(value){return value==null?'':baseToString(value);}
var assign=createAssigner(function(object,source){if(isPrototype(source)||isArrayLike(source)){copyObject(source,keys(source),object);return;}
for(var key in source){if(hasOwnProperty.call(source,key)){assignValue(object,key,source[key]);}}});var assignIn=createAssigner(function(object,source){copyObject(source,keysIn(source),object);});var assignInWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keysIn(source),object,customizer);});var assignWith=createAssigner(function(object,source,srcIndex,customizer){copyObject(source,keys(source),object,customizer);});var at=flatRest(baseAt);function create(prototype,properties){var result=baseCreate(prototype);return properties==null?result:baseAssign(result,properties);}
var defaults=baseRest(function(object,sources){object=Object(object);var index=-1;var length=sources.length;var guard=length>2?sources[2]:undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){length=1;}
while(++index<length){var source=sources[index];var props=keysIn(source);var propsIndex=-1;var propsLength=props.length;while(++propsIndex<propsLength){var key=props[propsIndex];var value=object[key];if(value===undefined||(eq(value,objectProto[key])&&!hasOwnProperty.call(object,key))){object[key]=source[key];}}}
return object;});var defaultsDeep=baseRest(function(args){args.push(undefined,customDefaultsMerge);return apply(mergeWith,undefined,args);});function findKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwn);}
function findLastKey(object,predicate){return baseFindKey(object,getIteratee(predicate,3),baseForOwnRight);}
function forIn(object,iteratee){return object==null?object:baseFor(object,getIteratee(iteratee,3),keysIn);}
function forInRight(object,iteratee){return object==null?object:baseForRight(object,getIteratee(iteratee,3),keysIn);}
function forOwn(object,iteratee){return object&&baseForOwn(object,getIteratee(iteratee,3));}
function forOwnRight(object,iteratee){return object&&baseForOwnRight(object,getIteratee(iteratee,3));}
function functions(object){return object==null?[]:baseFunctions(object,keys(object));}
function functionsIn(object){return object==null?[]:baseFunctions(object,keysIn(object));}
function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result;}
function has(object,path){return object!=null&&hasPath(object,path,baseHas);}
function hasIn(object,path){return object!=null&&hasPath(object,path,baseHasIn);}
var invert=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}
result[value]=key;},constant(identity));var invertBy=createInverter(function(result,value,key){if(value!=null&&typeof value.toString!='function'){value=nativeObjectToString.call(value);}
if(hasOwnProperty.call(result,value)){result[value].push(key);}else{result[value]=[key];}},getIteratee);var invoke=baseRest(baseInvoke);function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}
function keysIn(object){return isArrayLike(object)?arrayLikeKeys(object,true):baseKeysIn(object);}
function mapKeys(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,iteratee(value,key,object),value);});return result;}
function mapValues(object,iteratee){var result={};iteratee=getIteratee(iteratee,3);baseForOwn(object,function(value,key,object){baseAssignValue(result,key,iteratee(value,key,object));});return result;}
var merge=createAssigner(function(object,source,srcIndex){baseMerge(object,source,srcIndex);});var mergeWith=createAssigner(function(object,source,srcIndex,customizer){baseMerge(object,source,srcIndex,customizer);});var omit=flatRest(function(object,paths){var result={};if(object==null){return result;}
var isDeep=false;paths=arrayMap(paths,function(path){path=castPath(path,object);isDeep||(isDeep=path.length>1);return path;});copyObject(object,getAllKeysIn(object),result);if(isDeep){result=baseClone(result,CLONE_DEEP_FLAG|CLONE_FLAT_FLAG|CLONE_SYMBOLS_FLAG,customOmitClone);}
var length=paths.length;while(length--){baseUnset(result,paths[length]);}
return result;});function omitBy(object,predicate){return pickBy(object,negate(getIteratee(predicate)));}
var pick=flatRest(function(object,paths){return object==null?{}:basePick(object,paths);});function pickBy(object,predicate){if(object==null){return{};}
var props=arrayMap(getAllKeysIn(object),function(prop){return[prop];});predicate=getIteratee(predicate);return basePickBy(object,props,function(value,path){return predicate(value,path[0]);});}
function result(object,path,defaultValue){path=castPath(path,object);var index=-1,length=path.length;if(!length){length=1;object=undefined;}
while(++index<length){var value=object==null?undefined:object[toKey(path[index])];if(value===undefined){index=length;value=defaultValue;}
object=isFunction(value)?value.call(object):value;}
return object;}
function set(object,path,value){return object==null?object:baseSet(object,path,value);}
function setWith(object,path,value,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseSet(object,path,value,customizer);}
var toPairs=createToPairs(keys);var toPairsIn=createToPairs(keysIn);function transform(object,iteratee,accumulator){var isArr=isArray(object),isArrLike=isArr||isBuffer(object)||isTypedArray(object);iteratee=getIteratee(iteratee,4);if(accumulator==null){var Ctor=object&&object.constructor;if(isArrLike){accumulator=isArr?new Ctor:[];}
else if(isObject(object)){accumulator=isFunction(Ctor)?baseCreate(getPrototype(object)):{};}
else{accumulator={};}}
(isArrLike?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;}
function unset(object,path){return object==null?true:baseUnset(object,path);}
function update(object,path,updater){return object==null?object:baseUpdate(object,path,castFunction(updater));}
function updateWith(object,path,updater,customizer){customizer=typeof customizer=='function'?customizer:undefined;return object==null?object:baseUpdate(object,path,castFunction(updater),customizer);}
function values(object){return object==null?[]:baseValues(object,keys(object));}
function valuesIn(object){return object==null?[]:baseValues(object,keysIn(object));}
function clamp(number,lower,upper){if(upper===undefined){upper=lower;lower=undefined;}
if(upper!==undefined){upper=toNumber(upper);upper=upper===upper?upper:0;}
if(lower!==undefined){lower=toNumber(lower);lower=lower===lower?lower:0;}
return baseClamp(toNumber(number),lower,upper);}
function inRange(number,start,end){start=toFinite(start);if(end===undefined){end=start;start=0;}else{end=toFinite(end);}
number=toNumber(number);return baseInRange(number,start,end);}
function random(lower,upper,floating){if(floating&&typeof floating!='boolean'&&isIterateeCall(lower,upper,floating)){upper=floating=undefined;}
if(floating===undefined){if(typeof upper=='boolean'){floating=upper;upper=undefined;}
else if(typeof lower=='boolean'){floating=lower;lower=undefined;}}
if(lower===undefined&&upper===undefined){lower=0;upper=1;}
else{lower=toFinite(lower);if(upper===undefined){upper=lower;lower=0;}else{upper=toFinite(upper);}}
if(lower>upper){var temp=lower;lower=upper;upper=temp;}
if(floating||lower%1||upper%1){var rand=nativeRandom();return nativeMin(lower+(rand*(upper-lower+freeParseFloat('1e-'+((rand+'').length-1)))),upper);}
return baseRandom(lower,upper);}
var camelCase=createCompounder(function(result,word,index){word=word.toLowerCase();return result+(index?capitalize(word):word);});function capitalize(string){return upperFirst(toString(string).toLowerCase());}
function deburr(string){string=toString(string);return string&&string.replace(reLatin,deburrLetter).replace(reComboMark,'');}
function endsWith(string,target,position){string=toString(string);target=baseToString(target);var length=string.length;position=position===undefined?length:baseClamp(toInteger(position),0,length);var end=position;position-=target.length;return position>=0&&string.slice(position,end)==target;}
function escape(string){string=toString(string);return(string&&reHasUnescapedHtml.test(string))?string.replace(reUnescapedHtml,escapeHtmlChar):string;}
function escapeRegExp(string){string=toString(string);return(string&&reHasRegExpChar.test(string))?string.replace(reRegExpChar,'\\$&'):string;}
var kebabCase=createCompounder(function(result,word,index){return result+(index?'-':'')+word.toLowerCase();});var lowerCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toLowerCase();});var lowerFirst=createCaseFirst('toLowerCase');function pad(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;if(!length||strLength>=length){return string;}
var mid=(length-strLength)/2;return(createPadding(nativeFloor(mid),chars)+
string+
createPadding(nativeCeil(mid),chars));}
function padEnd(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return(length&&strLength<length)?(string+createPadding(length-strLength,chars)):string;}
function padStart(string,length,chars){string=toString(string);length=toInteger(length);var strLength=length?stringSize(string):0;return(length&&strLength<length)?(createPadding(length-strLength,chars)+string):string;}
function parseInt(string,radix,guard){if(guard||radix==null){radix=0;}else if(radix){radix=+radix;}
return nativeParseInt(toString(string).replace(reTrimStart,''),radix||0);}
function repeat(string,n,guard){if((guard?isIterateeCall(string,n,guard):n===undefined)){n=1;}else{n=toInteger(n);}
return baseRepeat(toString(string),n);}
function replace(){var args=arguments,string=toString(args[0]);return args.length<3?string:string.replace(args[1],args[2]);}
var snakeCase=createCompounder(function(result,word,index){return result+(index?'_':'')+word.toLowerCase();});function split(string,separator,limit){if(limit&&typeof limit!='number'&&isIterateeCall(string,separator,limit)){separator=limit=undefined;}
limit=limit===undefined?MAX_ARRAY_LENGTH:limit>>>0;if(!limit){return[];}
string=toString(string);if(string&&(typeof separator=='string'||(separator!=null&&!isRegExp(separator)))){separator=baseToString(separator);if(!separator&&hasUnicode(string)){return castSlice(stringToArray(string),0,limit);}}
return string.split(separator,limit);}
var startCase=createCompounder(function(result,word,index){return result+(index?' ':'')+upperFirst(word);});function startsWith(string,target,position){string=toString(string);position=position==null?0:baseClamp(toInteger(position),0,string.length);target=baseToString(target);return string.slice(position,position+target.length)==target;}
function template(string,options,guard){var settings=lodash.templateSettings;if(guard&&isIterateeCall(string,options,guard)){options=undefined;}
string=toString(string);options=assignInWith({},options,settings,customDefaultsAssignIn);var imports=assignInWith({},options.imports,settings.imports,customDefaultsAssignIn),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate||reNoMatch,source="__p += '";var reDelimiters=RegExp((options.escape||reNoMatch).source+'|'+
interpolate.source+'|'+
(interpolate===reInterpolate?reEsTemplate:reNoMatch).source+'|'+
(options.evaluate||reNoMatch).source+'|$','g');var sourceURL='//# sourceURL='+
(hasOwnProperty.call(options,'sourceURL')?(options.sourceURL+'').replace(/\s/g,' '):('lodash.templateSources['+(++templateCounter)+']'))+'\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue||(interpolateValue=esTemplateValue);source+=string.slice(index,offset).replace(reUnescapedString,escapeStringChar);if(escapeValue){isEscaping=true;source+="' +\n__e("+escapeValue+") +\n'";}
if(evaluateValue){isEvaluating=true;source+="';\n"+evaluateValue+";\n__p += '";}
if(interpolateValue){source+="' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'";}
index=offset+match.length;return match;});source+="';\n";var variable=hasOwnProperty.call(options,'variable')&&options.variable;if(!variable){source='with (obj) {\n'+source+'\n}\n';}
else if(reForbiddenIdentifierChars.test(variable)){throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);}
source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;');source='function('+(variable||'obj')+') {\n'+
(variable?'':'obj || (obj = {});\n')+
"var __t, __p = ''"+
(isEscaping?', __e = _.escape':'')+
(isEvaluating?', __j = Array.prototype.join;\n'+
"function print() { __p += __j.call(arguments, '') }\n":';\n')+
source+
'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL+'return '+source).apply(undefined,importsValues);});result.source=source;if(isError(result)){throw result;}
return result;}
function toLower(value){return toString(value).toLowerCase();}
function toUpper(value){return toString(value).toUpperCase();}
function trim(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return baseTrim(string);}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),chrSymbols=stringToArray(chars),start=charsStartIndex(strSymbols,chrSymbols),end=charsEndIndex(strSymbols,chrSymbols)+1;return castSlice(strSymbols,start,end).join('');}
function trimEnd(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.slice(0,trimmedEndIndex(string)+1);}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),end=charsEndIndex(strSymbols,stringToArray(chars))+1;return castSlice(strSymbols,0,end).join('');}
function trimStart(string,chars,guard){string=toString(string);if(string&&(guard||chars===undefined)){return string.replace(reTrimStart,'');}
if(!string||!(chars=baseToString(chars))){return string;}
var strSymbols=stringToArray(string),start=charsStartIndex(strSymbols,stringToArray(chars));return castSlice(strSymbols,start).join('');}
function truncate(string,options){var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(isObject(options)){var separator='separator'in options?options.separator:separator;length='length'in options?toInteger(options.length):length;omission='omission'in options?baseToString(options.omission):omission;}
string=toString(string);var strLength=string.length;if(hasUnicode(string)){var strSymbols=stringToArray(string);strLength=strSymbols.length;}
if(length>=strLength){return string;}
var end=length-stringSize(omission);if(end<1){return omission;}
var result=strSymbols?castSlice(strSymbols,0,end).join(''):string.slice(0,end);if(separator===undefined){return result+omission;}
if(strSymbols){end+=(result.length-end);}
if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,substring=result;if(!separator.global){separator=RegExp(separator.source,toString(reFlags.exec(separator))+'g');}
separator.lastIndex=0;while((match=separator.exec(substring))){var newEnd=match.index;}
result=result.slice(0,newEnd===undefined?end:newEnd);}}else if(string.indexOf(baseToString(separator),end)!=end){var index=result.lastIndexOf(separator);if(index>-1){result=result.slice(0,index);}}
return result+omission;}
function unescape(string){string=toString(string);return(string&&reHasEscapedHtml.test(string))?string.replace(reEscapedHtml,unescapeHtmlChar):string;}
var upperCase=createCompounder(function(result,word,index){return result+(index?' ':'')+word.toUpperCase();});var upperFirst=createCaseFirst('toUpperCase');function words(string,pattern,guard){string=toString(string);pattern=guard?undefined:pattern;if(pattern===undefined){return hasUnicodeWord(string)?unicodeWords(string):asciiWords(string);}
return string.match(pattern)||[];}
var attempt=baseRest(function(func,args){try{return apply(func,undefined,args);}catch(e){return isError(e)?e:new Error(e);}});var bindAll=flatRest(function(object,methodNames){arrayEach(methodNames,function(key){key=toKey(key);baseAssignValue(object,key,bind(object[key],object));});return object;});function cond(pairs){var length=pairs==null?0:pairs.length,toIteratee=getIteratee();pairs=!length?[]:arrayMap(pairs,function(pair){if(typeof pair[1]!='function'){throw new TypeError(FUNC_ERROR_TEXT);}
return[toIteratee(pair[0]),pair[1]];});return baseRest(function(args){var index=-1;while(++index<length){var pair=pairs[index];if(apply(pair[0],this,args)){return apply(pair[1],this,args);}}});}
function conforms(source){return baseConforms(baseClone(source,CLONE_DEEP_FLAG));}
function constant(value){return function(){return value;};}
function defaultTo(value,defaultValue){return(value==null||value!==value)?defaultValue:value;}
var flow=createFlow();var flowRight=createFlow(true);function identity(value){return value;}
function iteratee(func){return baseIteratee(typeof func=='function'?func:baseClone(func,CLONE_DEEP_FLAG));}
function matches(source){return baseMatches(baseClone(source,CLONE_DEEP_FLAG));}
function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,CLONE_DEEP_FLAG));}
var method=baseRest(function(path,args){return function(object){return baseInvoke(object,path,args);};});var methodOf=baseRest(function(object,args){return function(path){return baseInvoke(object,path,args);};});function mixin(object,source,options){var props=keys(source),methodNames=baseFunctions(source,props);if(options==null&&!(isObject(source)&&(methodNames.length||!props.length))){options=source;source=object;object=this;methodNames=baseFunctions(source,keys(source));}
var chain=!(isObject(options)&&'chain'in options)||!!options.chain,isFunc=isFunction(object);arrayEach(methodNames,function(methodName){var func=source[methodName];object[methodName]=func;if(isFunc){object.prototype[methodName]=function(){var chainAll=this.__chain__;if(chain||chainAll){var result=object(this.__wrapped__),actions=result.__actions__=copyArray(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__=chainAll;return result;}
return func.apply(object,arrayPush([this.value()],arguments));};}});return object;}
function noConflict(){if(root._===this){root._=oldDash;}
return this;}
function noop(){}
function nthArg(n){n=toInteger(n);return baseRest(function(args){return baseNth(args,n);});}
var over=createOver(arrayMap);var overEvery=createOver(arrayEvery);var overSome=createOver(arraySome);function property(path){return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}
function propertyOf(object){return function(path){return object==null?undefined:baseGet(object,path);};}
var range=createRange();var rangeRight=createRange(true);function stubArray(){return[];}
function stubFalse(){return false;}
function stubObject(){return{};}
function stubString(){return '';}
function stubTrue(){return true;}
function times(n,iteratee){n=toInteger(n);if(n<1||n>MAX_SAFE_INTEGER){return[];}
var index=MAX_ARRAY_LENGTH,length=nativeMin(n,MAX_ARRAY_LENGTH);iteratee=getIteratee(iteratee);n-=MAX_ARRAY_LENGTH;var result=baseTimes(length,iteratee);while(++index<n){iteratee(index);}
return result;}
function toPath(value){if(isArray(value)){return arrayMap(value,toKey);}
return isSymbol(value)?[value]:copyArray(stringToPath(toString(value)));}
function uniqueId(prefix){var id=++idCounter;return toString(prefix)+id;}
var add=createMathOperation(function(augend,addend){return augend+addend;},0);var ceil=createRound('ceil');var divide=createMathOperation(function(dividend,divisor){return dividend/divisor;},1);var floor=createRound('floor');function max(array){return(array&&array.length)?baseExtremum(array,identity,baseGt):undefined;}
function maxBy(array,iteratee){return(array&&array.length)?baseExtremum(array,getIteratee(iteratee,2),baseGt):undefined;}
function mean(array){return baseMean(array,identity);}
function meanBy(array,iteratee){return baseMean(array,getIteratee(iteratee,2));}
function min(array){return(array&&array.length)?baseExtremum(array,identity,baseLt):undefined;}
function minBy(array,iteratee){return(array&&array.length)?baseExtremum(array,getIteratee(iteratee,2),baseLt):undefined;}
var multiply=createMathOperation(function(multiplier,multiplicand){return multiplier*multiplicand;},1);var round=createRound('round');var subtract=createMathOperation(function(minuend,subtrahend){return minuend-subtrahend;},0);function sum(array){return(array&&array.length)?baseSum(array,identity):0;}
function sumBy(array,iteratee){return(array&&array.length)?baseSum(array,getIteratee(iteratee,2)):0;}
lodash.after=after;lodash.ary=ary;lodash.assign=assign;lodash.assignIn=assignIn;lodash.assignInWith=assignInWith;lodash.assignWith=assignWith;lodash.at=at;lodash.before=before;lodash.bind=bind;lodash.bindAll=bindAll;lodash.bindKey=bindKey;lodash.castArray=castArray;lodash.chain=chain;lodash.chunk=chunk;lodash.compact=compact;lodash.concat=concat;lodash.cond=cond;lodash.conforms=conforms;lodash.constant=constant;lodash.countBy=countBy;lodash.create=create;lodash.curry=curry;lodash.curryRight=curryRight;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defaultsDeep=defaultsDeep;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.differenceBy=differenceBy;lodash.differenceWith=differenceWith;lodash.drop=drop;lodash.dropRight=dropRight;lodash.dropRightWhile=dropRightWhile;lodash.dropWhile=dropWhile;lodash.fill=fill;lodash.filter=filter;lodash.flatMap=flatMap;lodash.flatMapDeep=flatMapDeep;lodash.flatMapDepth=flatMapDepth;lodash.flatten=flatten;lodash.flattenDeep=flattenDeep;lodash.flattenDepth=flattenDepth;lodash.flip=flip;lodash.flow=flow;lodash.flowRight=flowRight;lodash.fromPairs=fromPairs;lodash.functions=functions;lodash.functionsIn=functionsIn;lodash.groupBy=groupBy;lodash.initial=initial;lodash.intersection=intersection;lodash.intersectionBy=intersectionBy;lodash.intersectionWith=intersectionWith;lodash.invert=invert;lodash.invertBy=invertBy;lodash.invokeMap=invokeMap;lodash.iteratee=iteratee;lodash.keyBy=keyBy;lodash.keys=keys;lodash.keysIn=keysIn;lodash.map=map;lodash.mapKeys=mapKeys;lodash.mapValues=mapValues;lodash.matches=matches;lodash.matchesProperty=matchesProperty;lodash.memoize=memoize;lodash.merge=merge;lodash.mergeWith=mergeWith;lodash.method=method;lodash.methodOf=methodOf;lodash.mixin=mixin;lodash.negate=negate;lodash.nthArg=nthArg;lodash.omit=omit;lodash.omitBy=omitBy;lodash.once=once;lodash.orderBy=orderBy;lodash.over=over;lodash.overArgs=overArgs;lodash.overEvery=overEvery;lodash.overSome=overSome;lodash.partial=partial;lodash.partialRight=partialRight;lodash.partition=partition;lodash.pick=pick;lodash.pickBy=pickBy;lodash.property=property;lodash.propertyOf=propertyOf;lodash.pull=pull;lodash.pullAll=pullAll;lodash.pullAllBy=pullAllBy;lodash.pullAllWith=pullAllWith;lodash.pullAt=pullAt;lodash.range=range;lodash.rangeRight=rangeRight;lodash.rearg=rearg;lodash.reject=reject;lodash.remove=remove;lodash.rest=rest;lodash.reverse=reverse;lodash.sampleSize=sampleSize;lodash.set=set;lodash.setWith=setWith;lodash.shuffle=shuffle;lodash.slice=slice;lodash.sortBy=sortBy;lodash.sortedUniq=sortedUniq;lodash.sortedUniqBy=sortedUniqBy;lodash.split=split;lodash.spread=spread;lodash.tail=tail;lodash.take=take;lodash.takeRight=takeRight;lodash.takeRightWhile=takeRightWhile;lodash.takeWhile=takeWhile;lodash.tap=tap;lodash.throttle=throttle;lodash.thru=thru;lodash.toArray=toArray;lodash.toPairs=toPairs;lodash.toPairsIn=toPairsIn;lodash.toPath=toPath;lodash.toPlainObject=toPlainObject;lodash.transform=transform;lodash.unary=unary;lodash.union=union;lodash.unionBy=unionBy;lodash.unionWith=unionWith;lodash.uniq=uniq;lodash.uniqBy=uniqBy;lodash.uniqWith=uniqWith;lodash.unset=unset;lodash.unzip=unzip;lodash.unzipWith=unzipWith;lodash.update=update;lodash.updateWith=updateWith;lodash.values=values;lodash.valuesIn=valuesIn;lodash.without=without;lodash.words=words;lodash.wrap=wrap;lodash.xor=xor;lodash.xorBy=xorBy;lodash.xorWith=xorWith;lodash.zip=zip;lodash.zipObject=zipObject;lodash.zipObjectDeep=zipObjectDeep;lodash.zipWith=zipWith;lodash.entries=toPairs;lodash.entriesIn=toPairsIn;lodash.extend=assignIn;lodash.extendWith=assignInWith;mixin(lodash,lodash);lodash.add=add;lodash.attempt=attempt;lodash.camelCase=camelCase;lodash.capitalize=capitalize;lodash.ceil=ceil;lodash.clamp=clamp;lodash.clone=clone;lodash.cloneDeep=cloneDeep;lodash.cloneDeepWith=cloneDeepWith;lodash.cloneWith=cloneWith;lodash.conformsTo=conformsTo;lodash.deburr=deburr;lodash.defaultTo=defaultTo;lodash.divide=divide;lodash.endsWith=endsWith;lodash.eq=eq;lodash.escape=escape;lodash.escapeRegExp=escapeRegExp;lodash.every=every;lodash.find=find;lodash.findIndex=findIndex;lodash.findKey=findKey;lodash.findLast=findLast;lodash.findLastIndex=findLastIndex;lodash.findLastKey=findLastKey;lodash.floor=floor;lodash.forEach=forEach;lodash.forEachRight=forEachRight;lodash.forIn=forIn;lodash.forInRight=forInRight;lodash.forOwn=forOwn;lodash.forOwnRight=forOwnRight;lodash.get=get;lodash.gt=gt;lodash.gte=gte;lodash.has=has;lodash.hasIn=hasIn;lodash.head=head;lodash.identity=identity;lodash.includes=includes;lodash.indexOf=indexOf;lodash.inRange=inRange;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isArrayBuffer=isArrayBuffer;lodash.isArrayLike=isArrayLike;lodash.isArrayLikeObject=isArrayLikeObject;lodash.isBoolean=isBoolean;lodash.isBuffer=isBuffer;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isEqualWith=isEqualWith;lodash.isError=isError;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isInteger=isInteger;lodash.isLength=isLength;lodash.isMap=isMap;lodash.isMatch=isMatch;lodash.isMatchWith=isMatchWith;lodash.isNaN=isNaN;lodash.isNative=isNative;lodash.isNil=isNil;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isObjectLike=isObjectLike;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isSafeInteger=isSafeInteger;lodash.isSet=isSet;lodash.isString=isString;lodash.isSymbol=isSymbol;lodash.isTypedArray=isTypedArray;lodash.isUndefined=isUndefined;lodash.isWeakMap=isWeakMap;lodash.isWeakSet=isWeakSet;lodash.join=join;lodash.kebabCase=kebabCase;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lowerCase=lowerCase;lodash.lowerFirst=lowerFirst;lodash.lt=lt;lodash.lte=lte;lodash.max=max;lodash.maxBy=maxBy;lodash.mean=mean;lodash.meanBy=meanBy;lodash.min=min;lodash.minBy=minBy;lodash.stubArray=stubArray;lodash.stubFalse=stubFalse;lodash.stubObject=stubObject;lodash.stubString=stubString;lodash.stubTrue=stubTrue;lodash.multiply=multiply;lodash.nth=nth;lodash.noConflict=noConflict;lodash.noop=noop;lodash.now=now;lodash.pad=pad;lodash.padEnd=padEnd;lodash.padStart=padStart;lodash.parseInt=parseInt;lodash.random=random;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.repeat=repeat;lodash.replace=replace;lodash.result=result;lodash.round=round;lodash.runInContext=runInContext;lodash.sample=sample;lodash.size=size;lodash.snakeCase=snakeCase;lodash.some=some;lodash.sortedIndex=sortedIndex;lodash.sortedIndexBy=sortedIndexBy;lodash.sortedIndexOf=sortedIndexOf;lodash.sortedLastIndex=sortedLastIndex;lodash.sortedLastIndexBy=sortedLastIndexBy;lodash.sortedLastIndexOf=sortedLastIndexOf;lodash.startCase=startCase;lodash.startsWith=startsWith;lodash.subtract=subtract;lodash.sum=sum;lodash.sumBy=sumBy;lodash.template=template;lodash.times=times;lodash.toFinite=toFinite;lodash.toInteger=toInteger;lodash.toLength=toLength;lodash.toLower=toLower;lodash.toNumber=toNumber;lodash.toSafeInteger=toSafeInteger;lodash.toString=toString;lodash.toUpper=toUpper;lodash.trim=trim;lodash.trimEnd=trimEnd;lodash.trimStart=trimStart;lodash.truncate=truncate;lodash.unescape=unescape;lodash.uniqueId=uniqueId;lodash.upperCase=upperCase;lodash.upperFirst=upperFirst;lodash.each=forEach;lodash.eachRight=forEachRight;lodash.first=head;mixin(lodash,(function(){var source={};baseForOwn(lodash,function(func,methodName){if(!hasOwnProperty.call(lodash.prototype,methodName)){source[methodName]=func;}});return source;}()),{'chain':false});lodash.VERSION=VERSION;arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder=lodash;});arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName]=function(n){n=n===undefined?1:nativeMax(toInteger(n),0);var result=(this.__filtered__&&!index)?new LazyWrapper(this):this.clone();if(result.__filtered__){result.__takeCount__=nativeMin(n,result.__takeCount__);}else{result.__views__.push({'size':nativeMin(n,MAX_ARRAY_LENGTH),'type':methodName+(result.__dir__<0?'Right':'')});}
return result;};LazyWrapper.prototype[methodName+'Right']=function(n){return this.reverse()[methodName](n).reverse();};});arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index+1,isFilter=type==LAZY_FILTER_FLAG||type==LAZY_WHILE_FLAG;LazyWrapper.prototype[methodName]=function(iteratee){var result=this.clone();result.__iteratees__.push({'iteratee':getIteratee(iteratee,3),'type':type});result.__filtered__=result.__filtered__||isFilter;return result;};});arrayEach(['head','last'],function(methodName,index){var takeName='take'+(index?'Right':'');LazyWrapper.prototype[methodName]=function(){return this[takeName](1).value()[0];};});arrayEach(['initial','tail'],function(methodName,index){var dropName='drop'+(index?'':'Right');LazyWrapper.prototype[methodName]=function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};});LazyWrapper.prototype.compact=function(){return this.filter(identity);};LazyWrapper.prototype.find=function(predicate){return this.filter(predicate).head();};LazyWrapper.prototype.findLast=function(predicate){return this.reverse().find(predicate);};LazyWrapper.prototype.invokeMap=baseRest(function(path,args){if(typeof path=='function'){return new LazyWrapper(this);}
return this.map(function(value){return baseInvoke(value,path,args);});});LazyWrapper.prototype.reject=function(predicate){return this.filter(negate(getIteratee(predicate)));};LazyWrapper.prototype.slice=function(start,end){start=toInteger(start);var result=this;if(result.__filtered__&&(start>0||end<0)){return new LazyWrapper(result);}
if(start<0){result=result.takeRight(-start);}else if(start){result=result.drop(start);}
if(end!==undefined){end=toInteger(end);result=end<0?result.dropRight(-end):result.take(end-start);}
return result;};LazyWrapper.prototype.takeRightWhile=function(predicate){return this.reverse().takeWhile(predicate).reverse();};LazyWrapper.prototype.toArray=function(){return this.take(MAX_ARRAY_LENGTH);};baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|find|map|reject)|While$/.test(methodName),isTaker=/^(?:head|last)$/.test(methodName),lodashFunc=lodash[isTaker?('take'+(methodName=='last'?'Right':'')):methodName],retUnwrapped=isTaker||/^find/.test(methodName);if(!lodashFunc){return;}
lodash.prototype[methodName]=function(){var value=this.__wrapped__,args=isTaker?[1]:arguments,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy||isArray(value);var interceptor=function(value){var result=lodashFunc.apply(lodash,arrayPush([value],args));return(isTaker&&chainAll)?result[0]:result;};if(useLazy&&checkIteratee&&typeof iteratee=='function'&&iteratee.length!=1){isLazy=useLazy=false;}
var chainAll=this.__chain__,isHybrid=!!this.__actions__.length,isUnwrapped=retUnwrapped&&!chainAll,onlyLazy=isLazy&&!isHybrid;if(!retUnwrapped&&useLazy){value=onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(result,chainAll);}
if(isUnwrapped&&onlyLazy){return func.apply(this,args);}
result=this.thru(interceptor);return isUnwrapped?(isTaker?result.value()[0]:result.value()):result;};});arrayEach(['pop','push','shift','sort','splice','unshift'],function(methodName){var func=arrayProto[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:pop|shift)$/.test(methodName);lodash.prototype[methodName]=function(){var args=arguments;if(retUnwrapped&&!this.__chain__){var value=this.value();return func.apply(isArray(value)?value:[],args);}
return this[chainName](function(value){return func.apply(isArray(value)?value:[],args);});};});baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name+'';if(!hasOwnProperty.call(realNames,key)){realNames[key]=[];}
realNames[key].push({'name':methodName,'func':lodashFunc});}});realNames[createHybrid(undefined,WRAP_BIND_KEY_FLAG).name]=[{'name':'wrapper','func':undefined}];LazyWrapper.prototype.clone=lazyClone;LazyWrapper.prototype.reverse=lazyReverse;LazyWrapper.prototype.value=lazyValue;lodash.prototype.at=wrapperAt;lodash.prototype.chain=wrapperChain;lodash.prototype.commit=wrapperCommit;lodash.prototype.next=wrapperNext;lodash.prototype.plant=wrapperPlant;lodash.prototype.reverse=wrapperReverse;lodash.prototype.toJSON=lodash.prototype.valueOf=lodash.prototype.value=wrapperValue;lodash.prototype.first=lodash.prototype.head;if(symIterator){lodash.prototype[symIterator]=wrapperToIterator;}
return lodash;});var _=runInContext();if(true){root._=_;!(__WEBPACK_AMD_DEFINE_RESULT__=(function(){return _;}).call(exports,__webpack_require__,exports,module),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}
else{}}.call(this));}.call(this,__webpack_require__(/*!./../webpack/buildin/global.js*/"./node_modules/webpack/buildin/global.js"),__webpack_require__(/*!./../webpack/buildin/module.js*/"./node_modules/webpack/buildin/module.js")(module)))}),"./node_modules/process/browser.js":/*!*****************************************!*\
!*** ./node_modules/process/browser.js ***!
\*****************************************//*!no static exports found*/(function(module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}
function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}
(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}
try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}}())
function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0);}
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}
try{return cachedSetTimeout(fun,0);}catch(e){try{return cachedSetTimeout.call(null,fun,0);}catch(e){return cachedSetTimeout.call(this,fun,0);}}}
function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker);}
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}
try{return cachedClearTimeout(marker);}catch(e){try{return cachedClearTimeout.call(null,marker);}catch(e){return cachedClearTimeout.call(this,marker);}}}
var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}
draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}
if(queue.length){drainQueue();}}
function drainQueue(){if(draining){return;}
var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}
queueIndex=-1;len=queue.length;}
currentQueue=null;draining=false;runClearTimeout(timeout);}
process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}
queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};function Item(fun,array){this.fun=fun;this.array=array;}
Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';process.versions={};function noop(){}
process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]}
process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/'};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};}),"./node_modules/pusher-js/dist/web/pusher.js":/*!***************************************************!*\
!*** ./node_modules/pusher-js/dist/web/pusher.js ***!
\***************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){/*!
* Pusher JavaScript Library v7.0.6
* https://pusher.com/
*
* Copyright 2020, Pusher
* Released under the MIT licence.
*/(function webpackUniversalModuleDefinition(root,factory){if(true)
module.exports=factory();else{}})(window,function(){return(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports;}
var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports;}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter});}};__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined'&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});}
Object.defineProperty(exports,'__esModule',{value:true});};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if((mode&4)&&typeof value==='object'&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,'default',{enumerable:true,value:value});if(mode&2&&typeof value!='string')for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key];}.bind(null,key));return ns;};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module['default'];}:function getModuleExports(){return module;};__webpack_require__.d(getter,'a',getter);return getter;};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=2);})
([(function(module,exports,__webpack_require__){"use strict";var __extends=(this&&this.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();Object.defineProperty(exports,"__esModule",{value:true});var INVALID_BYTE=256;var Coder=(function(){function Coder(_paddingCharacter){if(_paddingCharacter===void 0){_paddingCharacter="=";}
this._paddingCharacter=_paddingCharacter;}
Coder.prototype.encodedLength=function(length){if(!this._paddingCharacter){return(length*8+5)/6|0;}
return(length+2)/3*4|0;};Coder.prototype.encode=function(data){var out="";var i=0;for(;i<data.length-2;i+=3){var c=(data[i]<<16)|(data[i+1]<<8)|(data[i+2]);out+=this._encodeByte((c>>>3*6)&63);out+=this._encodeByte((c>>>2*6)&63);out+=this._encodeByte((c>>>1*6)&63);out+=this._encodeByte((c>>>0*6)&63);}
var left=data.length-i;if(left>0){var c=(data[i]<<16)|(left===2?data[i+1]<<8:0);out+=this._encodeByte((c>>>3*6)&63);out+=this._encodeByte((c>>>2*6)&63);if(left===2){out+=this._encodeByte((c>>>1*6)&63);}
else{out+=this._paddingCharacter||"";}
out+=this._paddingCharacter||"";}
return out;};Coder.prototype.maxDecodedLength=function(length){if(!this._paddingCharacter){return(length*6+7)/8|0;}
return length/4*3|0;};Coder.prototype.decodedLength=function(s){return this.maxDecodedLength(s.length-this._getPaddingLength(s));};Coder.prototype.decode=function(s){if(s.length===0){return new Uint8Array(0);}
var paddingLength=this._getPaddingLength(s);var length=s.length-paddingLength;var out=new Uint8Array(this.maxDecodedLength(length));var op=0;var i=0;var haveBad=0;var v0=0,v1=0,v2=0,v3=0;for(;i<length-4;i+=4){v0=this._decodeChar(s.charCodeAt(i+0));v1=this._decodeChar(s.charCodeAt(i+1));v2=this._decodeChar(s.charCodeAt(i+2));v3=this._decodeChar(s.charCodeAt(i+3));out[op++]=(v0<<2)|(v1>>>4);out[op++]=(v1<<4)|(v2>>>2);out[op++]=(v2<<6)|v3;haveBad|=v0&INVALID_BYTE;haveBad|=v1&INVALID_BYTE;haveBad|=v2&INVALID_BYTE;haveBad|=v3&INVALID_BYTE;}
if(i<length-1){v0=this._decodeChar(s.charCodeAt(i));v1=this._decodeChar(s.charCodeAt(i+1));out[op++]=(v0<<2)|(v1>>>4);haveBad|=v0&INVALID_BYTE;haveBad|=v1&INVALID_BYTE;}
if(i<length-2){v2=this._decodeChar(s.charCodeAt(i+2));out[op++]=(v1<<4)|(v2>>>2);haveBad|=v2&INVALID_BYTE;}
if(i<length-3){v3=this._decodeChar(s.charCodeAt(i+3));out[op++]=(v2<<6)|v3;haveBad|=v3&INVALID_BYTE;}
if(haveBad!==0){throw new Error("Base64Coder: incorrect characters for decoding");}
return out;};Coder.prototype._encodeByte=function(b){var result=b;result+=65;result+=((25-b)>>>8)&((0-65)-26+97);result+=((51-b)>>>8)&((26-97)-52+48);result+=((61-b)>>>8)&((52-48)-62+43);result+=((62-b)>>>8)&((62-43)-63+47);return String.fromCharCode(result);};Coder.prototype._decodeChar=function(c){var result=INVALID_BYTE;result+=(((42-c)&(c-44))>>>8)&(-INVALID_BYTE+c-43+62);result+=(((46-c)&(c-48))>>>8)&(-INVALID_BYTE+c-47+63);result+=(((47-c)&(c-58))>>>8)&(-INVALID_BYTE+c-48+52);result+=(((64-c)&(c-91))>>>8)&(-INVALID_BYTE+c-65+0);result+=(((96-c)&(c-123))>>>8)&(-INVALID_BYTE+c-97+26);return result;};Coder.prototype._getPaddingLength=function(s){var paddingLength=0;if(this._paddingCharacter){for(var i=s.length-1;i>=0;i--){if(s[i]!==this._paddingCharacter){break;}
paddingLength++;}
if(s.length<4||paddingLength>2){throw new Error("Base64Coder: incorrect padding");}}
return paddingLength;};return Coder;}());exports.Coder=Coder;var stdCoder=new Coder();function encode(data){return stdCoder.encode(data);}
exports.encode=encode;function decode(s){return stdCoder.decode(s);}
exports.decode=decode;var URLSafeCoder=(function(_super){__extends(URLSafeCoder,_super);function URLSafeCoder(){return _super!==null&&_super.apply(this,arguments)||this;}
URLSafeCoder.prototype._encodeByte=function(b){var result=b;result+=65;result+=((25-b)>>>8)&((0-65)-26+97);result+=((51-b)>>>8)&((26-97)-52+48);result+=((61-b)>>>8)&((52-48)-62+45);result+=((62-b)>>>8)&((62-45)-63+95);return String.fromCharCode(result);};URLSafeCoder.prototype._decodeChar=function(c){var result=INVALID_BYTE;result+=(((44-c)&(c-46))>>>8)&(-INVALID_BYTE+c-45+62);result+=(((94-c)&(c-96))>>>8)&(-INVALID_BYTE+c-95+63);result+=(((47-c)&(c-58))>>>8)&(-INVALID_BYTE+c-48+52);result+=(((64-c)&(c-91))>>>8)&(-INVALID_BYTE+c-65+0);result+=(((96-c)&(c-123))>>>8)&(-INVALID_BYTE+c-97+26);return result;};return URLSafeCoder;}(Coder));exports.URLSafeCoder=URLSafeCoder;var urlSafeCoder=new URLSafeCoder();function encodeURLSafe(data){return urlSafeCoder.encode(data);}
exports.encodeURLSafe=encodeURLSafe;function decodeURLSafe(s){return urlSafeCoder.decode(s);}
exports.decodeURLSafe=decodeURLSafe;exports.encodedLength=function(length){return stdCoder.encodedLength(length);};exports.maxDecodedLength=function(length){return stdCoder.maxDecodedLength(length);};exports.decodedLength=function(s){return stdCoder.decodedLength(s);};}),(function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var INVALID_UTF16="utf8: invalid string";var INVALID_UTF8="utf8: invalid source encoding";function encode(s){var arr=new Uint8Array(encodedLength(s));var pos=0;for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);if(c<0x80){arr[pos++]=c;}
else if(c<0x800){arr[pos++]=0xc0|c>>6;arr[pos++]=0x80|c&0x3f;}
else if(c<0xd800){arr[pos++]=0xe0|c>>12;arr[pos++]=0x80|(c>>6)&0x3f;arr[pos++]=0x80|c&0x3f;}
else{i++;c=(c&0x3ff)<<10;c|=s.charCodeAt(i)&0x3ff;c+=0x10000;arr[pos++]=0xf0|c>>18;arr[pos++]=0x80|(c>>12)&0x3f;arr[pos++]=0x80|(c>>6)&0x3f;arr[pos++]=0x80|c&0x3f;}}
return arr;}
exports.encode=encode;function encodedLength(s){var result=0;for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);if(c<0x80){result+=1;}
else if(c<0x800){result+=2;}
else if(c<0xd800){result+=3;}
else if(c<=0xdfff){if(i>=s.length-1){throw new Error(INVALID_UTF16);}
i++;result+=4;}
else{throw new Error(INVALID_UTF16);}}
return result;}
exports.encodedLength=encodedLength;function decode(arr){var chars=[];for(var i=0;i<arr.length;i++){var b=arr[i];if(b&0x80){var min=void 0;if(b<0xe0){if(i>=arr.length){throw new Error(INVALID_UTF8);}
var n1=arr[++i];if((n1&0xc0)!==0x80){throw new Error(INVALID_UTF8);}
b=(b&0x1f)<<6|(n1&0x3f);min=0x80;}
else if(b<0xf0){if(i>=arr.length-1){throw new Error(INVALID_UTF8);}
var n1=arr[++i];var n2=arr[++i];if((n1&0xc0)!==0x80||(n2&0xc0)!==0x80){throw new Error(INVALID_UTF8);}
b=(b&0x0f)<<12|(n1&0x3f)<<6|(n2&0x3f);min=0x800;}
else if(b<0xf8){if(i>=arr.length-2){throw new Error(INVALID_UTF8);}
var n1=arr[++i];var n2=arr[++i];var n3=arr[++i];if((n1&0xc0)!==0x80||(n2&0xc0)!==0x80||(n3&0xc0)!==0x80){throw new Error(INVALID_UTF8);}
b=(b&0x0f)<<18|(n1&0x3f)<<12|(n2&0x3f)<<6|(n3&0x3f);min=0x10000;}
else{throw new Error(INVALID_UTF8);}
if(b<min||(b>=0xd800&&b<=0xdfff)){throw new Error(INVALID_UTF8);}
if(b>=0x10000){if(b>0x10ffff){throw new Error(INVALID_UTF8);}
b-=0x10000;chars.push(String.fromCharCode(0xd800|(b>>10)));b=0xdc00|(b&0x3ff);}}
chars.push(String.fromCharCode(b));}
return chars.join("");}
exports.decode=decode;}),(function(module,exports,__webpack_require__){module.exports=__webpack_require__(3).default;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var ScriptReceiverFactory=(function(){function ScriptReceiverFactory(prefix,name){this.lastId=0;this.prefix=prefix;this.name=name;}
ScriptReceiverFactory.prototype.create=function(callback){this.lastId++;var number=this.lastId;var id=this.prefix+number;var name=this.name+'['+number+']';var called=false;var callbackWrapper=function(){if(!called){callback.apply(null,arguments);called=true;}};this[number]=callbackWrapper;return{number:number,id:id,name:name,callback:callbackWrapper};};ScriptReceiverFactory.prototype.remove=function(receiver){delete this[receiver.number];};return ScriptReceiverFactory;}());var ScriptReceivers=new ScriptReceiverFactory('_pusher_script_','Pusher.ScriptReceivers');var Defaults={VERSION:"7.0.6",PROTOCOL:7,wsPort:80,wssPort:443,wsPath:'',httpHost:'sockjs.pusher.com',httpPort:80,httpsPort:443,httpPath:'/pusher',stats_host:'stats.pusher.com',authEndpoint:'/pusher/auth',authTransport:'ajax',activityTimeout:120000,pongTimeout:30000,unavailableTimeout:10000,cluster:'mt1',cdn_http:"http://js.pusher.com",cdn_https:"https://js.pusher.com",dependency_suffix:""};var defaults=(Defaults);var dependency_loader_DependencyLoader=(function(){function DependencyLoader(options){this.options=options;this.receivers=options.receivers||ScriptReceivers;this.loading={};}
DependencyLoader.prototype.load=function(name,options,callback){var self=this;if(self.loading[name]&&self.loading[name].length>0){self.loading[name].push(callback);}
else{self.loading[name]=[callback];var request=runtime.createScriptRequest(self.getPath(name,options));var receiver=self.receivers.create(function(error){self.receivers.remove(receiver);if(self.loading[name]){var callbacks=self.loading[name];delete self.loading[name];var successCallback=function(wasSuccessful){if(!wasSuccessful){request.cleanup();}};for(var i=0;i<callbacks.length;i++){callbacks[i](error,successCallback);}}});request.send(receiver);}};DependencyLoader.prototype.getRoot=function(options){var cdn;var protocol=runtime.getDocument().location.protocol;if((options&&options.useTLS)||protocol==='https:'){cdn=this.options.cdn_https;}
else{cdn=this.options.cdn_http;}
return cdn.replace(/\/*$/,'')+'/'+this.options.version;};DependencyLoader.prototype.getPath=function(name,options){return this.getRoot(options)+'/'+name+this.options.suffix+'.js';};return DependencyLoader;}());var dependency_loader=(dependency_loader_DependencyLoader);var DependenciesReceivers=new ScriptReceiverFactory('_pusher_dependencies','Pusher.DependenciesReceivers');var Dependencies=new dependency_loader({cdn_http:defaults.cdn_http,cdn_https:defaults.cdn_https,version:defaults.VERSION,suffix:defaults.dependency_suffix,receivers:DependenciesReceivers});var urlStore={baseUrl:'https://pusher.com',urls:{authenticationEndpoint:{path:'/docs/authenticating_users'},javascriptQuickStart:{path:'/docs/javascript_quick_start'},triggeringClientEvents:{path:'/docs/client_api_guide/client_events#trigger-events'},encryptedChannelSupport:{fullUrl:'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support'}}};var buildLogSuffix=function(key){var urlPrefix='See:';var urlObj=urlStore.urls[key];if(!urlObj)
return '';var url;if(urlObj.fullUrl){url=urlObj.fullUrl;}
else if(urlObj.path){url=urlStore.baseUrl+urlObj.path;}
if(!url)
return '';return urlPrefix+" "+url;};var url_store=({buildLogSuffix:buildLogSuffix});var __extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var BadEventName=(function(_super){__extends(BadEventName,_super);function BadEventName(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return BadEventName;}(Error));var RequestTimedOut=(function(_super){__extends(RequestTimedOut,_super);function RequestTimedOut(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return RequestTimedOut;}(Error));var TransportPriorityTooLow=(function(_super){__extends(TransportPriorityTooLow,_super);function TransportPriorityTooLow(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return TransportPriorityTooLow;}(Error));var TransportClosed=(function(_super){__extends(TransportClosed,_super);function TransportClosed(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return TransportClosed;}(Error));var UnsupportedFeature=(function(_super){__extends(UnsupportedFeature,_super);function UnsupportedFeature(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return UnsupportedFeature;}(Error));var UnsupportedTransport=(function(_super){__extends(UnsupportedTransport,_super);function UnsupportedTransport(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return UnsupportedTransport;}(Error));var UnsupportedStrategy=(function(_super){__extends(UnsupportedStrategy,_super);function UnsupportedStrategy(msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return UnsupportedStrategy;}(Error));var HTTPAuthError=(function(_super){__extends(HTTPAuthError,_super);function HTTPAuthError(status,msg){var _newTarget=this.constructor;var _this=_super.call(this,msg)||this;_this.status=status;Object.setPrototypeOf(_this,_newTarget.prototype);return _this;}
return HTTPAuthError;}(Error));var ajax=function(context,socketId,callback){var self=this,xhr;xhr=runtime.createXHR();xhr.open('POST',self.options.authEndpoint,true);xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');for(var headerName in this.authOptions.headers){xhr.setRequestHeader(headerName,this.authOptions.headers[headerName]);}
xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){var data=void 0;var parsed=false;try{data=JSON.parse(xhr.responseText);parsed=true;}
catch(e){callback(new HTTPAuthError(200,'JSON returned from auth endpoint was invalid, yet status code was 200. Data was: '+
xhr.responseText),{auth:''});}
if(parsed){callback(null,data);}}
else{var suffix=url_store.buildLogSuffix('authenticationEndpoint');callback(new HTTPAuthError(xhr.status,'Unable to retrieve auth string from auth endpoint - '+
("received status: "+xhr.status+" from "+self.options.authEndpoint+". ")+
("Clients must be authenticated to join private or presence channels. "+suffix)),{auth:''});}}};xhr.send(this.composeQuery(socketId));return xhr;};var xhr_auth=(ajax);function encode(s){return btoa(utob(s));}
var fromCharCode=String.fromCharCode;var b64chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var b64tab={};for(var base64_i=0,l=b64chars.length;base64_i<l;base64_i++){b64tab[b64chars.charAt(base64_i)]=base64_i;}
var cb_utob=function(c){var cc=c.charCodeAt(0);return cc<0x80?c:cc<0x800?fromCharCode(0xc0|(cc>>>6))+fromCharCode(0x80|(cc&0x3f)):fromCharCode(0xe0|((cc>>>12)&0x0f))+
fromCharCode(0x80|((cc>>>6)&0x3f))+
fromCharCode(0x80|(cc&0x3f));};var utob=function(u){return u.replace(/[^\x00-\x7F]/g,cb_utob);};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3];var ord=(ccc.charCodeAt(0)<<16)|((ccc.length>1?ccc.charCodeAt(1):0)<<8)|(ccc.length>2?ccc.charCodeAt(2):0);var chars=[b64chars.charAt(ord>>>18),b64chars.charAt((ord>>>12)&63),padlen>=2?'=':b64chars.charAt((ord>>>6)&63),padlen>=1?'=':b64chars.charAt(ord&63)];return chars.join('');};var btoa=window.btoa||function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode);};var Timer=(function(){function Timer(set,clear,delay,callback){var _this=this;this.clear=clear;this.timer=set(function(){if(_this.timer){_this.timer=callback(_this.timer);}},delay);}
Timer.prototype.isRunning=function(){return this.timer!==null;};Timer.prototype.ensureAborted=function(){if(this.timer){this.clear(this.timer);this.timer=null;}};return Timer;}());var abstract_timer=(Timer);var timers_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();function timers_clearTimeout(timer){window.clearTimeout(timer);}
function timers_clearInterval(timer){window.clearInterval(timer);}
var OneOffTimer=(function(_super){timers_extends(OneOffTimer,_super);function OneOffTimer(delay,callback){return _super.call(this,setTimeout,timers_clearTimeout,delay,function(timer){callback();return null;})||this;}
return OneOffTimer;}(abstract_timer));var PeriodicTimer=(function(_super){timers_extends(PeriodicTimer,_super);function PeriodicTimer(delay,callback){return _super.call(this,setInterval,timers_clearInterval,delay,function(timer){callback();return timer;})||this;}
return PeriodicTimer;}(abstract_timer));var Util={now:function(){if(Date.now){return Date.now();}
else{return new Date().valueOf();}},defer:function(callback){return new OneOffTimer(0,callback);},method:function(name){var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i];}
var boundArguments=Array.prototype.slice.call(arguments,1);return function(object){return object[name].apply(object,boundArguments.concat(arguments));};}};var util=(Util);function extend(target){var sources=[];for(var _i=1;_i<arguments.length;_i++){sources[_i-1]=arguments[_i];}
for(var i=0;i<sources.length;i++){var extensions=sources[i];for(var property in extensions){if(extensions[property]&&extensions[property].constructor&&extensions[property].constructor===Object){target[property]=extend(target[property]||{},extensions[property]);}
else{target[property]=extensions[property];}}}
return target;}
function stringify(){var m=['Pusher'];for(var i=0;i<arguments.length;i++){if(typeof arguments[i]==='string'){m.push(arguments[i]);}
else{m.push(safeJSONStringify(arguments[i]));}}
return m.join(' : ');}
function arrayIndexOf(array,item){var nativeIndexOf=Array.prototype.indexOf;if(array===null){return-1;}
if(nativeIndexOf&&array.indexOf===nativeIndexOf){return array.indexOf(item);}
for(var i=0,l=array.length;i<l;i++){if(array[i]===item){return i;}}
return-1;}
function objectApply(object,f){for(var key in object){if(Object.prototype.hasOwnProperty.call(object,key)){f(object[key],key,object);}}}
function keys(object){var keys=[];objectApply(object,function(_,key){keys.push(key);});return keys;}
function values(object){var values=[];objectApply(object,function(value){values.push(value);});return values;}
function apply(array,f,context){for(var i=0;i<array.length;i++){f.call(context||window,array[i],i,array);}}
function map(array,f){var result=[];for(var i=0;i<array.length;i++){result.push(f(array[i],i,array,result));}
return result;}
function mapObject(object,f){var result={};objectApply(object,function(value,key){result[key]=f(value);});return result;}
function filter(array,test){test=test||function(value){return!!value;};var result=[];for(var i=0;i<array.length;i++){if(test(array[i],i,array,result)){result.push(array[i]);}}
return result;}
function filterObject(object,test){var result={};objectApply(object,function(value,key){if((test&&test(value,key,object,result))||Boolean(value)){result[key]=value;}});return result;}
function flatten(object){var result=[];objectApply(object,function(value,key){result.push([key,value]);});return result;}
function any(array,test){for(var i=0;i<array.length;i++){if(test(array[i],i,array)){return true;}}
return false;}
function collections_all(array,test){for(var i=0;i<array.length;i++){if(!test(array[i],i,array)){return false;}}
return true;}
function encodeParamsObject(data){return mapObject(data,function(value){if(typeof value==='object'){value=safeJSONStringify(value);}
return encodeURIComponent(encode(value.toString()));});}
function buildQueryString(data){var params=filterObject(data,function(value){return value!==undefined;});var query=map(flatten(encodeParamsObject(params)),util.method('join','=')).join('&');return query;}
function decycleObject(object){var objects=[],paths=[];return(function derez(value,path){var i,name,nu;switch(typeof value){case 'object':if(!value){return null;}
for(i=0;i<objects.length;i+=1){if(objects[i]===value){return{$ref:paths[i]};}}
objects.push(value);paths.push(path);if(Object.prototype.toString.apply(value)==='[object Array]'){nu=[];for(i=0;i<value.length;i+=1){nu[i]=derez(value[i],path+'['+i+']');}}
else{nu={};for(name in value){if(Object.prototype.hasOwnProperty.call(value,name)){nu[name]=derez(value[name],path+'['+JSON.stringify(name)+']');}}}
return nu;case 'number':case 'string':case 'boolean':return value;}})(object,'$');}
function safeJSONStringify(source){try{return JSON.stringify(source);}
catch(e){return JSON.stringify(decycleObject(source));}}
var logger_Logger=(function(){function Logger(){this.globalLog=function(message){if(window.console&&window.console.log){window.console.log(message);}};}
Logger.prototype.debug=function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}
this.log(this.globalLog,args);};Logger.prototype.warn=function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}
this.log(this.globalLogWarn,args);};Logger.prototype.error=function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}
this.log(this.globalLogError,args);};Logger.prototype.globalLogWarn=function(message){if(window.console&&window.console.warn){window.console.warn(message);}
else{this.globalLog(message);}};Logger.prototype.globalLogError=function(message){if(window.console&&window.console.error){window.console.error(message);}
else{this.globalLogWarn(message);}};Logger.prototype.log=function(defaultLoggingFunction){var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i];}
var message=stringify.apply(this,arguments);if(core_pusher.log){core_pusher.log(message);}
else if(core_pusher.logToConsole){var log=defaultLoggingFunction.bind(this);log(message);}};return Logger;}());var logger=(new logger_Logger());var jsonp=function(context,socketId,callback){if(this.authOptions.headers!==undefined){logger.warn('To send headers with the auth request, you must use AJAX, rather than JSONP.');}
var callbackName=context.nextAuthCallbackID.toString();context.nextAuthCallbackID++;var document=context.getDocument();var script=document.createElement('script');context.auth_callbacks[callbackName]=function(data){callback(null,data);};var callback_name="Pusher.auth_callbacks['"+callbackName+"']";script.src=this.options.authEndpoint+
'?callback='+
encodeURIComponent(callback_name)+
'&'+
this.composeQuery(socketId);var head=document.getElementsByTagName('head')[0]||document.documentElement;head.insertBefore(script,head.firstChild);};var jsonp_auth=(jsonp);var ScriptRequest=(function(){function ScriptRequest(src){this.src=src;}
ScriptRequest.prototype.send=function(receiver){var self=this;var errorString='Error loading '+self.src;self.script=document.createElement('script');self.script.id=receiver.id;self.script.src=self.src;self.script.type='text/javascript';self.script.charset='UTF-8';if(self.script.addEventListener){self.script.onerror=function(){receiver.callback(errorString);};self.script.onload=function(){receiver.callback(null);};}
else{self.script.onreadystatechange=function(){if(self.script.readyState==='loaded'||self.script.readyState==='complete'){receiver.callback(null);}};}
if(self.script.async===undefined&&document.attachEvent&&/opera/i.test(navigator.userAgent)){self.errorScript=document.createElement('script');self.errorScript.id=receiver.id+'_error';self.errorScript.text=receiver.name+"('"+errorString+"');";self.script.async=self.errorScript.async=false;}
else{self.script.async=true;}
var head=document.getElementsByTagName('head')[0];head.insertBefore(self.script,head.firstChild);if(self.errorScript){head.insertBefore(self.errorScript,self.script.nextSibling);}};ScriptRequest.prototype.cleanup=function(){if(this.script){this.script.onload=this.script.onerror=null;this.script.onreadystatechange=null;}
if(this.script&&this.script.parentNode){this.script.parentNode.removeChild(this.script);}
if(this.errorScript&&this.errorScript.parentNode){this.errorScript.parentNode.removeChild(this.errorScript);}
this.script=null;this.errorScript=null;};return ScriptRequest;}());var script_request=(ScriptRequest);var jsonp_request_JSONPRequest=(function(){function JSONPRequest(url,data){this.url=url;this.data=data;}
JSONPRequest.prototype.send=function(receiver){if(this.request){return;}
var query=buildQueryString(this.data);var url=this.url+'/'+receiver.number+'?'+query;this.request=runtime.createScriptRequest(url);this.request.send(receiver);};JSONPRequest.prototype.cleanup=function(){if(this.request){this.request.cleanup();}};return JSONPRequest;}());var jsonp_request=(jsonp_request_JSONPRequest);var getAgent=function(sender,useTLS){return function(data,callback){var scheme='http'+(useTLS?'s':'')+'://';var url=scheme+(sender.host||sender.options.host)+sender.options.path;var request=runtime.createJSONPRequest(url,data);var receiver=runtime.ScriptReceivers.create(function(error,result){ScriptReceivers.remove(receiver);request.cleanup();if(result&&result.host){sender.host=result.host;}
if(callback){callback(error,result);}});request.send(receiver);};};var jsonp_timeline_jsonp={name:'jsonp',getAgent:getAgent};var jsonp_timeline=(jsonp_timeline_jsonp);function getGenericURL(baseScheme,params,path){var scheme=baseScheme+(params.useTLS?'s':'');var host=params.useTLS?params.hostTLS:params.hostNonTLS;return scheme+'://'+host+path;}
function getGenericPath(key,queryString){var path='/app/'+key;var query='?protocol='+
defaults.PROTOCOL+
'&client=js'+
'&version='+
defaults.VERSION+
(queryString?'&'+queryString:'');return path+query;}
var ws={getInitial:function(key,params){var path=(params.httpPath||'')+getGenericPath(key,'flash=false');return getGenericURL('ws',params,path);}};var http={getInitial:function(key,params){var path=(params.httpPath||'/pusher')+getGenericPath(key);return getGenericURL('http',params,path);}};var sockjs={getInitial:function(key,params){return getGenericURL('http',params,params.httpPath||'/pusher');},getPath:function(key,params){return getGenericPath(key);}};var callback_registry_CallbackRegistry=(function(){function CallbackRegistry(){this._callbacks={};}
CallbackRegistry.prototype.get=function(name){return this._callbacks[prefix(name)];};CallbackRegistry.prototype.add=function(name,callback,context){var prefixedEventName=prefix(name);this._callbacks[prefixedEventName]=this._callbacks[prefixedEventName]||[];this._callbacks[prefixedEventName].push({fn:callback,context:context});};CallbackRegistry.prototype.remove=function(name,callback,context){if(!name&&!callback&&!context){this._callbacks={};return;}
var names=name?[prefix(name)]:keys(this._callbacks);if(callback||context){this.removeCallback(names,callback,context);}
else{this.removeAllCallbacks(names);}};CallbackRegistry.prototype.removeCallback=function(names,callback,context){apply(names,function(name){this._callbacks[name]=filter(this._callbacks[name]||[],function(binding){return((callback&&callback!==binding.fn)||(context&&context!==binding.context));});if(this._callbacks[name].length===0){delete this._callbacks[name];}},this);};CallbackRegistry.prototype.removeAllCallbacks=function(names){apply(names,function(name){delete this._callbacks[name];},this);};return CallbackRegistry;}());var callback_registry=(callback_registry_CallbackRegistry);function prefix(name){return '_'+name;}
var dispatcher_Dispatcher=(function(){function Dispatcher(failThrough){this.callbacks=new callback_registry();this.global_callbacks=[];this.failThrough=failThrough;}
Dispatcher.prototype.bind=function(eventName,callback,context){this.callbacks.add(eventName,callback,context);return this;};Dispatcher.prototype.bind_global=function(callback){this.global_callbacks.push(callback);return this;};Dispatcher.prototype.unbind=function(eventName,callback,context){this.callbacks.remove(eventName,callback,context);return this;};Dispatcher.prototype.unbind_global=function(callback){if(!callback){this.global_callbacks=[];return this;}
this.global_callbacks=filter(this.global_callbacks||[],function(c){return c!==callback;});return this;};Dispatcher.prototype.unbind_all=function(){this.unbind();this.unbind_global();return this;};Dispatcher.prototype.emit=function(eventName,data,metadata){for(var i=0;i<this.global_callbacks.length;i++){this.global_callbacks[i](eventName,data);}
var callbacks=this.callbacks.get(eventName);var args=[];if(metadata){args.push(data,metadata);}
else if(data){args.push(data);}
if(callbacks&&callbacks.length>0){for(var i=0;i<callbacks.length;i++){callbacks[i].fn.apply(callbacks[i].context||window,args);}}
else if(this.failThrough){this.failThrough(eventName,data);}
return this;};return Dispatcher;}());var dispatcher=(dispatcher_Dispatcher);var transport_connection_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var transport_connection_TransportConnection=(function(_super){transport_connection_extends(TransportConnection,_super);function TransportConnection(hooks,name,priority,key,options){var _this=_super.call(this)||this;_this.initialize=runtime.transportConnectionInitializer;_this.hooks=hooks;_this.name=name;_this.priority=priority;_this.key=key;_this.options=options;_this.state='new';_this.timeline=options.timeline;_this.activityTimeout=options.activityTimeout;_this.id=_this.timeline.generateUniqueID();return _this;}
TransportConnection.prototype.handlesActivityChecks=function(){return Boolean(this.hooks.handlesActivityChecks);};TransportConnection.prototype.supportsPing=function(){return Boolean(this.hooks.supportsPing);};TransportConnection.prototype.connect=function(){var _this=this;if(this.socket||this.state!=='initialized'){return false;}
var url=this.hooks.urls.getInitial(this.key,this.options);try{this.socket=this.hooks.getSocket(url,this.options);}
catch(e){util.defer(function(){_this.onError(e);_this.changeState('closed');});return false;}
this.bindListeners();logger.debug('Connecting',{transport:this.name,url:url});this.changeState('connecting');return true;};TransportConnection.prototype.close=function(){if(this.socket){this.socket.close();return true;}
else{return false;}};TransportConnection.prototype.send=function(data){var _this=this;if(this.state==='open'){util.defer(function(){if(_this.socket){_this.socket.send(data);}});return true;}
else{return false;}};TransportConnection.prototype.ping=function(){if(this.state==='open'&&this.supportsPing()){this.socket.ping();}};TransportConnection.prototype.onOpen=function(){if(this.hooks.beforeOpen){this.hooks.beforeOpen(this.socket,this.hooks.urls.getPath(this.key,this.options));}
this.changeState('open');this.socket.onopen=undefined;};TransportConnection.prototype.onError=function(error){this.emit('error',{type:'WebSocketError',error:error});this.timeline.error(this.buildTimelineMessage({error:error.toString()}));};TransportConnection.prototype.onClose=function(closeEvent){if(closeEvent){this.changeState('closed',{code:closeEvent.code,reason:closeEvent.reason,wasClean:closeEvent.wasClean});}
else{this.changeState('closed');}
this.unbindListeners();this.socket=undefined;};TransportConnection.prototype.onMessage=function(message){this.emit('message',message);};TransportConnection.prototype.onActivity=function(){this.emit('activity');};TransportConnection.prototype.bindListeners=function(){var _this=this;this.socket.onopen=function(){_this.onOpen();};this.socket.onerror=function(error){_this.onError(error);};this.socket.onclose=function(closeEvent){_this.onClose(closeEvent);};this.socket.onmessage=function(message){_this.onMessage(message);};if(this.supportsPing()){this.socket.onactivity=function(){_this.onActivity();};}};TransportConnection.prototype.unbindListeners=function(){if(this.socket){this.socket.onopen=undefined;this.socket.onerror=undefined;this.socket.onclose=undefined;this.socket.onmessage=undefined;if(this.supportsPing()){this.socket.onactivity=undefined;}}};TransportConnection.prototype.changeState=function(state,params){this.state=state;this.timeline.info(this.buildTimelineMessage({state:state,params:params}));this.emit(state,params);};TransportConnection.prototype.buildTimelineMessage=function(message){return extend({cid:this.id},message);};return TransportConnection;}(dispatcher));var transport_connection=(transport_connection_TransportConnection);var transport_Transport=(function(){function Transport(hooks){this.hooks=hooks;}
Transport.prototype.isSupported=function(environment){return this.hooks.isSupported(environment);};Transport.prototype.createConnection=function(name,priority,key,options){return new transport_connection(this.hooks,name,priority,key,options);};return Transport;}());var transports_transport=(transport_Transport);var WSTransport=new transports_transport({urls:ws,handlesActivityChecks:false,supportsPing:false,isInitialized:function(){return Boolean(runtime.getWebSocketAPI());},isSupported:function(){return Boolean(runtime.getWebSocketAPI());},getSocket:function(url){return runtime.createWebSocket(url);}});var httpConfiguration={urls:http,handlesActivityChecks:false,supportsPing:true,isInitialized:function(){return true;}};var streamingConfiguration=extend({getSocket:function(url){return runtime.HTTPFactory.createStreamingSocket(url);}},httpConfiguration);var pollingConfiguration=extend({getSocket:function(url){return runtime.HTTPFactory.createPollingSocket(url);}},httpConfiguration);var xhrConfiguration={isSupported:function(){return runtime.isXHRSupported();}};var XHRStreamingTransport=new transports_transport((extend({},streamingConfiguration,xhrConfiguration)));var XHRPollingTransport=new transports_transport(extend({},pollingConfiguration,xhrConfiguration));var Transports={ws:WSTransport,xhr_streaming:XHRStreamingTransport,xhr_polling:XHRPollingTransport};var transports=(Transports);var SockJSTransport=new transports_transport({file:'sockjs',urls:sockjs,handlesActivityChecks:true,supportsPing:false,isSupported:function(){return true;},isInitialized:function(){return window.SockJS!==undefined;},getSocket:function(url,options){return new window.SockJS(url,null,{js_path:Dependencies.getPath('sockjs',{useTLS:options.useTLS}),ignore_null_origin:options.ignoreNullOrigin});},beforeOpen:function(socket,path){socket.send(JSON.stringify({path:path}));}});var xdrConfiguration={isSupported:function(environment){var yes=runtime.isXDRSupported(environment.useTLS);return yes;}};var XDRStreamingTransport=new transports_transport((extend({},streamingConfiguration,xdrConfiguration)));var XDRPollingTransport=new transports_transport(extend({},pollingConfiguration,xdrConfiguration));transports.xdr_streaming=XDRStreamingTransport;transports.xdr_polling=XDRPollingTransport;transports.sockjs=SockJSTransport;var transports_transports=(transports);var net_info_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var NetInfo=(function(_super){net_info_extends(NetInfo,_super);function NetInfo(){var _this=_super.call(this)||this;var self=_this;if(window.addEventListener!==undefined){window.addEventListener('online',function(){self.emit('online');},false);window.addEventListener('offline',function(){self.emit('offline');},false);}
return _this;}
NetInfo.prototype.isOnline=function(){if(window.navigator.onLine===undefined){return true;}
else{return window.navigator.onLine;}};return NetInfo;}(dispatcher));var net_info_Network=new NetInfo();var assistant_to_the_transport_manager_AssistantToTheTransportManager=(function(){function AssistantToTheTransportManager(manager,transport,options){this.manager=manager;this.transport=transport;this.minPingDelay=options.minPingDelay;this.maxPingDelay=options.maxPingDelay;this.pingDelay=undefined;}
AssistantToTheTransportManager.prototype.createConnection=function(name,priority,key,options){var _this=this;options=extend({},options,{activityTimeout:this.pingDelay});var connection=this.transport.createConnection(name,priority,key,options);var openTimestamp=null;var onOpen=function(){connection.unbind('open',onOpen);connection.bind('closed',onClosed);openTimestamp=util.now();};var onClosed=function(closeEvent){connection.unbind('closed',onClosed);if(closeEvent.code===1002||closeEvent.code===1003){_this.manager.reportDeath();}
else if(!closeEvent.wasClean&&openTimestamp){var lifespan=util.now()-openTimestamp;if(lifespan<2*_this.maxPingDelay){_this.manager.reportDeath();_this.pingDelay=Math.max(lifespan/2,_this.minPingDelay);}}};connection.bind('open',onOpen);return connection;};AssistantToTheTransportManager.prototype.isSupported=function(environment){return this.manager.isAlive()&&this.transport.isSupported(environment);};return AssistantToTheTransportManager;}());var assistant_to_the_transport_manager=(assistant_to_the_transport_manager_AssistantToTheTransportManager);var Protocol={decodeMessage:function(messageEvent){try{var messageData=JSON.parse(messageEvent.data);var pusherEventData=messageData.data;if(typeof pusherEventData==='string'){try{pusherEventData=JSON.parse(messageData.data);}
catch(e){}}
var pusherEvent={event:messageData.event,channel:messageData.channel,data:pusherEventData};if(messageData.user_id){pusherEvent.user_id=messageData.user_id;}
return pusherEvent;}
catch(e){throw{type:'MessageParseError',error:e,data:messageEvent.data};}},encodeMessage:function(event){return JSON.stringify(event);},processHandshake:function(messageEvent){var message=Protocol.decodeMessage(messageEvent);if(message.event==='pusher:connection_established'){if(!message.data.activity_timeout){throw 'No activity timeout specified in handshake';}
return{action:'connected',id:message.data.socket_id,activityTimeout:message.data.activity_timeout*1000};}
else if(message.event==='pusher:error'){return{action:this.getCloseAction(message.data),error:this.getCloseError(message.data)};}
else{throw 'Invalid handshake';}},getCloseAction:function(closeEvent){if(closeEvent.code<4000){if(closeEvent.code>=1002&&closeEvent.code<=1004){return 'backoff';}
else{return null;}}
else if(closeEvent.code===4000){return 'tls_only';}
else if(closeEvent.code<4100){return 'refused';}
else if(closeEvent.code<4200){return 'backoff';}
else if(closeEvent.code<4300){return 'retry';}
else{return 'refused';}},getCloseError:function(closeEvent){if(closeEvent.code!==1000&&closeEvent.code!==1001){return{type:'PusherError',data:{code:closeEvent.code,message:closeEvent.reason||closeEvent.message}};}
else{return null;}}};var protocol_protocol=(Protocol);var connection_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var connection_Connection=(function(_super){connection_extends(Connection,_super);function Connection(id,transport){var _this=_super.call(this)||this;_this.id=id;_this.transport=transport;_this.activityTimeout=transport.activityTimeout;_this.bindListeners();return _this;}
Connection.prototype.handlesActivityChecks=function(){return this.transport.handlesActivityChecks();};Connection.prototype.send=function(data){return this.transport.send(data);};Connection.prototype.send_event=function(name,data,channel){var event={event:name,data:data};if(channel){event.channel=channel;}
logger.debug('Event sent',event);return this.send(protocol_protocol.encodeMessage(event));};Connection.prototype.ping=function(){if(this.transport.supportsPing()){this.transport.ping();}
else{this.send_event('pusher:ping',{});}};Connection.prototype.close=function(){this.transport.close();};Connection.prototype.bindListeners=function(){var _this=this;var listeners={message:function(messageEvent){var pusherEvent;try{pusherEvent=protocol_protocol.decodeMessage(messageEvent);}
catch(e){_this.emit('error',{type:'MessageParseError',error:e,data:messageEvent.data});}
if(pusherEvent!==undefined){logger.debug('Event recd',pusherEvent);switch(pusherEvent.event){case 'pusher:error':_this.emit('error',{type:'PusherError',data:pusherEvent.data});break;case 'pusher:ping':_this.emit('ping');break;case 'pusher:pong':_this.emit('pong');break;}
_this.emit('message',pusherEvent);}},activity:function(){_this.emit('activity');},error:function(error){_this.emit('error',error);},closed:function(closeEvent){unbindListeners();if(closeEvent&&closeEvent.code){_this.handleCloseEvent(closeEvent);}
_this.transport=null;_this.emit('closed');}};var unbindListeners=function(){objectApply(listeners,function(listener,event){_this.transport.unbind(event,listener);});};objectApply(listeners,function(listener,event){_this.transport.bind(event,listener);});};Connection.prototype.handleCloseEvent=function(closeEvent){var action=protocol_protocol.getCloseAction(closeEvent);var error=protocol_protocol.getCloseError(closeEvent);if(error){this.emit('error',error);}
if(action){this.emit(action,{action:action,error:error});}};return Connection;}(dispatcher));var connection_connection=(connection_Connection);var handshake_Handshake=(function(){function Handshake(transport,callback){this.transport=transport;this.callback=callback;this.bindListeners();}
Handshake.prototype.close=function(){this.unbindListeners();this.transport.close();};Handshake.prototype.bindListeners=function(){var _this=this;this.onMessage=function(m){_this.unbindListeners();var result;try{result=protocol_protocol.processHandshake(m);}
catch(e){_this.finish('error',{error:e});_this.transport.close();return;}
if(result.action==='connected'){_this.finish('connected',{connection:new connection_connection(result.id,_this.transport),activityTimeout:result.activityTimeout});}
else{_this.finish(result.action,{error:result.error});_this.transport.close();}};this.onClosed=function(closeEvent){_this.unbindListeners();var action=protocol_protocol.getCloseAction(closeEvent)||'backoff';var error=protocol_protocol.getCloseError(closeEvent);_this.finish(action,{error:error});};this.transport.bind('message',this.onMessage);this.transport.bind('closed',this.onClosed);};Handshake.prototype.unbindListeners=function(){this.transport.unbind('message',this.onMessage);this.transport.unbind('closed',this.onClosed);};Handshake.prototype.finish=function(action,params){this.callback(extend({transport:this.transport,action:action},params));};return Handshake;}());var connection_handshake=(handshake_Handshake);var pusher_authorizer_PusherAuthorizer=(function(){function PusherAuthorizer(channel,options){this.channel=channel;var authTransport=options.authTransport;if(typeof runtime.getAuthorizers()[authTransport]==='undefined'){throw "'"+authTransport+"' is not a recognized auth transport";}
this.type=authTransport;this.options=options;this.authOptions=options.auth||{};}
PusherAuthorizer.prototype.composeQuery=function(socketId){var query='socket_id='+
encodeURIComponent(socketId)+
'&channel_name='+
encodeURIComponent(this.channel.name);for(var i in this.authOptions.params){query+='&'+
encodeURIComponent(i)+
'='+
encodeURIComponent(this.authOptions.params[i]);}
return query;};PusherAuthorizer.prototype.authorize=function(socketId,callback){PusherAuthorizer.authorizers=PusherAuthorizer.authorizers||runtime.getAuthorizers();PusherAuthorizer.authorizers[this.type].call(this,runtime,socketId,callback);};return PusherAuthorizer;}());var pusher_authorizer=(pusher_authorizer_PusherAuthorizer);var timeline_sender_TimelineSender=(function(){function TimelineSender(timeline,options){this.timeline=timeline;this.options=options||{};}
TimelineSender.prototype.send=function(useTLS,callback){if(this.timeline.isEmpty()){return;}
this.timeline.send(runtime.TimelineTransport.getAgent(this,useTLS),callback);};return TimelineSender;}());var timeline_sender=(timeline_sender_TimelineSender);var channel_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var channel_Channel=(function(_super){channel_extends(Channel,_super);function Channel(name,pusher){var _this=_super.call(this,function(event,data){logger.debug('No callbacks on '+name+' for '+event);})||this;_this.name=name;_this.pusher=pusher;_this.subscribed=false;_this.subscriptionPending=false;_this.subscriptionCancelled=false;return _this;}
Channel.prototype.authorize=function(socketId,callback){return callback(null,{auth:''});};Channel.prototype.trigger=function(event,data){if(event.indexOf('client-')!==0){throw new BadEventName("Event '"+event+"' does not start with 'client-'");}
if(!this.subscribed){var suffix=url_store.buildLogSuffix('triggeringClientEvents');logger.warn("Client event triggered before channel 'subscription_succeeded' event . "+suffix);}
return this.pusher.send_event(event,data,this.name);};Channel.prototype.disconnect=function(){this.subscribed=false;this.subscriptionPending=false;};Channel.prototype.handleEvent=function(event){var eventName=event.event;var data=event.data;if(eventName==='pusher_internal:subscription_succeeded'){this.handleSubscriptionSucceededEvent(event);}
else if(eventName.indexOf('pusher_internal:')!==0){var metadata={};this.emit(eventName,data,metadata);}};Channel.prototype.handleSubscriptionSucceededEvent=function(event){this.subscriptionPending=false;this.subscribed=true;if(this.subscriptionCancelled){this.pusher.unsubscribe(this.name);}
else{this.emit('pusher:subscription_succeeded',event.data);}};Channel.prototype.subscribe=function(){var _this=this;if(this.subscribed){return;}
this.subscriptionPending=true;this.subscriptionCancelled=false;this.authorize(this.pusher.connection.socket_id,function(error,data){if(error){_this.subscriptionPending=false;logger.error(error.toString());_this.emit('pusher:subscription_error',Object.assign({},{type:'AuthError',error:error.message},error instanceof HTTPAuthError?{status:error.status}:{}));}
else{_this.pusher.send_event('pusher:subscribe',{auth:data.auth,channel_data:data.channel_data,channel:_this.name});}});};Channel.prototype.unsubscribe=function(){this.subscribed=false;this.pusher.send_event('pusher:unsubscribe',{channel:this.name});};Channel.prototype.cancelSubscription=function(){this.subscriptionCancelled=true;};Channel.prototype.reinstateSubscription=function(){this.subscriptionCancelled=false;};return Channel;}(dispatcher));var channels_channel=(channel_Channel);var private_channel_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var private_channel_PrivateChannel=(function(_super){private_channel_extends(PrivateChannel,_super);function PrivateChannel(){return _super!==null&&_super.apply(this,arguments)||this;}
PrivateChannel.prototype.authorize=function(socketId,callback){var authorizer=factory.createAuthorizer(this,this.pusher.config);return authorizer.authorize(socketId,callback);};return PrivateChannel;}(channels_channel));var private_channel=(private_channel_PrivateChannel);var members_Members=(function(){function Members(){this.reset();}
Members.prototype.get=function(id){if(Object.prototype.hasOwnProperty.call(this.members,id)){return{id:id,info:this.members[id]};}
else{return null;}};Members.prototype.each=function(callback){var _this=this;objectApply(this.members,function(member,id){callback(_this.get(id));});};Members.prototype.setMyID=function(id){this.myID=id;};Members.prototype.onSubscription=function(subscriptionData){this.members=subscriptionData.presence.hash;this.count=subscriptionData.presence.count;this.me=this.get(this.myID);};Members.prototype.addMember=function(memberData){if(this.get(memberData.user_id)===null){this.count++;}
this.members[memberData.user_id]=memberData.user_info;return this.get(memberData.user_id);};Members.prototype.removeMember=function(memberData){var member=this.get(memberData.user_id);if(member){delete this.members[memberData.user_id];this.count--;}
return member;};Members.prototype.reset=function(){this.members={};this.count=0;this.myID=null;this.me=null;};return Members;}());var members=(members_Members);var presence_channel_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var presence_channel_PresenceChannel=(function(_super){presence_channel_extends(PresenceChannel,_super);function PresenceChannel(name,pusher){var _this=_super.call(this,name,pusher)||this;_this.members=new members();return _this;}
PresenceChannel.prototype.authorize=function(socketId,callback){var _this=this;_super.prototype.authorize.call(this,socketId,function(error,authData){if(!error){authData=authData;if(authData.channel_data===undefined){var suffix=url_store.buildLogSuffix('authenticationEndpoint');logger.error("Invalid auth response for channel '"+_this.name+"',"+
("expected 'channel_data' field. "+suffix));callback('Invalid auth response');return;}
var channelData=JSON.parse(authData.channel_data);_this.members.setMyID(channelData.user_id);}
callback(error,authData);});};PresenceChannel.prototype.handleEvent=function(event){var eventName=event.event;if(eventName.indexOf('pusher_internal:')===0){this.handleInternalEvent(event);}
else{var data=event.data;var metadata={};if(event.user_id){metadata.user_id=event.user_id;}
this.emit(eventName,data,metadata);}};PresenceChannel.prototype.handleInternalEvent=function(event){var eventName=event.event;var data=event.data;switch(eventName){case 'pusher_internal:subscription_succeeded':this.handleSubscriptionSucceededEvent(event);break;case 'pusher_internal:member_added':var addedMember=this.members.addMember(data);this.emit('pusher:member_added',addedMember);break;case 'pusher_internal:member_removed':var removedMember=this.members.removeMember(data);if(removedMember){this.emit('pusher:member_removed',removedMember);}
break;}};PresenceChannel.prototype.handleSubscriptionSucceededEvent=function(event){this.subscriptionPending=false;this.subscribed=true;if(this.subscriptionCancelled){this.pusher.unsubscribe(this.name);}
else{this.members.onSubscription(event.data);this.emit('pusher:subscription_succeeded',this.members);}};PresenceChannel.prototype.disconnect=function(){this.members.reset();_super.prototype.disconnect.call(this);};return PresenceChannel;}(private_channel));var presence_channel=(presence_channel_PresenceChannel);var utf8=__webpack_require__(1);var base64=__webpack_require__(0);var encrypted_channel_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var encrypted_channel_EncryptedChannel=(function(_super){encrypted_channel_extends(EncryptedChannel,_super);function EncryptedChannel(name,pusher,nacl){var _this=_super.call(this,name,pusher)||this;_this.key=null;_this.nacl=nacl;return _this;}
EncryptedChannel.prototype.authorize=function(socketId,callback){var _this=this;_super.prototype.authorize.call(this,socketId,function(error,authData){if(error){callback(error,authData);return;}
var sharedSecret=authData['shared_secret'];if(!sharedSecret){callback(new Error("No shared_secret key in auth payload for encrypted channel: "+_this.name),null);return;}
_this.key=Object(base64["decode"])(sharedSecret);delete authData['shared_secret'];callback(null,authData);});};EncryptedChannel.prototype.trigger=function(event,data){throw new UnsupportedFeature('Client events are not currently supported for encrypted channels');};EncryptedChannel.prototype.handleEvent=function(event){var eventName=event.event;var data=event.data;if(eventName.indexOf('pusher_internal:')===0||eventName.indexOf('pusher:')===0){_super.prototype.handleEvent.call(this,event);return;}
this.handleEncryptedEvent(eventName,data);};EncryptedChannel.prototype.handleEncryptedEvent=function(event,data){var _this=this;if(!this.key){logger.debug('Received encrypted event before key has been retrieved from the authEndpoint');return;}
if(!data.ciphertext||!data.nonce){logger.error('Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: '+
data);return;}
var cipherText=Object(base64["decode"])(data.ciphertext);if(cipherText.length<this.nacl.secretbox.overheadLength){logger.error("Expected encrypted event ciphertext length to be "+this.nacl.secretbox.overheadLength+", got: "+cipherText.length);return;}
var nonce=Object(base64["decode"])(data.nonce);if(nonce.length<this.nacl.secretbox.nonceLength){logger.error("Expected encrypted event nonce length to be "+this.nacl.secretbox.nonceLength+", got: "+nonce.length);return;}
var bytes=this.nacl.secretbox.open(cipherText,nonce,this.key);if(bytes===null){logger.debug('Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...');this.authorize(this.pusher.connection.socket_id,function(error,authData){if(error){logger.error("Failed to make a request to the authEndpoint: "+authData+". Unable to fetch new key, so dropping encrypted event");return;}
bytes=_this.nacl.secretbox.open(cipherText,nonce,_this.key);if(bytes===null){logger.error("Failed to decrypt event with new key. Dropping encrypted event");return;}
_this.emit(event,_this.getDataToEmit(bytes));return;});return;}
this.emit(event,this.getDataToEmit(bytes));};EncryptedChannel.prototype.getDataToEmit=function(bytes){var raw=Object(utf8["decode"])(bytes);try{return JSON.parse(raw);}
catch(_a){return raw;}};return EncryptedChannel;}(private_channel));var encrypted_channel=(encrypted_channel_EncryptedChannel);var connection_manager_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var connection_manager_ConnectionManager=(function(_super){connection_manager_extends(ConnectionManager,_super);function ConnectionManager(key,options){var _this=_super.call(this)||this;_this.state='initialized';_this.connection=null;_this.key=key;_this.options=options;_this.timeline=_this.options.timeline;_this.usingTLS=_this.options.useTLS;_this.errorCallbacks=_this.buildErrorCallbacks();_this.connectionCallbacks=_this.buildConnectionCallbacks(_this.errorCallbacks);_this.handshakeCallbacks=_this.buildHandshakeCallbacks(_this.errorCallbacks);var Network=runtime.getNetwork();Network.bind('online',function(){_this.timeline.info({netinfo:'online'});if(_this.state==='connecting'||_this.state==='unavailable'){_this.retryIn(0);}});Network.bind('offline',function(){_this.timeline.info({netinfo:'offline'});if(_this.connection){_this.sendActivityCheck();}});_this.updateStrategy();return _this;}
ConnectionManager.prototype.connect=function(){if(this.connection||this.runner){return;}
if(!this.strategy.isSupported()){this.updateState('failed');return;}
this.updateState('connecting');this.startConnecting();this.setUnavailableTimer();};ConnectionManager.prototype.send=function(data){if(this.connection){return this.connection.send(data);}
else{return false;}};ConnectionManager.prototype.send_event=function(name,data,channel){if(this.connection){return this.connection.send_event(name,data,channel);}
else{return false;}};ConnectionManager.prototype.disconnect=function(){this.disconnectInternally();this.updateState('disconnected');};ConnectionManager.prototype.isUsingTLS=function(){return this.usingTLS;};ConnectionManager.prototype.startConnecting=function(){var _this=this;var callback=function(error,handshake){if(error){_this.runner=_this.strategy.connect(0,callback);}
else{if(handshake.action==='error'){_this.emit('error',{type:'HandshakeError',error:handshake.error});_this.timeline.error({handshakeError:handshake.error});}
else{_this.abortConnecting();_this.handshakeCallbacks[handshake.action](handshake);}}};this.runner=this.strategy.connect(0,callback);};ConnectionManager.prototype.abortConnecting=function(){if(this.runner){this.runner.abort();this.runner=null;}};ConnectionManager.prototype.disconnectInternally=function(){this.abortConnecting();this.clearRetryTimer();this.clearUnavailableTimer();if(this.connection){var connection=this.abandonConnection();connection.close();}};ConnectionManager.prototype.updateStrategy=function(){this.strategy=this.options.getStrategy({key:this.key,timeline:this.timeline,useTLS:this.usingTLS});};ConnectionManager.prototype.retryIn=function(delay){var _this=this;this.timeline.info({action:'retry',delay:delay});if(delay>0){this.emit('connecting_in',Math.round(delay/1000));}
this.retryTimer=new OneOffTimer(delay||0,function(){_this.disconnectInternally();_this.connect();});};ConnectionManager.prototype.clearRetryTimer=function(){if(this.retryTimer){this.retryTimer.ensureAborted();this.retryTimer=null;}};ConnectionManager.prototype.setUnavailableTimer=function(){var _this=this;this.unavailableTimer=new OneOffTimer(this.options.unavailableTimeout,function(){_this.updateState('unavailable');});};ConnectionManager.prototype.clearUnavailableTimer=function(){if(this.unavailableTimer){this.unavailableTimer.ensureAborted();}};ConnectionManager.prototype.sendActivityCheck=function(){var _this=this;this.stopActivityCheck();this.connection.ping();this.activityTimer=new OneOffTimer(this.options.pongTimeout,function(){_this.timeline.error({pong_timed_out:_this.options.pongTimeout});_this.retryIn(0);});};ConnectionManager.prototype.resetActivityCheck=function(){var _this=this;this.stopActivityCheck();if(this.connection&&!this.connection.handlesActivityChecks()){this.activityTimer=new OneOffTimer(this.activityTimeout,function(){_this.sendActivityCheck();});}};ConnectionManager.prototype.stopActivityCheck=function(){if(this.activityTimer){this.activityTimer.ensureAborted();}};ConnectionManager.prototype.buildConnectionCallbacks=function(errorCallbacks){var _this=this;return extend({},errorCallbacks,{message:function(message){_this.resetActivityCheck();_this.emit('message',message);},ping:function(){_this.send_event('pusher:pong',{});},activity:function(){_this.resetActivityCheck();},error:function(error){_this.emit('error',error);},closed:function(){_this.abandonConnection();if(_this.shouldRetry()){_this.retryIn(1000);}}});};ConnectionManager.prototype.buildHandshakeCallbacks=function(errorCallbacks){var _this=this;return extend({},errorCallbacks,{connected:function(handshake){_this.activityTimeout=Math.min(_this.options.activityTimeout,handshake.activityTimeout,handshake.connection.activityTimeout||Infinity);_this.clearUnavailableTimer();_this.setConnection(handshake.connection);_this.socket_id=_this.connection.id;_this.updateState('connected',{socket_id:_this.socket_id});}});};ConnectionManager.prototype.buildErrorCallbacks=function(){var _this=this;var withErrorEmitted=function(callback){return function(result){if(result.error){_this.emit('error',{type:'WebSocketError',error:result.error});}
callback(result);};};return{tls_only:withErrorEmitted(function(){_this.usingTLS=true;_this.updateStrategy();_this.retryIn(0);}),refused:withErrorEmitted(function(){_this.disconnect();}),backoff:withErrorEmitted(function(){_this.retryIn(1000);}),retry:withErrorEmitted(function(){_this.retryIn(0);})};};ConnectionManager.prototype.setConnection=function(connection){this.connection=connection;for(var event in this.connectionCallbacks){this.connection.bind(event,this.connectionCallbacks[event]);}
this.resetActivityCheck();};ConnectionManager.prototype.abandonConnection=function(){if(!this.connection){return;}
this.stopActivityCheck();for(var event in this.connectionCallbacks){this.connection.unbind(event,this.connectionCallbacks[event]);}
var connection=this.connection;this.connection=null;return connection;};ConnectionManager.prototype.updateState=function(newState,data){var previousState=this.state;this.state=newState;if(previousState!==newState){var newStateDescription=newState;if(newStateDescription==='connected'){newStateDescription+=' with new socket ID '+data.socket_id;}
logger.debug('State changed',previousState+' -> '+newStateDescription);this.timeline.info({state:newState,params:data});this.emit('state_change',{previous:previousState,current:newState});this.emit(newState,data);}};ConnectionManager.prototype.shouldRetry=function(){return this.state==='connecting'||this.state==='connected';};return ConnectionManager;}(dispatcher));var connection_manager=(connection_manager_ConnectionManager);var channels_Channels=(function(){function Channels(){this.channels={};}
Channels.prototype.add=function(name,pusher){if(!this.channels[name]){this.channels[name]=createChannel(name,pusher);}
return this.channels[name];};Channels.prototype.all=function(){return values(this.channels);};Channels.prototype.find=function(name){return this.channels[name];};Channels.prototype.remove=function(name){var channel=this.channels[name];delete this.channels[name];return channel;};Channels.prototype.disconnect=function(){objectApply(this.channels,function(channel){channel.disconnect();});};return Channels;}());var channels=(channels_Channels);function createChannel(name,pusher){if(name.indexOf('private-encrypted-')===0){if(pusher.config.nacl){return factory.createEncryptedChannel(name,pusher,pusher.config.nacl);}
var errMsg='Tried to subscribe to a private-encrypted- channel but no nacl implementation available';var suffix=url_store.buildLogSuffix('encryptedChannelSupport');throw new UnsupportedFeature(errMsg+". "+suffix);}
else if(name.indexOf('private-')===0){return factory.createPrivateChannel(name,pusher);}
else if(name.indexOf('presence-')===0){return factory.createPresenceChannel(name,pusher);}
else{return factory.createChannel(name,pusher);}}
var Factory={createChannels:function(){return new channels();},createConnectionManager:function(key,options){return new connection_manager(key,options);},createChannel:function(name,pusher){return new channels_channel(name,pusher);},createPrivateChannel:function(name,pusher){return new private_channel(name,pusher);},createPresenceChannel:function(name,pusher){return new presence_channel(name,pusher);},createEncryptedChannel:function(name,pusher,nacl){return new encrypted_channel(name,pusher,nacl);},createTimelineSender:function(timeline,options){return new timeline_sender(timeline,options);},createAuthorizer:function(channel,options){if(options.authorizer){return options.authorizer(channel,options);}
return new pusher_authorizer(channel,options);},createHandshake:function(transport,callback){return new connection_handshake(transport,callback);},createAssistantToTheTransportManager:function(manager,transport,options){return new assistant_to_the_transport_manager(manager,transport,options);}};var factory=(Factory);var transport_manager_TransportManager=(function(){function TransportManager(options){this.options=options||{};this.livesLeft=this.options.lives||Infinity;}
TransportManager.prototype.getAssistant=function(transport){return factory.createAssistantToTheTransportManager(this,transport,{minPingDelay:this.options.minPingDelay,maxPingDelay:this.options.maxPingDelay});};TransportManager.prototype.isAlive=function(){return this.livesLeft>0;};TransportManager.prototype.reportDeath=function(){this.livesLeft-=1;};return TransportManager;}());var transport_manager=(transport_manager_TransportManager);var sequential_strategy_SequentialStrategy=(function(){function SequentialStrategy(strategies,options){this.strategies=strategies;this.loop=Boolean(options.loop);this.failFast=Boolean(options.failFast);this.timeout=options.timeout;this.timeoutLimit=options.timeoutLimit;}
SequentialStrategy.prototype.isSupported=function(){return any(this.strategies,util.method('isSupported'));};SequentialStrategy.prototype.connect=function(minPriority,callback){var _this=this;var strategies=this.strategies;var current=0;var timeout=this.timeout;var runner=null;var tryNextStrategy=function(error,handshake){if(handshake){callback(null,handshake);}
else{current=current+1;if(_this.loop){current=current%strategies.length;}
if(current<strategies.length){if(timeout){timeout=timeout*2;if(_this.timeoutLimit){timeout=Math.min(timeout,_this.timeoutLimit);}}
runner=_this.tryStrategy(strategies[current],minPriority,{timeout:timeout,failFast:_this.failFast},tryNextStrategy);}
else{callback(true);}}};runner=this.tryStrategy(strategies[current],minPriority,{timeout:timeout,failFast:this.failFast},tryNextStrategy);return{abort:function(){runner.abort();},forceMinPriority:function(p){minPriority=p;if(runner){runner.forceMinPriority(p);}}};};SequentialStrategy.prototype.tryStrategy=function(strategy,minPriority,options,callback){var timer=null;var runner=null;if(options.timeout>0){timer=new OneOffTimer(options.timeout,function(){runner.abort();callback(true);});}
runner=strategy.connect(minPriority,function(error,handshake){if(error&&timer&&timer.isRunning()&&!options.failFast){return;}
if(timer){timer.ensureAborted();}
callback(error,handshake);});return{abort:function(){if(timer){timer.ensureAborted();}
runner.abort();},forceMinPriority:function(p){runner.forceMinPriority(p);}};};return SequentialStrategy;}());var sequential_strategy=(sequential_strategy_SequentialStrategy);var best_connected_ever_strategy_BestConnectedEverStrategy=(function(){function BestConnectedEverStrategy(strategies){this.strategies=strategies;}
BestConnectedEverStrategy.prototype.isSupported=function(){return any(this.strategies,util.method('isSupported'));};BestConnectedEverStrategy.prototype.connect=function(minPriority,callback){return connect(this.strategies,minPriority,function(i,runners){return function(error,handshake){runners[i].error=error;if(error){if(allRunnersFailed(runners)){callback(true);}
return;}
apply(runners,function(runner){runner.forceMinPriority(handshake.transport.priority);});callback(null,handshake);};});};return BestConnectedEverStrategy;}());var best_connected_ever_strategy=(best_connected_ever_strategy_BestConnectedEverStrategy);function connect(strategies,minPriority,callbackBuilder){var runners=map(strategies,function(strategy,i,_,rs){return strategy.connect(minPriority,callbackBuilder(i,rs));});return{abort:function(){apply(runners,abortRunner);},forceMinPriority:function(p){apply(runners,function(runner){runner.forceMinPriority(p);});}};}
function allRunnersFailed(runners){return collections_all(runners,function(runner){return Boolean(runner.error);});}
function abortRunner(runner){if(!runner.error&&!runner.aborted){runner.abort();runner.aborted=true;}}
var cached_strategy_CachedStrategy=(function(){function CachedStrategy(strategy,transports,options){this.strategy=strategy;this.transports=transports;this.ttl=options.ttl||1800*1000;this.usingTLS=options.useTLS;this.timeline=options.timeline;}
CachedStrategy.prototype.isSupported=function(){return this.strategy.isSupported();};CachedStrategy.prototype.connect=function(minPriority,callback){var usingTLS=this.usingTLS;var info=fetchTransportCache(usingTLS);var strategies=[this.strategy];if(info&&info.timestamp+this.ttl>=util.now()){var transport=this.transports[info.transport];if(transport){this.timeline.info({cached:true,transport:info.transport,latency:info.latency});strategies.push(new sequential_strategy([transport],{timeout:info.latency*2+1000,failFast:true}));}}
var startTimestamp=util.now();var runner=strategies.pop().connect(minPriority,function cb(error,handshake){if(error){flushTransportCache(usingTLS);if(strategies.length>0){startTimestamp=util.now();runner=strategies.pop().connect(minPriority,cb);}
else{callback(error);}}
else{storeTransportCache(usingTLS,handshake.transport.name,util.now()-startTimestamp);callback(null,handshake);}});return{abort:function(){runner.abort();},forceMinPriority:function(p){minPriority=p;if(runner){runner.forceMinPriority(p);}}};};return CachedStrategy;}());var cached_strategy=(cached_strategy_CachedStrategy);function getTransportCacheKey(usingTLS){return 'pusherTransport'+(usingTLS?'TLS':'NonTLS');}
function fetchTransportCache(usingTLS){var storage=runtime.getLocalStorage();if(storage){try{var serializedCache=storage[getTransportCacheKey(usingTLS)];if(serializedCache){return JSON.parse(serializedCache);}}
catch(e){flushTransportCache(usingTLS);}}
return null;}
function storeTransportCache(usingTLS,transport,latency){var storage=runtime.getLocalStorage();if(storage){try{storage[getTransportCacheKey(usingTLS)]=safeJSONStringify({timestamp:util.now(),transport:transport,latency:latency});}
catch(e){}}}
function flushTransportCache(usingTLS){var storage=runtime.getLocalStorage();if(storage){try{delete storage[getTransportCacheKey(usingTLS)];}
catch(e){}}}
var delayed_strategy_DelayedStrategy=(function(){function DelayedStrategy(strategy,_a){var number=_a.delay;this.strategy=strategy;this.options={delay:number};}
DelayedStrategy.prototype.isSupported=function(){return this.strategy.isSupported();};DelayedStrategy.prototype.connect=function(minPriority,callback){var strategy=this.strategy;var runner;var timer=new OneOffTimer(this.options.delay,function(){runner=strategy.connect(minPriority,callback);});return{abort:function(){timer.ensureAborted();if(runner){runner.abort();}},forceMinPriority:function(p){minPriority=p;if(runner){runner.forceMinPriority(p);}}};};return DelayedStrategy;}());var delayed_strategy=(delayed_strategy_DelayedStrategy);var IfStrategy=(function(){function IfStrategy(test,trueBranch,falseBranch){this.test=test;this.trueBranch=trueBranch;this.falseBranch=falseBranch;}
IfStrategy.prototype.isSupported=function(){var branch=this.test()?this.trueBranch:this.falseBranch;return branch.isSupported();};IfStrategy.prototype.connect=function(minPriority,callback){var branch=this.test()?this.trueBranch:this.falseBranch;return branch.connect(minPriority,callback);};return IfStrategy;}());var if_strategy=(IfStrategy);var FirstConnectedStrategy=(function(){function FirstConnectedStrategy(strategy){this.strategy=strategy;}
FirstConnectedStrategy.prototype.isSupported=function(){return this.strategy.isSupported();};FirstConnectedStrategy.prototype.connect=function(minPriority,callback){var runner=this.strategy.connect(minPriority,function(error,handshake){if(handshake){runner.abort();}
callback(error,handshake);});return runner;};return FirstConnectedStrategy;}());var first_connected_strategy=(FirstConnectedStrategy);function testSupportsStrategy(strategy){return function(){return strategy.isSupported();};}
var getDefaultStrategy=function(config,baseOptions,defineTransport){var definedTransports={};function defineTransportStrategy(name,type,priority,options,manager){var transport=defineTransport(config,name,type,priority,options,manager);definedTransports[name]=transport;return transport;}
var ws_options=Object.assign({},baseOptions,{hostNonTLS:config.wsHost+':'+config.wsPort,hostTLS:config.wsHost+':'+config.wssPort,httpPath:config.wsPath});var wss_options=Object.assign({},ws_options,{useTLS:true});var sockjs_options=Object.assign({},baseOptions,{hostNonTLS:config.httpHost+':'+config.httpPort,hostTLS:config.httpHost+':'+config.httpsPort,httpPath:config.httpPath});var timeouts={loop:true,timeout:15000,timeoutLimit:60000};var ws_manager=new transport_manager({lives:2,minPingDelay:10000,maxPingDelay:config.activityTimeout});var streaming_manager=new transport_manager({lives:2,minPingDelay:10000,maxPingDelay:config.activityTimeout});var ws_transport=defineTransportStrategy('ws','ws',3,ws_options,ws_manager);var wss_transport=defineTransportStrategy('wss','ws',3,wss_options,ws_manager);var sockjs_transport=defineTransportStrategy('sockjs','sockjs',1,sockjs_options);var xhr_streaming_transport=defineTransportStrategy('xhr_streaming','xhr_streaming',1,sockjs_options,streaming_manager);var xdr_streaming_transport=defineTransportStrategy('xdr_streaming','xdr_streaming',1,sockjs_options,streaming_manager);var xhr_polling_transport=defineTransportStrategy('xhr_polling','xhr_polling',1,sockjs_options);var xdr_polling_transport=defineTransportStrategy('xdr_polling','xdr_polling',1,sockjs_options);var ws_loop=new sequential_strategy([ws_transport],timeouts);var wss_loop=new sequential_strategy([wss_transport],timeouts);var sockjs_loop=new sequential_strategy([sockjs_transport],timeouts);var streaming_loop=new sequential_strategy([new if_strategy(testSupportsStrategy(xhr_streaming_transport),xhr_streaming_transport,xdr_streaming_transport)],timeouts);var polling_loop=new sequential_strategy([new if_strategy(testSupportsStrategy(xhr_polling_transport),xhr_polling_transport,xdr_polling_transport)],timeouts);var http_loop=new sequential_strategy([new if_strategy(testSupportsStrategy(streaming_loop),new best_connected_ever_strategy([streaming_loop,new delayed_strategy(polling_loop,{delay:4000})]),polling_loop)],timeouts);var http_fallback_loop=new if_strategy(testSupportsStrategy(http_loop),http_loop,sockjs_loop);var wsStrategy;if(baseOptions.useTLS){wsStrategy=new best_connected_ever_strategy([ws_loop,new delayed_strategy(http_fallback_loop,{delay:2000})]);}
else{wsStrategy=new best_connected_ever_strategy([ws_loop,new delayed_strategy(wss_loop,{delay:2000}),new delayed_strategy(http_fallback_loop,{delay:5000})]);}
return new cached_strategy(new first_connected_strategy(new if_strategy(testSupportsStrategy(ws_transport),wsStrategy,http_fallback_loop)),definedTransports,{ttl:1800000,timeline:baseOptions.timeline,useTLS:baseOptions.useTLS});};var default_strategy=(getDefaultStrategy);var transport_connection_initializer=(function(){var self=this;self.timeline.info(self.buildTimelineMessage({transport:self.name+(self.options.useTLS?'s':'')}));if(self.hooks.isInitialized()){self.changeState('initialized');}
else if(self.hooks.file){self.changeState('initializing');Dependencies.load(self.hooks.file,{useTLS:self.options.useTLS},function(error,callback){if(self.hooks.isInitialized()){self.changeState('initialized');callback(true);}
else{if(error){self.onError(error);}
self.onClose();callback(false);}});}
else{self.onClose();}});var http_xdomain_request_hooks={getRequest:function(socket){var xdr=new window.XDomainRequest();xdr.ontimeout=function(){socket.emit('error',new RequestTimedOut());socket.close();};xdr.onerror=function(e){socket.emit('error',e);socket.close();};xdr.onprogress=function(){if(xdr.responseText&&xdr.responseText.length>0){socket.onChunk(200,xdr.responseText);}};xdr.onload=function(){if(xdr.responseText&&xdr.responseText.length>0){socket.onChunk(200,xdr.responseText);}
socket.emit('finished',200);socket.close();};return xdr;},abortRequest:function(xdr){xdr.ontimeout=xdr.onerror=xdr.onprogress=xdr.onload=null;xdr.abort();}};var http_xdomain_request=(http_xdomain_request_hooks);var http_request_extends=(undefined&&undefined.__extends)||(function(){var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};return function(d,b){extendStatics(d,b);function __(){this.constructor=d;}
d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};})();var MAX_BUFFER_LENGTH=256*1024;var http_request_HTTPRequest=(function(_super){http_request_extends(HTTPRequest,_super);function HTTPRequest(hooks,method,url){var _this=_super.call(this)||this;_this.hooks=hooks;_this.method=method;_this.url=url;return _this;}
HTTPRequest.prototype.start=function(payload){var _this=this;this.position=0;this.xhr=this.hooks.getRequest(this);this.unloader=function(){_this.close();};runtime.addUnloadListener(this.unloader);this.xhr.open(this.method,this.url,true);if(this.xhr.setRequestHeader){this.xhr.setRequestHeader('Content-Type','application/json');}
this.xhr.send(payload);};HTTPRequest.prototype.close=function(){if(this.unloader){runtime.removeUnloadListener(this.unloader);this.unloader=null;}
if(this.xhr){this.hooks.abortRequest(this.xhr);this.xhr=null;}};HTTPRequest.prototype.onChunk=function(status,data){while(true){var chunk=this.advanceBuffer(data);if(chunk){this.emit('chunk',{status:status,data:chunk});}
else{break;}}
if(this.isBufferTooLong(data)){this.emit('buffer_too_long');}};HTTPRequest.prototype.advanceBuffer=function(buffer){var unreadData=buffer.slice(this.position);var endOfLinePosition=unreadData.indexOf('\n');if(endOfLinePosition!==-1){this.position+=endOfLinePosition+1;return unreadData.slice(0,endOfLinePosition);}
else{return null;}};HTTPRequest.prototype.isBufferTooLong=function(buffer){return this.position===buffer.length&&buffer.length>MAX_BUFFER_LENGTH;};return HTTPRequest;}(dispatcher));var http_request=(http_request_HTTPRequest);var State;(function(State){State[State["CONNECTING"]=0]="CONNECTING";State[State["OPEN"]=1]="OPEN";State[State["CLOSED"]=3]="CLOSED";})(State||(State={}));var state=(State);var autoIncrement=1;var http_socket_HTTPSocket=(function(){function HTTPSocket(hooks,url){this.hooks=hooks;this.session=randomNumber(1000)+'/'+randomString(8);this.location=getLocation(url);this.readyState=state.CONNECTING;this.openStream();}
HTTPSocket.prototype.send=function(payload){return this.sendRaw(JSON.stringify([payload]));};HTTPSocket.prototype.ping=function(){this.hooks.sendHeartbeat(this);};HTTPSocket.prototype.close=function(code,reason){this.onClose(code,reason,true);};HTTPSocket.prototype.sendRaw=function(payload){if(this.readyState===state.OPEN){try{runtime.createSocketRequest('POST',getUniqueURL(getSendURL(this.location,this.session))).start(payload);return true;}
catch(e){return false;}}
else{return false;}};HTTPSocket.prototype.reconnect=function(){this.closeStream();this.openStream();};HTTPSocket.prototype.onClose=function(code,reason,wasClean){this.closeStream();this.readyState=state.CLOSED;if(this.onclose){this.onclose({code:code,reason:reason,wasClean:wasClean});}};HTTPSocket.prototype.onChunk=function(chunk){if(chunk.status!==200){return;}
if(this.readyState===state.OPEN){this.onActivity();}
var payload;var type=chunk.data.slice(0,1);switch(type){case 'o':payload=JSON.parse(chunk.data.slice(1)||'{}');this.onOpen(payload);break;case 'a':payload=JSON.parse(chunk.data.slice(1)||'[]');for(var i=0;i<payload.length;i++){this.onEvent(payload[i]);}
break;case 'm':payload=JSON.parse(chunk.data.slice(1)||'null');this.onEvent(payload);break;case 'h':this.hooks.onHeartbeat(this);break;case 'c':payload=JSON.parse(chunk.data.slice(1)||'[]');this.onClose(payload[0],payload[1],true);break;}};HTTPSocket.prototype.onOpen=function(options){if(this.readyState===state.CONNECTING){if(options&&options.hostname){this.location.base=replaceHost(this.location.base,options.hostname);}
this.readyState=state.OPEN;if(this.onopen){this.onopen();}}
else{this.onClose(1006,'Server lost session',true);}};HTTPSocket.prototype.onEvent=function(event){if(this.readyState===state.OPEN&&this.onmessage){this.onmessage({data:event});}};HTTPSocket.prototype.onActivity=function(){if(this.onactivity){this.onactivity();}};HTTPSocket.prototype.onError=function(error){if(this.onerror){this.onerror(error);}};HTTPSocket.prototype.openStream=function(){var _this=this;this.stream=runtime.createSocketRequest('POST',getUniqueURL(this.hooks.getReceiveURL(this.location,this.session)));this.stream.bind('chunk',function(chunk){_this.onChunk(chunk);});this.stream.bind('finished',function(status){_this.hooks.onFinished(_this,status);});this.stream.bind('buffer_too_long',function(){_this.reconnect();});try{this.stream.start();}
catch(error){util.defer(function(){_this.onError(error);_this.onClose(1006,'Could not start streaming',false);});}};HTTPSocket.prototype.closeStream=function(){if(this.stream){this.stream.unbind_all();this.stream.close();this.stream=null;}};return HTTPSocket;}());function getLocation(url){var parts=/([^\?]*)\/*(\??.*)/.exec(url);return{base:parts[1],queryString:parts[2]};}
function getSendURL(url,session){return url.base+'/'+session+'/xhr_send';}
function getUniqueURL(url){var separator=url.indexOf('?')===-1?'?':'&';return url+separator+'t='+ +new Date()+'&n='+autoIncrement++;}
function replaceHost(url,hostname){var urlParts=/(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);return urlParts[1]+hostname+urlParts[3];}
function randomNumber(max){return Math.floor(Math.random()*max);}
function randomString(length){var result=[];for(var i=0;i<length;i++){result.push(randomNumber(32).toString(32));}
return result.join('');}
var http_socket=(http_socket_HTTPSocket);var http_streaming_socket_hooks={getReceiveURL:function(url,session){return url.base+'/'+session+'/xhr_streaming'+url.queryString;},onHeartbeat:function(socket){socket.sendRaw('[]');},sendHeartbeat:function(socket){socket.sendRaw('[]');},onFinished:function(socket,status){socket.onClose(1006,'Connection interrupted ('+status+')',false);}};var http_streaming_socket=(http_streaming_socket_hooks);var http_polling_socket_hooks={getReceiveURL:function(url,session){return url.base+'/'+session+'/xhr'+url.queryString;},onHeartbeat:function(){},sendHeartbeat:function(socket){socket.sendRaw('[]');},onFinished:function(socket,status){if(status===200){socket.reconnect();}
else{socket.onClose(1006,'Connection interrupted ('+status+')',false);}}};var http_polling_socket=(http_polling_socket_hooks);var http_xhr_request_hooks={getRequest:function(socket){var Constructor=runtime.getXHRAPI();var xhr=new Constructor();xhr.onreadystatechange=xhr.onprogress=function(){switch(xhr.readyState){case 3:if(xhr.responseText&&xhr.responseText.length>0){socket.onChunk(xhr.status,xhr.responseText);}
break;case 4:if(xhr.responseText&&xhr.responseText.length>0){socket.onChunk(xhr.status,xhr.responseText);}
socket.emit('finished',xhr.status);socket.close();break;}};return xhr;},abortRequest:function(xhr){xhr.onreadystatechange=null;xhr.abort();}};var http_xhr_request=(http_xhr_request_hooks);var HTTP={createStreamingSocket:function(url){return this.createSocket(http_streaming_socket,url);},createPollingSocket:function(url){return this.createSocket(http_polling_socket,url);},createSocket:function(hooks,url){return new http_socket(hooks,url);},createXHR:function(method,url){return this.createRequest(http_xhr_request,method,url);},createRequest:function(hooks,method,url){return new http_request(hooks,method,url);}};var http_http=(HTTP);http_http.createXDR=function(method,url){return this.createRequest(http_xdomain_request,method,url);};var web_http_http=(http_http);var Runtime={nextAuthCallbackID:1,auth_callbacks:{},ScriptReceivers:ScriptReceivers,DependenciesReceivers:DependenciesReceivers,getDefaultStrategy:default_strategy,Transports:transports_transports,transportConnectionInitializer:transport_connection_initializer,HTTPFactory:web_http_http,TimelineTransport:jsonp_timeline,getXHRAPI:function(){return window.XMLHttpRequest;},getWebSocketAPI:function(){return window.WebSocket||window.MozWebSocket;},setup:function(PusherClass){var _this=this;window.Pusher=PusherClass;var initializeOnDocumentBody=function(){_this.onDocumentBody(PusherClass.ready);};if(!window.JSON){Dependencies.load('json2',{},initializeOnDocumentBody);}
else{initializeOnDocumentBody();}},getDocument:function(){return document;},getProtocol:function(){return this.getDocument().location.protocol;},getAuthorizers:function(){return{ajax:xhr_auth,jsonp:jsonp_auth};},onDocumentBody:function(callback){var _this=this;if(document.body){callback();}
else{setTimeout(function(){_this.onDocumentBody(callback);},0);}},createJSONPRequest:function(url,data){return new jsonp_request(url,data);},createScriptRequest:function(src){return new script_request(src);},getLocalStorage:function(){try{return window.localStorage;}
catch(e){return undefined;}},createXHR:function(){if(this.getXHRAPI()){return this.createXMLHttpRequest();}
else{return this.createMicrosoftXHR();}},createXMLHttpRequest:function(){var Constructor=this.getXHRAPI();return new Constructor();},createMicrosoftXHR:function(){return new ActiveXObject('Microsoft.XMLHTTP');},getNetwork:function(){return net_info_Network;},createWebSocket:function(url){var Constructor=this.getWebSocketAPI();return new Constructor(url);},createSocketRequest:function(method,url){if(this.isXHRSupported()){return this.HTTPFactory.createXHR(method,url);}
else if(this.isXDRSupported(url.indexOf('https:')===0)){return this.HTTPFactory.createXDR(method,url);}
else{throw 'Cross-origin HTTP requests are not supported';}},isXHRSupported:function(){var Constructor=this.getXHRAPI();return(Boolean(Constructor)&&new Constructor().withCredentials!==undefined);},isXDRSupported:function(useTLS){var protocol=useTLS?'https:':'http:';var documentProtocol=this.getProtocol();return(Boolean(window['XDomainRequest'])&&documentProtocol===protocol);},addUnloadListener:function(listener){if(window.addEventListener!==undefined){window.addEventListener('unload',listener,false);}
else if(window.attachEvent!==undefined){window.attachEvent('onunload',listener);}},removeUnloadListener:function(listener){if(window.addEventListener!==undefined){window.removeEventListener('unload',listener,false);}
else if(window.detachEvent!==undefined){window.detachEvent('onunload',listener);}}};var runtime=(Runtime);var TimelineLevel;(function(TimelineLevel){TimelineLevel[TimelineLevel["ERROR"]=3]="ERROR";TimelineLevel[TimelineLevel["INFO"]=6]="INFO";TimelineLevel[TimelineLevel["DEBUG"]=7]="DEBUG";})(TimelineLevel||(TimelineLevel={}));var timeline_level=(TimelineLevel);var timeline_Timeline=(function(){function Timeline(key,session,options){this.key=key;this.session=session;this.events=[];this.options=options||{};this.sent=0;this.uniqueID=0;}
Timeline.prototype.log=function(level,event){if(level<=this.options.level){this.events.push(extend({},event,{timestamp:util.now()}));if(this.options.limit&&this.events.length>this.options.limit){this.events.shift();}}};Timeline.prototype.error=function(event){this.log(timeline_level.ERROR,event);};Timeline.prototype.info=function(event){this.log(timeline_level.INFO,event);};Timeline.prototype.debug=function(event){this.log(timeline_level.DEBUG,event);};Timeline.prototype.isEmpty=function(){return this.events.length===0;};Timeline.prototype.send=function(sendfn,callback){var _this=this;var data=extend({session:this.session,bundle:this.sent+1,key:this.key,lib:'js',version:this.options.version,cluster:this.options.cluster,features:this.options.features,timeline:this.events},this.options.params);this.events=[];sendfn(data,function(error,result){if(!error){_this.sent++;}
if(callback){callback(error,result);}});return true;};Timeline.prototype.generateUniqueID=function(){this.uniqueID++;return this.uniqueID;};return Timeline;}());var timeline_timeline=(timeline_Timeline);var transport_strategy_TransportStrategy=(function(){function TransportStrategy(name,priority,transport,options){this.name=name;this.priority=priority;this.transport=transport;this.options=options||{};}
TransportStrategy.prototype.isSupported=function(){return this.transport.isSupported({useTLS:this.options.useTLS});};TransportStrategy.prototype.connect=function(minPriority,callback){var _this=this;if(!this.isSupported()){return failAttempt(new UnsupportedStrategy(),callback);}
else if(this.priority<minPriority){return failAttempt(new TransportPriorityTooLow(),callback);}
var connected=false;var transport=this.transport.createConnection(this.name,this.priority,this.options.key,this.options);var handshake=null;var onInitialized=function(){transport.unbind('initialized',onInitialized);transport.connect();};var onOpen=function(){handshake=factory.createHandshake(transport,function(result){connected=true;unbindListeners();callback(null,result);});};var onError=function(error){unbindListeners();callback(error);};var onClosed=function(){unbindListeners();var serializedTransport;serializedTransport=safeJSONStringify(transport);callback(new TransportClosed(serializedTransport));};var unbindListeners=function(){transport.unbind('initialized',onInitialized);transport.unbind('open',onOpen);transport.unbind('error',onError);transport.unbind('closed',onClosed);};transport.bind('initialized',onInitialized);transport.bind('open',onOpen);transport.bind('error',onError);transport.bind('closed',onClosed);transport.initialize();return{abort:function(){if(connected){return;}
unbindListeners();if(handshake){handshake.close();}
else{transport.close();}},forceMinPriority:function(p){if(connected){return;}
if(_this.priority<p){if(handshake){handshake.close();}
else{transport.close();}}}};};return TransportStrategy;}());var transport_strategy=(transport_strategy_TransportStrategy);function failAttempt(error,callback){util.defer(function(){callback(error);});return{abort:function(){},forceMinPriority:function(){}};}
var strategy_builder_Transports=runtime.Transports;var strategy_builder_defineTransport=function(config,name,type,priority,options,manager){var transportClass=strategy_builder_Transports[type];if(!transportClass){throw new UnsupportedTransport(type);}
var enabled=(!config.enabledTransports||arrayIndexOf(config.enabledTransports,name)!==-1)&&(!config.disabledTransports||arrayIndexOf(config.disabledTransports,name)===-1);var transport;if(enabled){options=Object.assign({ignoreNullOrigin:config.ignoreNullOrigin},options);transport=new transport_strategy(name,priority,manager?manager.getAssistant(transportClass):transportClass,options);}
else{transport=strategy_builder_UnsupportedStrategy;}
return transport;};var strategy_builder_UnsupportedStrategy={isSupported:function(){return false;},connect:function(_,callback){var deferred=util.defer(function(){callback(new UnsupportedStrategy());});return{abort:function(){deferred.ensureAborted();},forceMinPriority:function(){}};}};function getConfig(opts){var config={activityTimeout:opts.activityTimeout||defaults.activityTimeout,authEndpoint:opts.authEndpoint||defaults.authEndpoint,authTransport:opts.authTransport||defaults.authTransport,cluster:opts.cluster||defaults.cluster,httpPath:opts.httpPath||defaults.httpPath,httpPort:opts.httpPort||defaults.httpPort,httpsPort:opts.httpsPort||defaults.httpsPort,pongTimeout:opts.pongTimeout||defaults.pongTimeout,statsHost:opts.statsHost||defaults.stats_host,unavailableTimeout:opts.unavailableTimeout||defaults.unavailableTimeout,wsPath:opts.wsPath||defaults.wsPath,wsPort:opts.wsPort||defaults.wsPort,wssPort:opts.wssPort||defaults.wssPort,enableStats:getEnableStatsConfig(opts),httpHost:getHttpHost(opts),useTLS:shouldUseTLS(opts),wsHost:getWebsocketHost(opts)};if('auth'in opts)
config.auth=opts.auth;if('authorizer'in opts)
config.authorizer=opts.authorizer;if('disabledTransports'in opts)
config.disabledTransports=opts.disabledTransports;if('enabledTransports'in opts)
config.enabledTransports=opts.enabledTransports;if('ignoreNullOrigin'in opts)
config.ignoreNullOrigin=opts.ignoreNullOrigin;if('timelineParams'in opts)
config.timelineParams=opts.timelineParams;if('nacl'in opts){config.nacl=opts.nacl;}
return config;}
function getHttpHost(opts){if(opts.httpHost){return opts.httpHost;}
if(opts.cluster){return "sockjs-"+opts.cluster+".pusher.com";}
return defaults.httpHost;}
function getWebsocketHost(opts){if(opts.wsHost){return opts.wsHost;}
if(opts.cluster){return getWebsocketHostFromCluster(opts.cluster);}
return getWebsocketHostFromCluster(defaults.cluster);}
function getWebsocketHostFromCluster(cluster){return "ws-"+cluster+".pusher.com";}
function shouldUseTLS(opts){if(runtime.getProtocol()==='https:'){return true;}
else if(opts.forceTLS===false){return false;}
return true;}
function getEnableStatsConfig(opts){if('enableStats'in opts){return opts.enableStats;}
if('disableStats'in opts){return!opts.disableStats;}
return false;}
var pusher_Pusher=(function(){function Pusher(app_key,options){var _this=this;checkAppKey(app_key);options=options||{};if(!options.cluster&&!(options.wsHost||options.httpHost)){var suffix=url_store.buildLogSuffix('javascriptQuickStart');logger.warn("You should always specify a cluster when connecting. "+suffix);}
if('disableStats'in options){logger.warn('The disableStats option is deprecated in favor of enableStats');}
this.key=app_key;this.config=getConfig(options);this.channels=factory.createChannels();this.global_emitter=new dispatcher();this.sessionID=Math.floor(Math.random()*1000000000);this.timeline=new timeline_timeline(this.key,this.sessionID,{cluster:this.config.cluster,features:Pusher.getClientFeatures(),params:this.config.timelineParams||{},limit:50,level:timeline_level.INFO,version:defaults.VERSION});if(this.config.enableStats){this.timelineSender=factory.createTimelineSender(this.timeline,{host:this.config.statsHost,path:'/timeline/v2/'+runtime.TimelineTransport.name});}
var getStrategy=function(options){return runtime.getDefaultStrategy(_this.config,options,strategy_builder_defineTransport);};this.connection=factory.createConnectionManager(this.key,{getStrategy:getStrategy,timeline:this.timeline,activityTimeout:this.config.activityTimeout,pongTimeout:this.config.pongTimeout,unavailableTimeout:this.config.unavailableTimeout,useTLS:Boolean(this.config.useTLS)});this.connection.bind('connected',function(){_this.subscribeAll();if(_this.timelineSender){_this.timelineSender.send(_this.connection.isUsingTLS());}});this.connection.bind('message',function(event){var eventName=event.event;var internal=eventName.indexOf('pusher_internal:')===0;if(event.channel){var channel=_this.channel(event.channel);if(channel){channel.handleEvent(event);}}
if(!internal){_this.global_emitter.emit(event.event,event.data);}});this.connection.bind('connecting',function(){_this.channels.disconnect();});this.connection.bind('disconnected',function(){_this.channels.disconnect();});this.connection.bind('error',function(err){logger.warn(err);});Pusher.instances.push(this);this.timeline.info({instances:Pusher.instances.length});if(Pusher.isReady){this.connect();}}
Pusher.ready=function(){Pusher.isReady=true;for(var i=0,l=Pusher.instances.length;i<l;i++){Pusher.instances[i].connect();}};Pusher.getClientFeatures=function(){return keys(filterObject({ws:runtime.Transports.ws},function(t){return t.isSupported({});}));};Pusher.prototype.channel=function(name){return this.channels.find(name);};Pusher.prototype.allChannels=function(){return this.channels.all();};Pusher.prototype.connect=function(){this.connection.connect();if(this.timelineSender){if(!this.timelineSenderTimer){var usingTLS=this.connection.isUsingTLS();var timelineSender=this.timelineSender;this.timelineSenderTimer=new PeriodicTimer(60000,function(){timelineSender.send(usingTLS);});}}};Pusher.prototype.disconnect=function(){this.connection.disconnect();if(this.timelineSenderTimer){this.timelineSenderTimer.ensureAborted();this.timelineSenderTimer=null;}};Pusher.prototype.bind=function(event_name,callback,context){this.global_emitter.bind(event_name,callback,context);return this;};Pusher.prototype.unbind=function(event_name,callback,context){this.global_emitter.unbind(event_name,callback,context);return this;};Pusher.prototype.bind_global=function(callback){this.global_emitter.bind_global(callback);return this;};Pusher.prototype.unbind_global=function(callback){this.global_emitter.unbind_global(callback);return this;};Pusher.prototype.unbind_all=function(callback){this.global_emitter.unbind_all();return this;};Pusher.prototype.subscribeAll=function(){var channelName;for(channelName in this.channels.channels){if(this.channels.channels.hasOwnProperty(channelName)){this.subscribe(channelName);}}};Pusher.prototype.subscribe=function(channel_name){var channel=this.channels.add(channel_name,this);if(channel.subscriptionPending&&channel.subscriptionCancelled){channel.reinstateSubscription();}
else if(!channel.subscriptionPending&&this.connection.state==='connected'){channel.subscribe();}
return channel;};Pusher.prototype.unsubscribe=function(channel_name){var channel=this.channels.find(channel_name);if(channel&&channel.subscriptionPending){channel.cancelSubscription();}
else{channel=this.channels.remove(channel_name);if(channel&&channel.subscribed){channel.unsubscribe();}}};Pusher.prototype.send_event=function(event_name,data,channel){return this.connection.send_event(event_name,data,channel);};Pusher.prototype.shouldUseTLS=function(){return this.config.useTLS;};Pusher.instances=[];Pusher.isReady=false;Pusher.logToConsole=false;Pusher.Runtime=runtime;Pusher.ScriptReceivers=runtime.ScriptReceivers;Pusher.DependenciesReceivers=runtime.DependenciesReceivers;Pusher.auth_callbacks=runtime.auth_callbacks;return Pusher;}());var core_pusher=__webpack_exports__["default"]=(pusher_Pusher);function checkAppKey(key){if(key===null||key===undefined){throw 'You must pass your app key when you instantiate Pusher.';}}
runtime.setup(pusher_Pusher);})]);});}),"./node_modules/webpack/buildin/global.js":/*!***********************************!*\
!*** (webpack)/buildin/global.js ***!
\***********************************//*!no static exports found*/(function(module,exports){var g;g=(function(){return this;})();try{g=g||new Function("return this")();}catch(e){if(typeof window==="object")g=window;}
module.exports=g;}),"./node_modules/webpack/buildin/module.js":/*!***********************************!*\
!*** (webpack)/buildin/module.js ***!
\***********************************//*!no static exports found*/(function(module,exports){module.exports=function(module){if(!module.webpackPolyfill){module.deprecate=function(){};module.paths=[];if(!module.children)module.children=[];Object.defineProperty(module,"loaded",{enumerable:true,get:function(){return module.l;}});Object.defineProperty(module,"id",{enumerable:true,get:function(){return module.i;}});module.webpackPolyfill=1;}
return module;};}),"./resources/css/app.css":/*!*******************************!*\
!*** ./resources/css/app.css ***!
\*******************************//*!no static exports found*/(function(module,exports){}),"./resources/js/app.js":/*!*****************************!*\
!*** ./resources/js/app.js ***!
\*****************************//*!no static exports found*/(function(module,exports,__webpack_require__){__webpack_require__(/*!./bootstrap*/"./resources/js/bootstrap.js");}),"./resources/js/bootstrap.js":/*!***********************************!*\
!*** ./resources/js/bootstrap.js ***!
\***********************************//*!no exports provided*/(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var laravel_echo__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*!laravel-echo*/"./node_modules/laravel-echo/dist/echo.js");window._=__webpack_require__(/*!lodash*/"./node_modules/lodash/lodash.js");window.axios=__webpack_require__(/*!axios*/"./node_modules/axios/index.js");window.axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest';window.Pusher=__webpack_require__(/*!pusher-js*/"./node_modules/pusher-js/dist/web/pusher.js");window.Echo=new laravel_echo__WEBPACK_IMPORTED_MODULE_0__["default"]({broadcaster:'pusher',key:"5cb70a03bed7ab1e6499",cluster:"eu",forceTLS:true});}),0:/*!***********************************************************!*\
!*** multi ./resources/js/app.js ./resources/css/app.css ***!
\***********************************************************//*!no static exports found*/(function(module,exports,__webpack_require__){__webpack_require__(/*!/home/berkan/domains/hwidspoofer.com/resources/js/app.js*/"./resources/js/app.js");module.exports=__webpack_require__(/*!/home/berkan/domains/hwidspoofer.com/resources/css/app.css*/"./resources/css/app.css");})});
