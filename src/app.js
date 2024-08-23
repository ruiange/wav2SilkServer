import express from 'express'
import * as path from "node:path";
import router from "./router/index.js";

const app = express()

app.use(router)
//设置src/assets目录为静态资源目录
app.use('/output', express.static(path.join(process.cwd(), 'src/output')));




app.listen(3000, () => {
  console.log('http://localhost:3000')
  console.log('http://localhost:3000/info')
})