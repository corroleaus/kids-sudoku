import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CompletedBoxOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-green-50 bg-opacity-90 z-10">
      <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
    </div>
  );
};

export default CompletedBoxOverlay;
