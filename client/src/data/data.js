const photos = [
  'https://images.unsplash.com/photo-1572969176403-0d6e50b9ee5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=723&q=80',
  'https://images.unsplash.com/photo-1511084891045-5415f5b81475?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1523509433743-6f42a58221df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=891&q=80',
  'https://images.unsplash.com/photo-1558985819-a7c3fbf3d45a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80'
];

export const photoService = [];

const photo = (workspaceId) => {
  let i = Math.floor(Math.random() * photos.length);
  return {
    workspaceId,
    photo: photos[i]
  };
};

export const descriptionService = [];

const description = (workspaceId) => {
  return {
    name: `Workspace #${workspaceId}`,
    price: Math.floor(Math.random() * 100 + 100),
    workspaceId
  };
};

export const amenitiesService = [];

const amenities = [
  ['Gym', 'Lounge', 'Dogs allowed'],
  [],
  [`Mother's room`, 'Free parking'],
  ['Coffee']
];

const makeAmenities = (workspaceId) => {
  return {
    amenities: amenities[Math.floor(Math.random() * amenities.length)],
    workspaceId
  }
};

for (let i = 0; i < 100; i++) {
  amenitiesService.push(makeAmenities(i));
  descriptionService.push(description(i));
  photoService.push(photo(i));
}
