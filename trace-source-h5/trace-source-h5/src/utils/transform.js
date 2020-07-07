/**
 * 
 * @param {*} jsonObj 
 * 将查询list中的空值转化为--'无'
 */
export function transform(jsonObj){

    let Obj = {};
    for(let key in jsonObj){
        
        if(typeof jsonObj[key] === "number"){
            jsonObj[key] = String(jsonObj[key]);
        }
        if(key === 'status'){
            jsonObj[key] = "0x1" ? "成功" : "失败";
        }

        if(key === 'uncles'){
            jsonObj[key] = jsonObj[key].length ? jsonObj[key] : '无';
        }
        jsonObj[key] = !jsonObj[key] ? '无' : jsonObj[key];

        Obj[key] = jsonObj[key];

    }
    return Obj;

}