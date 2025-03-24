
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-mymanus-silver p-4">
      <div className="card-glass max-w-md w-full py-10 px-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-mymanus-red/10 flex items-center justify-center">
            <AlertTriangle size={40} className="text-mymanus-red" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-mymanus-gold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-mymanus-lightsilver mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button className="btn-primary">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
