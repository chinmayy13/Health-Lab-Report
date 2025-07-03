import React from "react";

export default function ReportTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Reference Range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.parameter}</td>
              <td>{row.value}</td>
              <td>{row.unit}</td>
              <td>{row.range}</td>
              <td>
                {row.flag ? (
                  <span className="badge bg-danger">Needs Attention</span>
                ) : (
                  <span className="badge bg-success">Normal</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
