// 1.创建koa对象
const Koa = require("koa");
const app = new Koa();
// 2.编写响应函数（中间件）
// ctx: 上下文，web容器
// next:下一个中间件

// 第一层中间件
app.use((ctx, next) => {
  console.log("第一层中间件");
  ctx.response.body = "hello world";
  next();
});
// 第二层中间件
app.use((ctx, next) => {
  console.log("第二层中间件");
  next();
});
// 第三层中间件
app.use((ctx, next) => {
  console.log("第三层中间件");
});
// 3.绑定端口号 暂定3000
app.listen(3000);
