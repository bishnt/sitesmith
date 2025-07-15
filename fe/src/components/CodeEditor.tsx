import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

interface File {
  name: string;
  content: string;
  type: string;
}

interface CodeEditorProps {
  files: File[];
  selectedFile: string;
  onFileChange: (fileName: string, content: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ files, selectedFile, onFileChange }) => {
  const editorRef = useRef<any>(null);

  const currentFile = files.find(file => file.name === selectedFile);

  const getLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'tsx':
        return 'typescript';
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Monaco theme
    monaco.editor.defineTheme('sitesmith-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#1F2937',
        'editor.foreground': '#E5E7EB',
        'editor.lineHighlightBackground': '#374151',
        'editor.selectionBackground': '#10B981',
        'editor.inactiveSelectionBackground': '#059669',
        'editorCursor.foreground': '#10B981',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#10B981',
      }
    });
    
    monaco.editor.setTheme('sitesmith-dark');
  };

  return (
    <div className="h-full flex flex-col">
      {/* File Tab */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700 bg-gray-850">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium text-gray-300">{selectedFile}</span>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        {currentFile && (
          <Editor
            height="100%"
            language={getLanguage(selectedFile)}
            value={currentFile.content}
            onChange={(value) => onFileChange(selectedFile, value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 20,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              padding: { top: 20, bottom: 20 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              renderLineHighlight: 'all',
              lineNumbers: 'on',
              folding: true,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;