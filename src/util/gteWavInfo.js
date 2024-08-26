import {getDuration, getWavFileInfo} from 'silk-wasm'
import {readFile} from 'fs/promises'


/**
 * 获取wav文件信息
 * @returns {Promise<WavFileInfo>}
 * @param filePath
 */
export const getWavInfo = async (filePath)=>{
    const audio = await readFile(filePath)
    return getWavFileInfo(audio);
}


/**
 * 获取音频时长
 * @param filePath
 * @returns {Promise<number>}
 */
export const obtainDuration=async (filePath)=>{
    const audio = await readFile(filePath)
    return getDuration(audio)
}
