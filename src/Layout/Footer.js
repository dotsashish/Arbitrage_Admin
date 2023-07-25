import React from 'react'

export default function Footer() {
  return (
    <React.Fragment>
  <div>
  <footer id="footer" className="footer">
    <div className="copyright">
      ©{(new Date().getFullYear())} Copyright <strong><span>Arbitrage Bot</span></strong>. All Rights Reserved
    </div>
  </footer>
  <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="fa-solid fa-arrow-up" /></a>
</div>

    </React.Fragment>
  )
}
