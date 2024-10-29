// import AxiosMockAdapter from 'axios-mock-adapter';
// import axios from './axios';

// const services = new AxiosMockAdapter(axios, { delayResponse: 0 });
// export default services;

import * as hashFunction from 'md5';
import { colors } from '../config/constant';
export const formatDistricts = ({ data = [] }) => {
    const districts = [];
    if (!data.length > 0) return districts;
    const result = data.map((district) => {
        districts.push(district.reg_district);
        return {
            value: district.reg_district,
            label: toTitleCase(district.reg_district)
        };
    });
    return { json: [...result], selected: [] };
};
export const formatPalikas = ({ data }) => {
    const palikas = [];
    if (!data.length > 0) return palikas;
    const result = data.map((palika) => {
        palikas.push(palika.reg_palika);
        return {
            value: palika.reg_palika,
            label: toTitleCase(palika.reg_palika)
        };
    });
    return { json: [...result], selected: [] };
};
export const formatWards = ({ data }) => {
    const wards = [];
    if (!data.length > 0) return wards;
    const result = data.map((ward) => {
        wards.push(ward.reg_current_ward);
        return {
            value: ward.reg_current_ward,
            label: 'Ward-' + ward.reg_current_ward
        };
    });
    return { json: [...result], selected: [] };
};
export const formatYear = (year) => {
    const result = year.map((x) => {
        return {
            label: x,
            value: x
        };
    });
    return result;
};

export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const createDatumTrancheRecievedCurrent = (dataArray = [], colorArray) => {
    if (dataArray.length == 0) return [];
    const resultArray = [
        { tranche_received: 'First', count: 0 },
        { tranche_received: 'Second', count: 0 },
        { tranche_received: 'Third', count: 0 }
    ];
    dataArray.forEach((el) => {
        if (el.dd_receive_1st_tranche === 'yes') {
            let index = resultArray.findIndex((x) => x.tranche_received === 'First');
            resultArray[index].count += Number(el.count);
        }
        if (el.dd_receive_2nd_tranche === 'yes') {
            let index = resultArray.findIndex((x) => x.tranche_received === 'Second');
            resultArray[index].count += Number(el.count);
        }
        if (el.dd_receive_3rd_tranche === 'yes') {
            let index = resultArray.findIndex((x) => x.tranche_received === 'Third');
            resultArray[index].count += Number(el.count);
        }
    });
    return createDatum('tranche_received', resultArray, colorArray);
};
export const createDatum = (key, dataArray = [], colorArray = colorArray) => {
    if (!dataArray.length > 0) return [];
    const result = dataArray.map((x, index) => {
        if (x[key]) {
            return {
                key: toTitleCase(x[key]),
                y: parseInt(x['count']),
                color: colorArray[index]
            };
        } else {
            return {
                key: 'NULL',
                y: parseInt(x['count']),
                color: colorArray[index]
            };
        }
    });
    return result;
};

export const createAgeDatum = (key, dataArray, colorArray) => {
    if (!dataArray && dataArray.length == 0) return [];
    let arrayRange = [0, 14, 15, 24, 25, 54, 55, 64, 65, 150];
    let output = generateHashMap(dataArray, arrayRange);
    const datum = [{ key: 'hh_age', values: [] }];
    let i = 0;
    for (let [key, value] of Object.entries(output)) {
        datum[0].values.push({
            label: key === '65-150' ? '65 and above' : key,
            value: value,
            color: colorArray[i]
        });
        i++;
    }
    return datum;
};

export const createKPIDatum = (key, dataArray, colorArray) => {
    if (!dataArray && dataArray.length == 0) return [];

    var target = [],
        inprogress = [],
        actual = [];

    dataArray?.forEach((el) => {
        if(el.quarter===4){
            
            target.push([Date.parse(el.start_date),Number(el.target)]);
        }
        inprogress.push([Date.parse(el.start_date),Number(el.in_progress)]);
        actual.push([Date.parse(el.start_date),Number(el.actual)]);
    });
    const datum = [
        {
            data: target,
            name: 'Target',
        },
        {
            data: inprogress,
            name: 'In progress',
        },
        {
            data: actual,
            name: 'Actual',
        }
    ];
   
    return datum;
};

export const createKPITrancheDatum = (dataArray) => {
    if (!dataArray && dataArray.length == 0) return [];

    var actual = [];

    dataArray?.forEach((el) => {
        actual.push(el.actual_value);
    });

    const datum = [
        {
            data: actual,
            name: 'Actual',
            pointInterval: 3,
            pointIntervalUnit: 'month',
            pointStart: Date.UTC(2018, 0, 1)
        }
    ];
    return datum;
};
const generateHashMap = (dataArray, arrayRange) => {
    let output = {};
    if (!dataArray.length > 0) return output;
    dataArray.map(({ age, count }) => {
        for (const [index, value] of arrayRange.entries()) {
            if (age > value) continue;
            if (age <= value) {
                if (arrayRange[index - 1] && age > arrayRange[index - 1] && arrayRange[index] - arrayRange[index - 1] > 1) {
                    output[`${arrayRange[index - 1]}-${value}`] = output[`${arrayRange[index - 1]}-${value}`]
                        ? output[`${arrayRange[index - 1]}-${value}`] + Number(count)
                        : Number(count);
                } else continue;
            }
        }
    });
    return output;
};

export const removeItemFromArray = (itemArray, individualItems) => {
    for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i] === individualItems) {
            itemArray.splice(i, 1);
            i--;
        }
    }
    return itemArray;
};

/**

 * @param {*} itemArray
[ house_contruct:"brick_masonry_in_cement_mortar_bmc" // x
     district:"chitwan" //key
    count:"78"]
 * @param {*} key
 * @param {*} xValue
 * @param {*} colorArray
 * @returns  array of
 *    { "key": "Stream #0",
"color": "#A389D4",
"values":[
   {
   x:0,
   y:0

 ]}
 *
 */

export const creatDatumMutiBarChart = (key, xValue, itemArray, colorArray) => {
    let resultObjArray = [];
    let resultObjKeysArray = [];
    if (itemArray.length > 0) {
        for (const [i, item] of itemArray.entries()) {
            if (resultObjKeysArray.includes(item[key])) {
                let keyData = resultObjArray.find((x) => x.key === item[key]);
                keyData.values.push({ x: item[xValue], y: Number(item['count']) });
            } else {
                resultObjKeysArray.push(item[key]);
                resultObjArray.push({
                    key: item[key],
                    color: colorArray[i],
                    values: [
                        {
                            x: item[xValue],
                            y: Number(item['count'])
                        }
                    ]
                });
            }
        }
    }
    return resultObjArray;
};

export const generateRedisKey = (config) => {
    const { url, data } = config;
    const hashString = JSON.stringify(url) + JSON.stringify(data);
    return hashFunction(hashString);
};
