import axios from 'axios';
// import { amenitiesService, photoService, descriptionService} from '../data/data.js';
axios.defaults.timeout = 3000;
const nearbyAPI = '/api/nearbyworkspaces';
const amenitiesAPI = '/amenities-api/amenity';
const descriptionAPI = '/api/workspace-info';
const ratesAPI = '/workspace-api/workspace';
const photoAPI = '/api/photos';

// get list of workspaces near given id
export const getWorkspaces = () => {
  return new Promise(async (resolve, reject) => {
    const splitUrl = window.location.pathname.split('/').filter((el) => el);
    const rawId = splitUrl[splitUrl.length - 1];

    const id = parseInt(rawId);

    if (Number.isNaN(id)) {
      resolve(false);
      return;
    }

    try {
      const { data } = await axios.get(`${nearbyAPI}/buildings/${id}`);
      if (data.success === false) {
        resolve(false);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
    .catch(() => false);
};
