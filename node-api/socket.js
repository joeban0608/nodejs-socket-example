let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000", // 允許的前端網址
        methods: ["GET", "POST", "PUT", "DELETE"], // 允許的 HTTP 方法
        allowedHeaders: ["Content-Type"], // 允許的 headers
        // credentials: true, // 允許攜帶憑證（如 cookies）
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
