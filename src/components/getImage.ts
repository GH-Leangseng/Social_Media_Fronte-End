import { base_url } from "../base.url"
export const getImage= (image_part : String)=>{
        return base_url+"/"+image_part;
}