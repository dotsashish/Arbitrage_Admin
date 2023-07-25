import React from 'react'

function FullPageLoader() {
  return (
    <React.Fragment>
      {/* <div className="loader-container">
            <div className="loader">
                <img src="/assets/img/loader.gif" alt="" />
            </div>
        </div> */}

      <div class="loaded">
        <div id="loader-wrapper" style="visibility: visible;">
          <div id="loader"></div>
          <div class="loader-section section-left"></div>
          <div class="loader-section section-right"></div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default FullPageLoader