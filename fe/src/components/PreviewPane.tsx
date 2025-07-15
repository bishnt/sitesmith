import React from 'react';
import { Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';

interface File {
  name: string;
  content: string;
  type: string;
}

interface PreviewPaneProps {
  files: File[];
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ files }) => {
  const [viewportSize, setViewportSize] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const htmlFile = files.find(file => file.name.endsWith('.html'));
  const cssFile = files.find(file => file.name.endsWith('.css'));
  const jsFile = files.find(file => file.name.endsWith('.tsx') || file.name.endsWith('.js'));

  const createPreviewContent = () => {
    const html = htmlFile?.content || '<div>No HTML file found</div>';
    const css = cssFile?.content || '';
    
    // Simple preview - in a real app, you'd want proper React rendering
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${css}</style>
        </head>
        <body>
          <div class="app">
            <header class="header">
              <h1>Welcome to Your New Website</h1>
              <p>Built with SiteSmith AI</p>
            </header>
            
            <main class="main">
              <section class="hero">
                <h2>Amazing Features</h2>
                <p>Your website is ready to go!</p>
                <button class="cta-button">Get Started</button>
              </section>
            </main>
            
            <footer class="footer">
              <p>&copy; 2025 Your Website. All rights reserved.</p>
            </footer>
          </div>
        </body>
      </html>
    `;
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Preview Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-850">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-sm font-medium text-gray-300">Preview</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewportSize('desktop')}
            className={`p-2 rounded transition-colors ${
              viewportSize === 'desktop' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setViewportSize('tablet')}
            className={`p-2 rounded transition-colors ${
              viewportSize === 'tablet' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setViewportSize('mobile')}
            className={`p-2 rounded transition-colors ${
              viewportSize === 'mobile' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-600 mx-2" />
          
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4 bg-gray-800 overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <div className={`${getViewportClass()} bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300`}>
            <iframe
              srcDoc={createPreviewContent()}
              className="w-full h-full border-none"
              title="Website Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;