// 导入Express框架
import express from 'express'
// 导入Node.js内置的path模块，用于处理路径
import path from "path";
// 导入路由模块
import router from "./router/index.js";

// 创建Express应用实例
const app = express()

app.use(router)

// 配置静态文件服务，将'src/output'目录下的文件暴露为/static访问路径
app.use('/output', express.static(path.join(process.cwd(), 'src/output')))
app.use('/assets', express.static(path.join(process.cwd(), 'src/assets')))


const PORT = process.env.PORT || 3010; // 使用环境变量或默认端口3000
app.listen(PORT, () => {
  console.log(`接口地址 POST http://localhost:${PORT}`)
})
