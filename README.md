# Nearby Buildings Service

> This service stores addresses and latlong coordinates for mock data. It provides address information and promity search within the viscinity of a given workspace.

## Related Projects

  - https://github.com/space-work/review-service
  - https://github.com/space-work/amenities-service
  - https://github.com/space-work/contact-widget-service
  - https://github.com/space-work/workspace-service
  - https://github.com/space-work/location-service
  - https://github.com/space-work/workspace-description-service
  - https://github.com/space-work/photos-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB v4+


## Development
Perform installation instructions below.
In the root folder rename the file example.env to .env.

To generate test data, ensure you have MongoDB installed and running. From /server/db/data:
```sh
node seeder.js -g
```
To clear MongoDB collection, from /server/db/data:
```sh
node seeder.js -d
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

