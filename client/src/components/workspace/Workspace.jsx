import React, { useState } from 'react';
import LoadingWorkspace from './LoadingWorkspace.jsx';
import { getWorkspaceInfo } from '../../actions/';


export default ({ location: { workspaceId, neighborhood }, details = null } ) => {
  const [space, setSpace] = useState(details);
  // use passed in id to get details for given workspace
  if (space === null) {
    console.log('fetching')
    getWorkspaceInfo(workspaceId)
      .then(res => setSpace(res))
      .catch(err => {
        setSpace(false);
        console.log(err.message);
      })
  }

  // loading and error cases
  if (space === null) {
    return (
      <LoadingWorkspace />
    )
  }
  if (space === false) {
    return <></>
  }

  const { amenities, photo, description, rates } = space;
  console.log(rates);
  // conditionally render array of amenities data
  const Amenities = () => amenities.amenities ? (
      <>
      <li>{ amenities.amenities[0] }{' '}</li>
          { amenities.amenities.slice(1).map(am => (
          <li key={`${description.name}-${am}`}>&#8226; { am } </li> )
          )}
      </>
    ) : <></>;

  // insert any available data into workspace-card
  return (
    <div className="nb-container">
      <a href={`/buildings/${ workspaceId }`} className="light-text">
        <div className="nb-grid">
          {/* <div className="nb-photo-container" style={{background: `url(${photo.url})`}}> */}
          <div className="nb-photo-container">
            <img className="nb-photo" src={photo.url} alt=""/>
          </div>
          <div className="nb-description-container">
            <div>
              <h3 className="nb-description-title ">{ description.name || ''}</h3>
              <p className="light-text bold-text">{ neighborhood || ''}</p>
            </div>
            <div className="light-text small-text bold-text">
              <ul className="nb-amenities-list">
                <Amenities />
              </ul>
            </div>
          </div>
        </div>
        <div className="nb-pricing-container dark-text">
          <div className="nb-pricing-label bold-text pad-10">
            <p>Available workspace</p>
          </div>
          <div className="nb-pricing-price pad-10">
            { rates.membership_rate ? (
                <p>from <span className="bolder-text">${ rates.membership_rate }/mo</span></p>
              ) : <p>View Inventory</p>
            }
          </div>
        </div>
      </a>
    </div>
  );
}

  