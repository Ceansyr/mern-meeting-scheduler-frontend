import React from "react";
import IntegrationCard from "./IntegrationCard";

function IntegrationsSection({ integrationsData }) {
  return (
    <section className="page-integrations-section">
      <h2 className="page-integrations-title">All Link Apps and Integrations</h2>
      <div className="page-integrations-cards">
        {integrationsData.map((item) => (
          <IntegrationCard key={item.id} integration={item} />
        ))}
      </div>
    </section>
  );
}

export default IntegrationsSection;