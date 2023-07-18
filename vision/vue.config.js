const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    host: "127.0.0.1",
    port: 8999,
    open: true,
    // proxy:'http://127.0.0.1:8999'
  },
  
});
