var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
if (chrome.runtime.setUninstallURL) chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "listener": function (callback) {
    chrome.tabs.onRemoved.addListener(function (tabId, info) {delete config.addon.badge[tabId]});
    chrome.tabs.onCreated.addListener(function (tab) {callback(tab.id)});
    chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
      if (info.status === "loading") callback(tabId);
    });
  }
};

app.button = (function () {
  var onCommand;
  chrome.browserAction.onClicked.addListener(function () {if (onCommand) onCommand()});
  /*  */
  return {
    "onCommand": function (c) {onCommand = c},
    "icon": function (e) {
      chrome.browserAction.setIcon({
        "path": {
          '16': '../../data/icons/' + e + '/16.png',
          '32': '../../data/icons/' + e + '/32.png',
          '48': '../../data/icons/' + e + '/48.png',
          '64': '../../data/icons/' + e + '/64.png'
        }
      });
    },
    "badge": function (tabId) {
      if (tabId) {
        var number = config.addon.badge[tabId];
        var str = number && number > 0 ? number + '' : '';
        var tmp = tabId ? {"text": str, "tabId": tabId} : {"text": str};
        chrome.browserAction.setBadgeText(tmp);
      }
    }
  };
})();

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      objs[id] = data;
      tmp[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.options = (function () {
  var _tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in _tmp) {
      if (_tmp[id] && (typeof _tmp[id] === "function")) {
        if (request.path === 'options-to-background') {
          if (request.method === id) _tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {_tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": 'background-to-options', "method": id, "data": data});
    }
  }
})();

app.onBeforeRequest = function (callback) {
  var beforerequest = function (info) {return callback(info)};
  var updatelistener = function (e) {
    var urls = JSON.parse(config.addon.filter.list);
    app.button.icon(config.addon.active ? "active" : "inactive");
    chrome.webRequest.onBeforeRequest.removeListener(beforerequest, {"urls": urls}, ["blocking"]);
    if (config.addon.active) chrome.webRequest.onBeforeRequest.addListener(beforerequest, {"urls": urls}, ["blocking"]);
  };
  /*  */
  window.setTimeout(updatelistener, 300);
  chrome.storage.onChanged.addListener(updatelistener);
};
