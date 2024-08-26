import express from "express";
import fileUpload from 'express-fileupload';
import path from "path";
import fs from "fs";
import {v4 as uuidv4} from 'uuid';
import wav2silk from "../index.js";

const router = express.Router();

router.use(
    fileUpload({
        createParentPath: true,
    }),
);
router.post("/", async (req, res) => {
    //获取请求域名
    const host = req.headers.host;
    //获取请求协议
    const protocol = req.protocol;

    const SampleRate = req.body.SampleRate

    if (!SampleRate) {
        return res.send('请填写采码率')
    }


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send('请上传文件')
    }
    // 访问上传的文件
    let uploadedFile = req.files.file;


    // 确保 uploads 目录存在
    const uploadDir = path.join(process.cwd(), 'src/assets/upload');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }


    // 使用 UUID 生成唯一的文件名，保留文件扩展名
    const fileExtension = path.extname(uploadedFile.name);
    const uniqueFileName = `${Date.now()}-${uuidv4()}${fileExtension}`;
    // 设置文件存储路径
    const uploadPath = path.join(uploadDir, uniqueFileName);
    // 使用 mv() 方法将文件存储到服务器
    await uploadedFile.mv(uploadPath, async (err) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        const file = {
            name: uploadedFile.name,
            mimetype: uploadedFile.mimetype,
            size: uploadedFile.size,
            path: uniqueFileName,
        };

        const filePath = await wav2silk(file.path, SampleRate)


        res.send(`${protocol}://${host}/output/${filePath}`)
    });


});


router.get('/', (req, res) => {
    //返回一个html页面
    res.sendFile(path.join(process.cwd(), 'src/assets/html/index.html'))
})
export default router;