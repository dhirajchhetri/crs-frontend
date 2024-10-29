import bbox from '@turf/bbox';
import { province } from '../assets/geojson/province';
import { locallevel } from '../assets/geojson/locallevel';
import { wardbnd } from '../assets/geojson/wardbnd';
export const getMapData = () => {
    const data = [];
    province.features.forEach((x, index) => {
        const [minLng, minLat, maxLng, maxLat] = bbox(x);
        data.push({
            minLongitude: minLng,
            maxLongitude: maxLng,
            minLatitude: minLat,
            maxLatitude: maxLat,
            label: x.properties.label,
            id: `${index}_${x.properties.label}`
        });
    });
    return data;
};

export const getDistrictData = (mapData) => {
    const data = [];
    mapData.features.forEach((x, index) => {
        const [minLng, minLat, maxLng, maxLat] = bbox(x);
        data.push({
            minLongitude: minLng,
            maxLongitude: maxLng,
            minLatitude: minLat,
            maxLatitude: maxLat,
            label: x.properties.DISTRICT,
            id: `${index}_${x.properties.label}`
        });
    });
    return data;
};

export const getlocalData = () => {
    const data = [];
    locallevel.features.forEach((x, index) => {
        const [minLng, minLat, maxLng, maxLat] = bbox(x);
        data.push({
            minLongitude: minLng,
            maxLongitude: maxLng,
            minLatitude: minLat,
            maxLatitude: maxLat,
            label: x.properties.GaPa_NaPa,
            id: `${index}_${x.properties.label}`
        });
    });
    return data;
};


