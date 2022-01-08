import React from 'react'

interface HeaderProps {
  siteTitle: string
}

function Header({ siteTitle }: HeaderProps) {
  return (
    <header>
      <h1>{siteTitle}</h1>
    </header>
  )
}

export default Header
