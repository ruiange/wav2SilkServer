import { getWavFileInfo } from 'silk-wasm'
import { readFile, writeFile } from 'fs/promises'



const getWavInfo = async ()=>{
    const audio = await readFile('./src/assets/audio/xx.wav')
    const info = await getWavFileInfo(audio)
    console.log(info)
    return info
}
export default getWavInfo