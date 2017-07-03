let localData  = {
	userData: null,
		name: location.hostname,
		init: function () {
		if (!this.userData) {
			try {
				this.userData = document.createElement('INPUT');
				this.userData.type = "hidden";
				this.userData.style.display = "none";
				this.userData.addBehavior("#default#userData");
				document.body.appendChild(this.userData);
				var expires = new Date();
				expires.setDate(expires.getDate() + 365);
				this.userData.expires = expires.toUTCString();
			} catch (e) {
				return false;
			}
		}
		return true;

	},
	setItem: function (key, value) {
		if (window.localStorage) {
			window.localStorage[key] = value;
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.setAttribute(key, value);
				this.userData.save(this.name);
			}
		}

	},
	getItem: function (key) {
		if (window.localStorage) {
			return window.localStorage[key];
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				return this.userData.getAttribute(key)
			}
		}

	},
	removeItem: function (key) {
		if (window.localStorage) {
			window.localStorage.removeItem(key);
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.removeAttribute(key);
				this.userData.save(this.name);
			}
		}
	}
};


module.exports = localData;