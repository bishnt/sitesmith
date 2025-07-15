import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StreamingConsole from '../components/StreamingConsole';
import FileExplorer from '../components/FileExplorer';
import CodeEditor from '../components/CodeEditor';
import PreviewPane from '../components/PreviewPane';

const EditorPage: React.FC = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  const [files, setFiles] = useState([
    { name: 'App.tsx', content: '// Building your app...\n\n', type: 'typescript' },
    { name: 'index.html', content: '<!-- Generating HTML... -->', type: 'html' },
    { name: 'styles.css', content: '/* Creating styles... */', type: 'css' }
  ]);
  const [selectedFile, setSelectedFile] = useState('App.tsx');
  const [isStreaming, setIsStreaming] = useState(true);

  const prompt = location.state?.prompt || 'Building your website...';

  useEffect(() => {
    // Simulate file generation and streaming
    const timeout = setTimeout(() => {
      setIsStreaming(false);
      setFiles([
        {
          name: 'App.tsx',
          content: `import React from 'react';
import './styles.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Your New Website</h1>
        <p>Built with SiteSmith AI</p>
      </header>
      
      <main className="main">
        <section className="hero">
          <h2>Amazing Features</h2>
          <p>Your website is ready to go!</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;`,
          type: 'typescript'
        },
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Website - Built with SiteSmith</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="App.tsx"></script>
  </body>
</html>`,
          type: 'html'
        },
        {
          name: 'styles.css',
          content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.main {
  flex: 1;
  padding: 3rem 2rem;
}

.hero {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.cta-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #45a049;
}

.footer {
  background: #f8f9fa;
  padding: 1rem;
  text-align: center;
  color: #666;
  border-top: 1px solid #e9ecef;
}`,
          type: 'css'
        }
      ]);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] flex">
      {/* Streaming Console - 30% */}
      <div className="w-[30%] bg-gray-950 border-r border-gray-700">
        <StreamingConsole prompt={prompt} isStreaming={isStreaming} />
      </div>

      {/* File Explorer - 20% */}
      <div className="w-[20%] bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setViewMode('code')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              viewMode === 'code'
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Preview
          </button>
        </div>
        <FileExplorer
          files={files}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />
      </div>

      {/* Editor/Preview Pane - 50% */}
      <div className="w-[50%] bg-gray-800">
        {viewMode === 'code' ? (
          <CodeEditor
            files={files}
            selectedFile={selectedFile}
            onFileChange={(fileName, content) => {
              setFiles(prevFiles =>
                prevFiles.map(file =>
                  file.name === fileName ? { ...file, content } : file
                )
              );
            }}
          />
        ) : (
          <PreviewPane files={files} />
        )}
      </div>
    </div>
  );
};

export default EditorPage;