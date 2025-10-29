'use client'

import { Github, Instagram, Linkedin, Heart, Paintbrush, Star } from 'lucide-react'
import Link from 'next/link'

/**
 * Footer component that displays social media links and attribution
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-base-100 border-t border-base-300">
      <div className="container mx-auto px-4 py-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Logo and App Name */}
          <div className="flex flex-col items-start">
            <a className="text-base sm:text-lg md:text-xl px-2 sm:px-4 -ml-4">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="text-2xl">🍳</span>
                  <span className="ml-2 font-bold">Recipe App
                    <div className="text-xs text-base-content/70">
                  Delicious recipes at your fingertips
                </div>
                  </span>
                  
                </div>
                
              </div>
            </a>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <Link 
              href="https://github.com/Tejas-Bansod" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="https://www.instagram.com/itstejasbansod" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/tejas-bansod-profile/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-4 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-base-content/70 text-center sm:text-left">
            © {currentYear} Recipe App. All rights reserved.
          </div>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Tejas Bansod and Team</span>
          </div>
          
          <div className="text-xs text-base-content/50">
            Powered by codenexor and TheMealDB API
          </div>
        </div>
      </div>
    </footer>
  )
}
