import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Existing footer links */}
            <Link href="/about">
              <a className="text-gray-600 text-sm hover:text-gray-800">À propos</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-600 text-sm hover:text-gray-800">Contact</a>
            </Link>
            {/* New discreet link to Dr Mahi Bahi */}
            <Link href="/dr-mahi-bahi">
              <a className="text-gray-400 text-xs hover:text-gray-600">Dr Mahi Bahi</a>
            </Link>
          </div>
          {/* Other footer content if any */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
