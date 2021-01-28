import React, { useState } from 'react';
import LoadingWorkspace from './LoadingWorkspace.jsx';
import { getWorkspaceInfo } from '../../actions/';

export default ({ location: { workspaceId, neighborhood }, details = null } ) => {
  const [space, setSpace] = useState(details);
  if (space === null) {
    getWorkspaceInfo(workspaceId)
      .then(res => setSpace(res))
      .catch(err => {
        setSpace(false);
        console.log(err.message);
      })
  }

  if (space === null) {
    return (
      <LoadingWorkspace />
    )
  }

  if (space === false) {
    return <div></div>
  }

  const { amenities: { amenities }, photo: { photo }, description, rates: { membership_rate } } = space;

  if (!amenities || !photo || !description ) return <div></div>

  else {
    return (
      <div className="nb-container">
        <a href={`http://localhost:5001/buildings/${workspaceId}`} className="light-text">
          <div className="nb-grid">
            <div className="nb-photo-container" style={{background: `url(${photo})`}}>
            </div>
            <div className="nb-description-container">
              <div>
                <h3 className="nb-description-title ">{ description.name }</h3>
                <p className="light-text bold-text">{ neighborhood }</p>
              </div>
              <div className="light-text small-text bold-text">
                <ul className="nb-amenities-list">
                  <li>{ amenities[0] }{' '}</li>
                  { amenities.slice(1).map(am => (
                  <li key={`${description.name}-${am}`}>&#8226; { am } </li> )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="nb-pricing-container dark-text">
            <div className="nb-pricing-label bold-text pad-10">
              <p>Available workspace</p>
            </div>
            <div className="nb-pricing-price pad-10">
              { membership_rate ? (
                  <p>from <span className="bolder-text">${ membership_rate }/mo</span></p>
                ) : <p>View Inventory</p>
              }
            </div>
          </div>
        </a>
      </div>
    );
  }
}

  