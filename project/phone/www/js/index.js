"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

$(document).ready(function () {
	PAGE.init().catch(function (e) {
		return console.log(e);
	});
});

var PAGE = {
	az: [],
	init: function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return this.createPY();

						case 2:
							_context.next = 4;
							return this.createAZ();

						case 4:
							_context.next = 6;
							return this.bindEvent();

						case 6:
							_context.next = 8;
							return this.createListType();

						case 8:
							_context.next = 10;
							return this.createListItem();

						case 10:
							_context.next = 12;
							return this.addListEvent();

						case 12:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function init() {
			return _ref.apply(this, arguments);
		}

		return init;
	}(),
	createPY: function createPY() {
		var az = {};

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = DATA[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var obj = _step.value;

				var name = obj.name,
				    jp = DEVICE.pingying.getJP(name),
				    qp = DEVICE.pingying.getQP(name),
				    sp = jp.substr(0, 1);

				obj.jp = jp;
				obj.qp = qp;

				az[sp] = true;
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

		var newAZ = [];
		for (var key in az) {
			if (az.hasOwnProperty(key)) {
				newAZ.push(key);
			}
		}
		newAZ.sort();

		this.az = newAZ;
	},
	createAZ: function createAZ() {
		var list = $('<span class="center boxflex1"></span>'),
		    body = $("#az");

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this.az[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var az = _step2.value;

				var this_list = list.clone();

				this_list.text(az.toUpperCase());

				body.append(this_list);
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
	},
	createListType: function createListType() {
		var body = $("#main"),
		    list = $("#type");

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = this.az[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var az = _step3.value;

				var this_list = list.clone().attr({ id: "" }).css({ display: "block" });

				this_list.attr({ id: az });
				this_list.find("p").text(az.toUpperCase());

				body.append(this_list);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}
	},
	createListItem: function createListItem() {
		for (var key in DATA) {
			if (DATA.hasOwnProperty(key)) {
				var this_data = DATA[key],
				    this_first_p = this_data.jp.substr(0, 1),
				    this_body = $("#" + this_first_p),
				    this_list = $('<span></span>');

				this_list.data({
					phone: this_data.phone,
					qp: this_data.qp,
					jp: this_data.jp
				});
				this_list.text(this_data.name);

				this_body.append(this_list);
			}
		}
	},
	addListEvent: function addListEvent() {
		var item = $("#main").find("span");

		$$(item).myclickok(function () {
			var phone = $(this).data("phone");
			DEVICE.tel(phone);
		});
	},
	bindEvent: function bindEvent() {
		var search = $("#search"),
		    az = $("#az").find("span"),
		    _this = this;

		$$(az).myclickok(function () {
			var az = $(this).text() || "";
			az = az.toLowerCase();

			_this.scrollToDom(az);
		});

		search.get(0).addEventListener("input", function () {
			var text = $(this).val();
			text = $.trim(text);
			_this.search(text);
		}, false);
	},
	scrollToDom: function scrollToDom(str) {
		var obj = $("#" + str),
		    top = obj.offset().top - 40;

		$("body").animate({ scrollTop: top + "px" });
	},
	search: function search(text) {
		text = text.toLowerCase();

		var body = $("#main"),
		    az = $("#az");

		if (!text) {
			body.find("p").css({ display: "block" });
			body.find("span").css({ display: "block" });
			az.css3({ display: "box" });

			return;
		}

		az.css({ display: "none" });
		body.find("p").css({ display: "none" });

		body.find("span").each(function () {
			var name = $(this).text(),
			    phone = $(this).data("phone"),
			    qp = $(this).data("qp"),
			    jp = $(this).data("jp");

			if (jp.indexOf(text) > -1 || qp.indexOf(text) > -1 || name.indexOf(text) > -1 || phone.indexOf(text) > -1) {
				$(this).css({ display: "block" });
			} else {
				$(this).css({ display: "none" });
			}
		});
	}
};

//# sourceMappingURL=index.js.map