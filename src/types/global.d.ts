
import 'react';

// Add custom CSS properties to the CSSProperties interface
declare module 'react' {
  interface CSSProperties {
    '--mymanus-silver'?: string;
    '--mymanus-lightsilver'?: string;
    '--mymanus-gold'?: string;
    '--mymanus-red'?: string;
  }
}
