import React from 'react'

export default function Error() {
  return (
    <React.Fragment>
      <div className="error-body">
        <h1>404 Page Not Found</h1>
        <p>Oops! The page you're looking for could not be found.</p>
        <p>Please check the URL or navigate back to the homepage.</p>
        <a href="/home">Go to Homepage</a>
      </div>
    </React.Fragment>
   
  )
}
