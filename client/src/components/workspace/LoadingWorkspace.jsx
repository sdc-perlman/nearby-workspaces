import React from 'react';

export default () => {
  return (
    <div className="nb-container">
      <div className="nb-grid">
        <div className="nb-photo-container">
        </div>
        <div className="nb-description-container">
          <div>
            <h3></h3>
            <p className="light-text bold-text"></p>
          </div>
          <div className="light-text small-text bold-text">
            <ul className="nb-amenities-list">
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="nb-pricing-container dark-text">
        <div className="nb-pricing-label bold-text pad-10">
          <p>Available workspace</p>
        </div>
        <div className="nb-pricing-price pad-10">
          <p>from <span className="bolder-text">$0/mo</span></p>
        </div>
      </div>
    </div>
  )
}