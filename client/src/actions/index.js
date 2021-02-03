import { amenitiesService, photoService, descriptionService} from '../data/data.js';
import axios from 'axios';
const nearbyAPI = 'http://localhost:5001/api/nearbyworkspaces';
const amenitiesAPI = '';
const descriptionAPI = 'http://localhost:6060/api/workspace-description';
const ratesAPI = 'http://localhost:4000/workspace-api/workspace';
const photoAPI = 'http://localhost:6001/api/photos';

// get list of workspaces near given id
export const getWorkspaces = (url) => {
  return new Promise(async (resolve, reject) => {
    const extractId = url.split('/')[2];

    const id = parseInt(extractId);

    if (isNaN(extractId)) {
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
      console.log(error)
      reject(error);
    }
  })
  .catch(error => false);
};

// getters for different services
export const getDescription = async (id) => {
  try {
    const description = await axios.get(`${descriptionAPI}/${id}`);
    return description;
  } catch (error) {
    return false;
  }
};

export const getPhoto = (id) => {
  // return new Promise( async (resolve, reject) => {
  //   console.log(api);
  //   const photo = {};
  //   photo.data = photoService.filter(pic => pic.workspaceId === id)[0];
  //   resolve(photo);
  // });
  return axios.get(`${photoAPI}/${id}`);
};

export const getAmenities = async (id) => {
  return new Promise( async (resolve, reject) => {
    const amenities = {};
    amenities.data = amenitiesService.filter(am => am.workspaceId === id)[0];
    resolve(amenities);
  });
};

export const getRates = async (id) => {
  try {
    const rates = await axios.get(`${ratesAPI}/${id}`);
    return rates;
  } catch (error) {
    return false;
  }
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
      console.log(error)
      reject(error);
    }
  })
    .catch(err => false);
};