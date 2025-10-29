'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Hide the announcement bar when closed
  const handleClose = () => {
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('announcementClosed', 'true')
    }
  }

  // Check if the announcement was previously closed
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const isClosed = localStorage.getItem('announcementClosed')
    setIsVisible(isClosed !== 'true')
    setIsMounted(true)
    
    // Add padding to main content if announcement is visible
    const mainContent = document.querySelector('main')
    if (mainContent && isClosed !== 'true') {
      mainContent.classList.add('pt-20')
      return () => mainContent.classList.remove('pt-20')
    }
  }, [])
  
  // Don't render anything on server-side or if not visible
  if (typeof window === 'undefined' || !isMounted || !isVisible) return null

  return (
    <div className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-2 px-4 text-sm font-medium">
      <div className="container mx-auto flex items-center justify-center relative">
        <span>✨ Discover new recipes daily! Save your favorites and share with friends. ✨</span>
        <button 
          onClick={handleClose}
          className="btn btn-ghost btn-xs btn-circle absolute right-2 sm:right-4"
          aria-label="Close announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
