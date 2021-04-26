import React from 'react';
import LoadingWorkspace from './LoadingWorkspace';
// import { getWorkspaceInfo } from '../../actions';

export default ({
  location: {
    workspaceId,
    neighborhood,
    amenities,
    rate,
    streetName,
    streetNumber,
  },
  pic,
}) => {
  // loading
  if (!workspaceId) {
    return (
      <LoadingWorkspace />
    );
  }

  // conditionally render array of amenities data
  function Amenities({ amenities: amens }) {
    const amensArr = amens.split(',');
    if (!amenities) {
      return <></>;
    }
    const rest = amensArr.length - 5;
    return (
      <>
        {amensArr.map((am, id) => (
          <li key={`${am}-${id}`}>
            &#8226;
            {am}
          </li>
        ))}
        <br />
        {rest > 0 && <li>{` + ${rest} more `}</li>}
      </>
    );
  }
  // capitalize all words for neighborhood
  neighborhood = neighborhood.replace(/\b\w/g, (c) => c.toUpperCase());
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
              <h3 className="nb-description-title ">{ `${streetNumber || ''} ${streetName || ''}`}</h3>
              <p className="light-text bold-text">{ neighborhood || ''}</p>
            </div>
            <div className="light-text small-text bold-text">
              <ul className="nb-amenities-list">
                <Amenities amenities={amenities} />
              </ul>
            </div>
          </div>
        </div>
        <div className="nb-pricing-container dark-text">
          <div className="nb-pricing-label bold-text pad-10">
            <p>Available workspace</p>
          </div>
          <div className="nb-pricing-price pad-10">
            { rate ? (
              <p>
                {'from '}
                <span className="bolder-text">
                  {`$${rate.slice(0, 3)}/mo`}
                </span>
              </p>
            ) : <p>View Inventory</p>}
          </div>
        </div>
      </a>
    </div>
  );
};
