import React from 'react'
import { injectModels } from '../../Redux/injectModels';
import './loader.css';

const Loader = ({application}) => {
  return (
     <React.Fragment>
            { application.loading ? 
                 <React.Fragment>
                    {/* <div className='loader-overlay'></div>
                    <div className="loader-generic">
                    <img src={`assets/img/giphy.gif`} alt="" />
                    {application.loadingMessage && <p>{`${application.loadingMessage}`}</p>}
                    </div> */}

                    <div className="loaded">
                        <div id="loader-wrapper" style={{visibility: 'visible'}}>
                           <div id="loader" />
                           <div className="loader-section section-left" />
                           <div className="loader-section section-right" />
                        </div>
                     </div>

                 </React.Fragment>
                 : null 
            }
        </React.Fragment>
  )
}

export default injectModels(['application'])(Loader);