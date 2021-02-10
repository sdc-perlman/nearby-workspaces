exports.nearbyResults = {"data": {"origin":{"rawAddress":"4011 S Central Ave, Los Angeles, CA 90011, USA","coordinates":[34.0105442,-118.2569161],"formattedAddress":"4011 S Central Ave, Los Angeles, CA 90011, USA","streetName":"South Central Avenue","streetNumber":"4011","neighborhood":"South Los Angeles","city":"Los Angeles","state":"CA","country":"United States","countryCode":"US","zipcode":"90011","_id":"6007ecc57f40ee033f605a88","geometry":{"type":"Point","coordinates":[-118.2569161,34.0105442],"_id":"6007ecc57f40ee033f605a89"},"workspaceId":1,"workspaceSlug":"hammock-tousled-hella-tofu-keffiyeh-air-plant","workspace":"6007cf72a86dc57d8a0e544e","__v":0},"nearbyWorkspaces":[{"rawAddress":"2810 S Figueroa St, Los Angeles, CA 90007, USA","coordinates":[34.0260793,-118.2769181],"formattedAddress":"2810 S Figueroa St, Los Angeles, CA 90007, USA","streetName":"South Figueroa Street","streetNumber":"2810","neighborhood":"South Los Angeles","city":"Los Angeles","state":"CA","country":"United States","countryCode":"US","zipcode":"90007","_id":"6007ecc57f40ee033f605a8a","geometry":{"type":"Point","coordinates":[-118.2769181,34.0260793],"_id":"6007ecc57f40ee033f605a8b"},"workspaceId":2,"workspaceSlug":"vegan-raclette-90s-bitters-tbh-normcore-portland-xoxo-adaptogen","workspace":"6007cf72a86dc57d8a0e544f","__v":0},{"rawAddress":"1311 W Washington Blvd, Los Angeles, CA 90007, USA","coordinates":[34.0403804,-118.2844088],"formattedAddress":"1311 W Washington Blvd, Los Angeles, CA 90007, USA","streetName":"West Washington Boulevard","streetNumber":"1311","neighborhood":"Mid City","city":"Los Angeles","state":"CA","country":"United States","countryCode":"US","zipcode":"90007","_id":"6007ecc57f40ee033f605a8c","geometry":{"type":"Point","coordinates":[-118.2844088,34.0403804],"_id":"6007ecc57f40ee033f605a8d"},"workspaceId":3,"workspaceSlug":"plaid-poutine-wolf-photo-booth-irony","workspace":"6007cf72a86dc57d8a0e5450","__v":0}]}};

exports.addressResult = {"rawAddress":"4011 S Central Ave, Los Angeles, CA 90011, USA","coordinates":[34.0105442,-118.2569161],"formattedAddress":"4011 S Central Ave, Los Angeles, CA 90011, USA","streetName":"South Central Avenue","streetNumber":"4011","neighborhood":"South Los Angeles","city":"Los Angeles","state":"CA","country":"United States","countryCode":"US","zipcode":"90011","_id":"6007ecc57f40ee033f605a88","geometry":{"type":"Point","coordinates":[-118.2569161,34.0105442],"_id":"6007ecc57f40ee033f605a89"},"workspaceId":1,"workspaceSlug":"hammock-tousled-hella-tofu-keffiyeh-air-plant","workspace":"6007cf72a86dc57d8a0e544e","__v":0}

const description = {
  name: "Workspace #1",
  price: 128,
  workspaceId: 1
};

const photo = {
  url: "photo.jpg",
  workspaceId: 1
};

const amenities = [ {
    amenities: [
      {id: 100, name: 'Showers'},
      {id: 100, name: 'Pet Friendly'},
      {id: 100, name: 'Coffee'},
      {id: 100, name: 'Tables'},
    ],
    id: 1
  }
  
];

const rates = { membership_rate: 100 }

exports.data = {
  rates,
  amenities,
  photo,
  description
};

exports.noData = {
  rates: false,
  amenities: false,
  photo: false,
  description: false
};

exports.locations = [
  {
      workspaceId: 1,
      neighborhood: 'test 1'
  },{
      workspaceId: 2,
      neighborhood: 'test 2'
  },{
      workspaceId: 3,
      neighborhood: 'test 3',
  }
];


exports.location = {workspaceId: 1, neighborhood: 'test neighborhood'};