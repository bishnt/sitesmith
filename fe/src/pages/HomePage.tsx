import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, Zap, Globe, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/editor', { state: { prompt } });
    }, 1000);
  };

  const examplePrompts = [
    "Create a modern portfolio website with dark theme",
    "Build a landing page for a SaaS product with pricing section",
    "Design a blog website with clean typography",
    "Make a dashboard for an analytics tool"
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Sparkles className="w-16 h-16 text-green-400 relative z-10" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Build websites with AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Describe your vision and watch SiteSmith craft beautiful, production-ready websites in seconds. 
            From concept to code, powered by advanced AI.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors">
              <Zap className="w-8 h-8 text-green-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-green-400 mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Generate complete websites in seconds with AI-powered development</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors">
              <Globe className="w-8 h-8 text-green-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-green-400 mb-2">Production Ready</h3>
              <p className="text-gray-400 text-sm">Clean, optimized code that's ready to deploy anywhere</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors">
              <ArrowRight className="w-8 h-8 text-green-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-green-400 mb-2">Real-time Preview</h3>
              <p className="text-gray-400 text-sm">See your website come to life as it's being built</p>
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative max-w-3xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build... (e.g., 'Create a modern portfolio website with a dark theme and contact form')"
              className="w-full h-32 px-6 py-4 bg-gray-800/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-lg backdrop-blur-sm"
              disabled={isLoading}
            />
            
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="font-medium">
                {isLoading ? 'Building...' : 'Build Site'}
              </span>
            </button>
          </div>
        </form>

        {/* Example Prompts */}
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400 mb-4">Try these examples:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-left p-4 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all duration-200 text-gray-300 hover:text-white group"
              >
                <span className="text-green-400 group-hover:text-green-300 text-sm">→</span> {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;