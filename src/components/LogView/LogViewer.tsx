import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCodeForNode, saveCodeForNode, generateMappingForExecution, fetchInputData,getLog } from '../../api/DataApi';
const LogViewer: React.FC<{ userId: string }> = ({ userId }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLog(userId);
        setLogs(response);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    const intervalId = setInterval(fetchLogs, 5000); // Fetch logs every 5 seconds

    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <div>
      <h1>Execution Logs</h1>
      <pre>
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </pre>
    </div>
  );
};

export default LogViewer;
