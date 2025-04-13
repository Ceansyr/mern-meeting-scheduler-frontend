import React from "react";

function IntegrationCard({ integration }) {
  return (
    <div className={`page-integration-card integration-${integration.id}`}>
      <div className="page-integration-icon"></div>
      <div className="page-integration-info">
        <h3>{integration.title}</h3>
        <p>{integration.description}</p>
      </div>
    </div>
  );
}

export default IntegrationCard;