import { amenitiesService, photoService, descriptionService} from '../data/data.js';
import axios from 'axios';
axios.defaults.timeout = 3000;
const nearbyAPI = '/api/nearbyworkspaces';
const amenitiesAPI = '/amenities-api/amenity';
const descriptionAPI = '/api/workspace-description';
const ratesAPI = '/workspace-api/workspace';
const photoAPI = '/api/photos';

// get list of workspaces near given id
export const getWorkspaces = () => {
  return new Promise(async (resolve, reject) => {
    let splitUrl = window.location.pathname.split('/').filter(el => el);
    let rawId =  splitUrl[splitUrl.length - 1];

    const id = parseInt(rawId);

    if (isNaN(id)) {
      resolve(false);
      return;
    }

    try {
      const { data } = await axios.get(`${nearbyAPI}/buildings/${id}`);
      if (data.success === false) {
        resolve(false);
      }
      resolve(data.nearbyWorkspaces);
    } catch (error) {
      reject(error);
    }
  })
  .catch(error => false);
};

// getters for different services
export const getDescription = async (id) => {
    return axios.get(`${descriptionAPI}/${id}`).catch(() => false);
};

export const getPhoto = (id) => {
  return axios.get(`${photoAPI}/${id}`).catch(() => false);
};

export const getAmenities = async (id) => {
  return axios.get(`${amenitiesAPI}/${id}`).catch(() => false);
};

export const getRates = async (id) => {
    return axios.get(`${ratesAPI}/${id}`).catch(() => false);
  
}

// aggregate data from all getters into one object
export const getWorkspaceInfo = (id) => {
  return new Promise( async (resolve, reject) => {
    try {
      const info = {};
      const description = await getDescription(id);
      info.description = description ? description.data : {};

      const photo = await getPhoto(id);
      info.photo = photo ? photo.data : {};

      const amenities = await getAmenities(id);
      info.amenities = amenities ? amenities.data : {};

      const rates = await getRates(id);
      info.rates = rates ? rates.data[0] : {};

      resolve(info);
    } catch (error) {
      reject(error);
    }
  })
    .catch(err => false);
};

