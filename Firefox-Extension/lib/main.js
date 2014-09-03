var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("jquery-1.11.1.min.js"), data.url("socket.io.js"), data.url("mirror.min.js")]
});