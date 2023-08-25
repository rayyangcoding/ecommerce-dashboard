export default class SocketService {
  // 单例设计模式
  static instance = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService();
    }
    return this.instance;
  }

  // 和服务端连接的socket对象
  ws = null;

  // 标识是否连接成功
  connected = false;
  // 重试发送数据的次数
  sendRetryCount = 0;
  // 重试连接的次数
  connectRetryCount = 0;

  // 存储回调函数
  callBackMapping = {};

  // 定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log("您的浏览器不支持WebSocket");
    }
    this.ws = new WebSocket("ws://localhost:9998");

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端成功了");
      this.connected = true;
      // 重置重新连接的次数
      this.connectRetryCount = 0;
    };
    // 1.连接服务端失败
    // 2.连接成功之后服务器关闭的情况
    this.ws.onclose = () => {
      console.log("连接服务端失败");
      this.connected = false;
      this.connectRetryCount++;
      setTimeout(() => {
        this.connect();
      }, this.connectRetryCount * 500);
    };
    // 得到服务端发送过来的数据
    this.ws.onmessage = (msg) => {
      console.log("从服务端获取数据");
      // 真正服务端发送过来的原始数据
      // console.log(msg.data);
      const recvData = JSON.parse(msg.data);
      const socketType = recvData.socketType;
      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action;
        if (action === "getData") {
          const realData = JSON.parse(recvData.data);
          this.callBackMapping[socketType].call(this, realData);
        } else if (action === "fullScreen") {
          this.callBackMapping[socketType].call(this, recvData);
        } else if (action === "themeChange") {
          this.callBackMapping[socketType](this, recvData);
        }
      }
    };
  }
  // 回调函数的注册
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack;
  }
  // 取消某一个回调函数
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null;
  }
  // 发送数据的方法
  send(data) {
    // 判断此时有没有连接成功
    if (this.connected) {
      // 重置重发数据的次数
      this.sendRetryCount = 0;
      this.ws.send(JSON.stringify(data));
    } else {
      // 重连
      this.sendRetryCount++;
      setTimeout(() => {
        this.send(data);
      }, this.sendRetryCount * 500);
    }
  }
}
