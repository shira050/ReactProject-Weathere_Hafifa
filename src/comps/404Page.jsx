import React from 'react';
import './css/404Page.css'; 
function Error404Page() {
  return (
    <section className="page_404">
      <div className="container center">
                <h1 className="text-center">404</h1>

                <h3 className="h2">The page you are looking for is not available!</h3>
                <a href="/" className="link_404">Go to Home</a>
            </div>
      
    </section>
  );
}

export default Error404Page;
