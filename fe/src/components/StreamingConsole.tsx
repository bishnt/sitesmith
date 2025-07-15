import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle, Clock, FileText, Zap } from 'lucide-react';

interface StreamingConsoleProps {
  prompt: string;
  isStreaming: boolean;
}

const StreamingConsole: React.FC<StreamingConsoleProps> = ({ prompt, isStreaming }) => {
  const [logs, setLogs] = useState<Array<{ id: number; message: string; type: 'info' | 'success' | 'process'; timestamp: Date }>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    { message: '🔍 Analyzing your prompt...', delay: 500 },
    { message: '🏗️ Planning website architecture...', delay: 1000 },
    { message: '📝 Generating HTML structure...', delay: 800 },
    { message: '🎨 Creating CSS styles...', delay: 1200 },
    { message: '⚛️ Writing React components...', delay: 1500 },
    { message: '🔧 Optimizing code...', delay: 700 },
    { message: '✅ Website generated successfully!', delay: 500 }
  ];

  useEffect(() => {
    // Initial prompt log
    setLogs([{
      id: Date.now(),
      message: `Building: "${prompt}"`,
      type: 'info',
      timestamp: new Date()
    }]);

    if (isStreaming) {
      const processSteps = () => {
        steps.forEach((step, index) => {
          setTimeout(() => {
            setCurrentStep(index);
            setLogs(prev => [...prev, {
              id: Date.now() + index,
              message: step.message,
              type: index === steps.length - 1 ? 'success' : 'process',
              timestamp: new Date()
            }]);
          }, steps.slice(0, index).reduce((acc, s) => acc + s.delay, 0));
        });
      };

      processSteps();
    }
  }, [prompt, isStreaming]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (type: string, index: number) => {
    if (type === 'success') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (type === 'process' && currentStep > index) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (type === 'process' && currentStep === index) return <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-semibold text-green-400">Build Console</h2>
          {isStreaming && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Building...</span>
            </div>
          )}
        </div>
      </div>

      {/* Logs */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div key={log.id} className="flex items-start space-x-3 mb-3 group">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(log.type, index)}
            </div>
            <div className="flex-1">
              <div className={`${
                log.type === 'success' ? 'text-green-300' :
                log.type === 'process' ? 'text-blue-300' : 'text-gray-300'
              }`}>
                {log.message}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {log.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="w-4 h-4 border border-gray-600 border-t-green-400 rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">
              {isStreaming ? 'Building your site...' : 'Build complete!'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {logs.length} operations
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingConsole;