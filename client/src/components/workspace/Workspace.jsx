import React, { useState } from 'react';
import LoadingWorkspace from './LoadingWorkspace.jsx';
import { getWorkspaceInfo } from '../../actions/';


export default ({ location: { workspaceId, neighborhood }, details = null } ) => {
  const [space, setSpace] = useState(details);
  // use passed in id to get details for given workspace
  if (space === null) {
    getWorkspaceInfo(workspaceId)
      .then(res => setSpace(res))
      .catch(err => {
        setSpace(false);
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

  let { amenities, photo, description, rates } = space;

  // conditionally render array of amenities data
  const Amenities = ({ amenities: { amenities }}) => {
    if (!amenities) return <></>
      const rest = amenities.length - 5;
      return (
        <>
            { amenities.slice(0, 5).map(am => (
              <li key={`${am.name}-${am.id}`}>&#8226; { am.name } </li> )
            )}
            <br/>
            { rest > 0 && <li> + {rest} more</li>}
        </>
      );
  }


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
                <Amenities amenities={amenities}/>
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

