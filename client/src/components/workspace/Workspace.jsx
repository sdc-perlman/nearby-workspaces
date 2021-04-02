import React from 'react';
import LoadingWorkspace from './LoadingWorkspace';
// import { getWorkspaceInfo } from '../../actions';

export default ({ location: { workspaceId, neighborhood }, allInfo, pic }) => {
  // loading
  if (allInfo.length === 0) {
    return (
      <LoadingWorkspace />
    );
  }

  // conditionally render array of amenities data
  function Amenities({ amenities: { amenities } }) {
    if (!amenities) {
      return <></>;
    }
    const rest = amenities.length - 5;
    return (
      <>
        {amenities.slice(0, 5).map((am) => (
          <li key={`${am.name}-${am.id}`}>
            &#8226;
            {am.name}
          </li>
        ))}
        <br />
        {rest > 0 && <li>{` + ${rest} more `}</li>}
      </>
    );
  }
  // insert any available data into workspace-card
  return (
    <div className="nb-container">
      <a href={`/buildings/${workspaceId}`} className="light-text">
        <div className="nb-grid">
          <div className="nb-photo-container">
            <img className="nb-photo" src={pic.url} alt="" />
          </div>
          <div className="nb-description-container">
            <div>
              <h3 className="nb-description-title ">{ allInfo.workspaceDescriptionData.name || ''}</h3>
              <p className="light-text bold-text">{ neighborhood || ''}</p>
            </div>
            <div className="light-text small-text bold-text">
              <ul className="nb-amenities-list">
                <Amenities amenities={allInfo.amenitiesData} />
              </ul>
            </div>
          </div>
        </div>
        <div className="nb-pricing-container dark-text">
          <div className="nb-pricing-label bold-text pad-10">
            <p>Available workspace</p>
          </div>
          <div className="nb-pricing-price pad-10">
            { allInfo.workspaceData[0].membership_rate ? (
              <p>
                from
                <span className="bolder-text">
                  {`$${allInfo.workspaceData[0].membership_rate}/mo`}
                </span>
              </p>
            ) : <p>View Inventory</p>}
          </div>
        </div>
      </a>
    </div>
  );
}

