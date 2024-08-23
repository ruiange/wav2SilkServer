import { encode } from 'silk-wasm'
import { readFile, writeFile } from 'fs/promises'
import {v4 as uuidv4} from "uuid";



const wav2silk = async (path,SampleRate=24000)=>{
   try{
       const pcm = await readFile(`./src/assets/upload/${path}`)
       const silk = await encode(pcm, SampleRate)
       const filePath =`${uuidv4()}.silk`
       await writeFile(`./src/output/${filePath}`, silk.data)
       return filePath
   }catch (e) {
       return e.message
   }
}
export default wav2silk