window.setTimeout(function () {
  var version = config.welcome.version;
  if (!version) {
    app.tab.open(app.homepage() + "?v=" + app.version() + "&type=install");
    config.welcome.version = app.version();
  }
}, 3000);

app.button.onCommand(function () {config.addon.active = !config.addon.active});
app.options.receive("get", function (pref) {
  app.options.send("set", {
    "pref": pref,
    "value": config.get(pref)
  })
});

app.options.receive("changed", function (o) {
  config.set(o.pref, o.value);
  app.options.send("set", {"pref": o.pref, "value": config.get(o.pref)});
});

app.tab.listener(function (id) {
  config.addon.badge[id] = 0;
  window.setTimeout(function () {app.button.badge(id)}, 0);
});

app.onBeforeRequest(function (info) {
  var id = info.tabId;
  config.addon.badge[id] = config.addon.badge[id] ? config.addon.badge[id] + 1 : 1;
  window.setTimeout(function () {app.button.badge(id)}, 0);
  //console.error("Coin miner blocked", info.url);
  return {"cancel": true};
});
