import React, { useState, useEffect } from "react";
import { ErrorLog } from "./ErrorLog";
import { LoadSpinners } from "./LoadSpinners";
import axios from "axios";

export const ErrorTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // component did mount
  useEffect(() => {
    getLink();
  }, []);

  const getLink = async () => {
    try {
      const response1 = await axios("http://localhost:5000/api/errors");
      for (const person of response1.data) {
        if (person.errorCount >= 2) {
          setUsers(curRows => [
            ...curRows,
            {
              name: person.name,
              errorLogs: person.errorLog,
              errorCount: person.errorCount,
              department: person.department,
              position: person.position
            }
          ]);
        }
      }
      setLoading(false);
    } catch {
      console.log("error");
    }
  };
  if (loading) {
    return <LoadSpinners />;
  }
  return (
    <div className="tableBackground">
      {users.map(eachUser => (
        <ErrorLog
          key={eachUser.name}
          name={eachUser.name}
          errorLogs={eachUser.errorLogs}
          position={eachUser.position}
          department={eachUser.department}
          errorCount={eachUser.errorCount}
        />
      ))}
    </div>
  );
};
