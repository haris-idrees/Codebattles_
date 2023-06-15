import React, { useState } from 'react';

function Compiler() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRunPython = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/run_python/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
        setError('');
      } else {
        setOutput(data.error);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while executing the Python code.');
      setOutput('');
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleRunPython}>Run Python</button>
      {output && <pre>{output}</pre>}
      {error && <pre>Error: {error}</pre>}
    </div>
  );
}

export default Compiler