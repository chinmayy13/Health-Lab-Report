import React from "react";

export default function HighlightedMetrics({ data }) {
  const highlighted = data.slice(0, 3); //pick top 3 for display

  return (
    <div className="row">
      {highlighted.map((metric, idx) => (
        <div className="col-md-4 mb-4" key={idx}>
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">{metric.parameter}</h5>
              <p className="card-text display-6">
                {metric.value} {metric.unit}
              </p>
              {/* Example: add flag if value is out of range */}
              {metric.flag && (
                <span className="badge bg-danger">Needs Attention</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
