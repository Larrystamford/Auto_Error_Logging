import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

export const ErrorLog = props => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          height: "100px",
          width: "95%",
          color: "white",
          margin: "30px 0 0 0"
        }}
      >
        <div className="horizontalFlexbox">
          <div className="verticalFlexbox">
            <p style={{ color: "black" }}>Name: {props.name}</p>
            <p style={{ color: "black" }}>Position: {props.position}</p>
            <p style={{ color: "black" }}>Department: {props.department}</p>
          </div>
          <div className="verticalFlexbox" style={{ marginLeft: "200px" }}>
            <p style={{ color: "black" }}>Errors Counter: {props.errorCount}</p>
            <div style={{ width: "500px" }}>
              <p
                style={{
                  color: "black",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap"
                }}
              >
                {props.errorLogs}
              </p>
            </div>
          </div>
        </div>
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" style={{ textAlign: "left" }}>
          {props.errorLogs.map((eachError, index) => (
            <p
              style={{
                color: "black",
                fontSize: "15px",
                width: "90%",
                marginLeft: "40px"
              }}
              key={index + 1}
            >
              {index + 1 + ": "}
              {eachError}
            </p>
          ))}
        </div>
      </Collapse>
    </div>
  );
};
