import Spinner from "react-bootstrap/Spinner";
import React from "react";

export const LoadSpinners = () => {
  return (
    <div>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
    </div>
  );
};

// <Spinner animation="grow" variant="warning" />
//       <Spinner animation="grow" variant="info" />
//       <Spinner animation="grow" variant="light" />
//       <Spinner animation="grow" variant="dark" />
