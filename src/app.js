// 导入Express框架
import express from 'express'
// 导入Node.js内置的path模块，用于处理路径
import path from "path";
// 导入路由模块
import router from "./router/index.js";

// 创建Express应用实例
const app = express()

// 使用路由器，处理定义在./router/index.js中的路由逻辑
app.use(router)

// 配置静态文件服务，将'src/output'目录下的文件暴露为/static访问路径
app.use('/output', express.static(path.join(process.cwd(), 'src/output')))
app.use('/assets', express.static(path.join(process.cwd(), 'src/assets')))
// 启动服务器，监听3000端口
const port =  3000
app.listen(port, () => {
  console.log(`接口地址 POST http://localhost:${port}`)
})
