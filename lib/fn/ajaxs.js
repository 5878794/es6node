"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajax = require("request"),
    iconv = require("iconv").Iconv;

var _ajax = function () {
	function _ajax() {
		var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, _ajax);

		this.useCookie = opt.useCookie || false;
		this.request = null;

		this._setCookie();
	}

	_createClass(_ajax, [{
		key: "_setCookie",
		value: function _setCookie() {
			if (this.useCookie) {
				this.request = ajax.defaults({ jar: true });
			} else {
				this.request = ajax.defaults({ jar: false });
			}
		}
	}, {
		key: "_getHeaders",
		value: function _getHeaders(opt) {
			var headers = {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
			};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.entries(opt)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2),
					    key = _step$value[0],
					    val = _step$value[1];

					headers[key] = val;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return headers;
		}
	}, {
		key: "_getUrl",
		value: function _getUrl(type, data, url) {
			if (type != "get") {
				return url;
			}

			var hasW = url.indexOf("?") > -1 ? "&" : "?",
			    urlParam = "";

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Object.entries(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _step2$value = _slicedToArray(_step2.value, 2),
					    key = _step2$value[0],
					    val = _step2$value[1];

					urlParam += "&" + key + "=" + val;
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			urlParam = urlParam.substr(1);

			return url + hasW + urlParam;
		}
	}, {
		key: "send",
		value: function send(opt) {
			var _opt$url = opt.url,
			    url = _opt$url === undefined ? "/" : _opt$url,
			    _opt$data = opt.data,
			    data = _opt$data === undefined ? {} : _opt$data,
			    _opt$headers = opt.headers,
			    headers = _opt$headers === undefined ? {} : _opt$headers,
			    _opt$type = opt.type,
			    type = _opt$type === undefined ? "get" : _opt$type,
			    _opt$serverCode = opt.serverCode,
			    serverCode = _opt$serverCode === undefined ? "" : _opt$serverCode,
			    _opt$timeout = opt.timeout,
			    timeout = _opt$timeout === undefined ? 30000 : _opt$timeout;


			var _this = this;

			headers = this._getHeaders(headers);
			url = this._getUrl(type, data, url);

			return new Promise(function (success, error) {
				_this.request({
					url: url,
					method: type,
					form: type == "get" ? "" : data,
					encoding: null,
					headers: headers
				}, function (err, res, body) {
					if (err) {
						success({
							state: 0,
							msg: err
						});
					} else {
						if (serverCode) {
							var Iconv = new iconv(serverCode, 'UTF-8');
							var buffer = Iconv.convert(body);
							body = buffer.toString();
						} else {
							body = body.toString();
						}

						success({
							state: 1,
							data: body
						});
					}
				});
			});
		}
	}]);

	return _ajax;
}();

module.exports = _ajax;