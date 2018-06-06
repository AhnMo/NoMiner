var config = {};

config.welcome = {
  get version () {return app.storage.read("version")},
  set version (val) {app.storage.write("version", val)}
};

var CMFL = JSON.stringify([
  "*://*.edgeno.de/*",
  "*://*.lmodr.biz/*",
  "*://ppoi.org/lib/*",
  "*://*.listat.biz/*",
  "*://ppoi.org/lib/*",
  "*://papoto.com/lib/*",
  "*://*.ppoi.org/lib/*",
  "*://*.2giga.link/js*",
  "*://webmine.cz/miner*",
  "*://coin-have.com/c/*",
  "*://*.reasedoper.pw/*",
  "*://*.jyhfuqoh.info/*",
  "*://rocks.io/assets/*",
  "*://*.rocks.io/proxy*",
  "*://*.ppoi.org/token/*",
  "*://coinerra.com/lib/*",
  "*://ad-miner.com/lib/*",
  "*://*.rocks.io/assets/*",
  "*://*.jsecoin.com/lib/*",
  "*://*.ad-miner.com/lib/*",
  "*://authedmine.com/lib/*",
  "*://*.afminer.com/code/*",
  "*://coinnebula.com/lib/*",
  "*://*.mataharirama.xyz/*",
  "*://crypto-loot.com/lib*",
  "*://*.coinhive.com/lib/*",
  "*://joyreactor.cc/ws/ch/*",
  "*://*.coinblind.com/lib/*",
  "*://*.minecrunch.co/web/*",
  "*://*.jsecoin.com/proxy/*",
  "*://*.coin-hive.com/lib/*",
  "*://*.jsecoin.com/server/*",
  "*://*.coinhive.com/proxy/*",
  "*://minero.pw/miner.min.js*",
  "*://*.jsecoin.com/captcha/*",
  "*://*.coinhive.com/server/*",
  "*://*.coin-hive.com/proxy/*",
  "*://*.coinhive.com/captcha/*",
  "*://*.crypto-loot.com/proxy*",
  "*://cookiescript.info/libs/*",
  "*://*.coin-hive.com/server/*",
  "*://*.coin-hive.com/captcha/*",
  "*://party-nngvitbizn.now.sh/*",
  "*://*.minemytraffic.com/lib/*",
  "*://*.cookiescript.info/libs/*",
  "*://cookiescriptcdn.pro/libs/*",
  "*://coinlab.biz/lib/coinlab.js*",
  "*://*.minemytraffic.com/proxy/*",
  "*://monerominer.rocks/miner.php*",
  "*://*.minemytraffic.com/server/*",
  "*://*.minemytraffic.com/captcha/*",
  "*://miner.pr0gramm.com/xmr.min.js*",
  "*://monerominer.rocks/scripts/miner.js*",
  "*://kissdoujin.com/Content/js/c-hive.js*",
  "*://kisshentai.net/Content/js/c-hive.js*",
  "*://kiwifarms.net/js/Jawsh/xmr/xmr.min.js*",
  "*://anime.reactor.cc/js/ch/cryptonight.wasm*",
  "*://cdn.cloudcoins.co/javascript/cloudcoins.min.js*"
], null, 2);

config.addon = {
  "badge": {},
  set active (val) {app.storage.write("active", val)},
  get active () {return app.storage.read("active") !== undefined ? app.storage.read("active") : true},
  "filter": {
    set list (val) {app.storage.write("list", val)},
    get list () {return app.storage.read("list") !== undefined ? app.storage.read("list") : CMFL}
  }
};

config.get = function (name) {return name.split('.').reduce(function (p, c) {return p[c]}, config)};

config.set = function (name, value) {
  function set(name, value, scope) {
    name = name.split('.');
    if (name.length > 1) {
      set.call((scope || this)[name.shift()], name.join('.'), value);
    } else this[name[0]] = value;
  }
  set(name, value, config);
};
