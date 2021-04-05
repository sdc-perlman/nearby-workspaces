# Nearby Buildings Service

> This service stores addresses and latlong coordinates for mock data. It provides address information and promity search within the viscinity of a given workspace.

## Related Projects

  - https://github.com/space-work/amenities-service
  - https://github.com/space-work/workspace-service
  - https://github.com/space-work/location-service
  - https://github.com/space-work/workspace-description-service
  - https://github.com/space-work/photos-service

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [CRUD API](#crud)

## Requirements

- Node 6.13.0
- PostgreSQL v13.2+
- PostGIS 3.1

## Setup & Seed

1.) Install dependencies

```console
npm install
```
2.) Run seed script (should take 15-17 minutes). To follow along checkout the `seed.sh` file located in `server/postgres`

```console
npm run seed
```

## CRUD API
- See server/controllers/index.js to see the CRUD API. See server/spec/api.test.js to see the CRUD API tests. Use script `npm run test-server` to run the tests in the terminal.
1. POST
> Method: POST
> Endpoint: "/api/nearbyworkspaces/buildings/:workspaceId" *although the workspaceId is irrelevant in this request*
> Purpose: to create a new origin record
> Response: a 200 status and a copy of the record as it was created in the database
2. GET
> Method: GET
> Endpoint: "/api/nearbyworkspaces/buildings/:workspaceId"
> Purpose: to read an origin record and the realted nearby workspace records based upon the workspaceId param.
> Response: A 200 response and the according data.
3. PUT
> Method: PUT
> Endpoint: "/api/nearbyworkspaces/buildings/:workspaceId"
> Purpose: to update the origin record based upon the workspaceId param.
> Response: A 200 response and will return the updated record as read in the database.
4. DELETE
> Method: DELETE
> Endpoint: "/api/nearbyworkspaces/buildings/:workspaceId"
> Purpose: to delete the origin record based upon the workspaceId param.
> Response: A 200 response and will return the record that was just deleted.
> Response 2: A 500 indicating that the record is not there when prompted to retrieve it.

