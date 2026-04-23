import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Play, Cpu, Globe } from 'lucide-react';

function App() {
  const [code, setCode] = useState("print('Hello from TerraScale!')");
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://YOUR_AWS_IP:5000/execute', {
        language: 'python',
        code: code
      });
      setOutput(response.data.output || response.data.error);
    } catch (err) {
      setOutput("Error: Could not connect to AWS Engine.");
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#00ff41', minHeight: '100vh', padding: '40px', fontFamily: 'monospace' }}>
      <header style={{ borderBottom: '1px solid #00ff41', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1><Cpu size={30} /> TERRASCALE _EXECUTION_ENGINE</h1>
        <p style={{ color: '#666' }}><Globe size={14} /> STATUS: LIVE // SERVER_LOC: US-EAST-1</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section>
          <h3><Terminal size={18} /> INPUT_SOURCE</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: '100%', height: '300px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #333', padding: '15px', borderRadius: '4px' }}
          />
          <button
            onClick={runCode}
            disabled={loading}
            style={{ marginTop: '10px', backgroundColor: '#00ff41', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loading ? 'EXECUTING...' : 'RUN_SCRIPT'} <Play size={14} />
          </button>
        </section>

        <section>
          <h3><Terminal size={18} /> OUTPUT_STREAM</h3>
          <div style={{ width: '100%', height: '300px', backgroundColor: '#000', border: '1px solid #00ff41', padding: '15px', overflowY: 'auto' }}>
            <pre>{output}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;