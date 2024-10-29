import { colors } from "../config/constant";

export const getHighChartsCategories=(dataArray=[],key)=>{
    if(!dataArray.length>0) return []
    let result = new Set();
    dataArray.map(x=>
        result.add(x[key]));
        return Array.from(result);
}

export const getHighChartsStackedBarSeriesData=(dataArray=[],dataCategoryArray=[],dataCatKey, names=[])=>{
    // 
    //@@output
    //[{
    //     name:'',
    //     data:[],
    // }]
    let resultObjArray=[]
    names.map((name,index)=>{
        resultObjArray.push({
            name:String(name).toUpperCase(),
            data:new Array(dataCategoryArray.length).fill(0),
            color: colors[index]

        })
    })

   

    dataArray.map(x=>{
        let index=dataCategoryArray.findIndex(y=> y===x[dataCatKey])
            resultObjArray.map(r=>{
                        let nameKey=String(r.name).toLowerCase()
                        r.data[index]+=Number(x[nameKey])
            })
    })
    return resultObjArray
   
}

export const findObjectArrayWithTwoKeys=(objectArray, key1, key2, value1, value2)=>{
    let index= objectArray.findIndex(x=>{
        return x[key1]===value1 && x[key2] ===value2
    })
    return index?objectArray[index]:-1;
}