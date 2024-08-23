import { getWavFileInfo } from 'silk-wasm'
import { readFile } from 'fs/promises'


/**
 * 获取wav文件信息
 * @param path
 * @returns {Promise<WavFileInfo>}
 */
const getWavInfo = async (path='48000.wav')=>{
    const audio = await readFile(`./src/assets/upload/${path}`)
    const info = await getWavFileInfo(audio)
    console.log(info)
    return info
}
export default getWavInfo