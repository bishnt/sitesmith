import React from 'react';
import { FileText, Globe, Palette, Code } from 'lucide-react';

interface File {
  name: string;
  content: string;
  type: string;
}

interface FileExplorerProps {
  files: File[];
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, selectedFile, onFileSelect }) => {
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'html':
        return <Globe className="w-4 h-4 text-orange-400" />;
      case 'css':
        return <Palette className="w-4 h-4 text-blue-400" />;
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <Code className="w-4 h-4 text-yellow-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Files</h3>
        <div className="space-y-1">
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => onFileSelect(file.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-150 group ${
                selectedFile === file.name
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {getFileIcon(file.name)}
              <span className="text-sm font-medium truncate">{file.name}</span>
              {selectedFile === file.name && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex justify-between">
            <span>Files:</span>
            <span>{files.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Size:</span>
            <span>{Math.round(files.reduce((acc, file) => acc + file.content.length, 0) / 1024)}KB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;