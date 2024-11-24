import React from "react";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p className="mt-3">
            Your one-stop solution for managing employee data and exploring powerful tools.
          </p>
          <button className="btn-custom">Get Started</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section container mt-5">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow rounded">
            <img
                src="/employee-management.png"
                alt="Manage Employees"
                className="mb-3 feature-image"
              />
              <h4>Manage Employees</h4>
              <p>Efficiently search, add, and manage employee records with ease.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow rounded">
            <img
                src="/employee.png"
                alt="Manage Employees"
                className="mb-3 feature-image"
              />
              <h4>Powerful Tools</h4>
              <p>Access cutting-edge tools for analysis and decision-making.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow rounded">
            <img
                src="/security.png"
                alt="Manage Employees"
                className="mb-3 feature-image"
              />
              <h4>Secure Platform</h4>
              <p>We prioritize your data security with our state-of-the-art systems.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default HomePage;