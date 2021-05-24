import React from "react";
import { Button } from "reactstrap";
import "./post-status-filter.css";

const PoctStatusFilter = () => {
  return (
    <div className="btn-group">
      <Button type="button" color="info">
        Все
      </Button>
      <button type="button" className="btn btn-outline-secondary">
        Понравилось
      </button>
    </div>
  );
};

export default PoctStatusFilter;
