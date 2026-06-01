import { useEffect, useMemo, useState } from 'react'

const DEFAULT_BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
}

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function getBreakpoint(width, breakpoints) {
  if (width < breakpoints.mobile) {
    return 'mobile'
  }

  if (width < breakpoints.tablet) {
    return 'tablet'
  }

  return 'desktop'
}

export default function useBreakpoint(customBreakpoints = DEFAULT_BREAKPOINTS) {
  const [size, setSize] = useState(getWindowSize)

  useEffect(() => {
    function handleResize() {
      setSize(getWindowSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const breakpoint = useMemo(
    () => getBreakpoint(size.width, customBreakpoints),
    [size.width, customBreakpoints],
  )

  return {
    width: size.width,
    height: size.height,
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  }
}
