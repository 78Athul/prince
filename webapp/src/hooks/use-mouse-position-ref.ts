"use client"

import { useEffect, useRef, RefObject } from "react"

export function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      }
    }

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: 0, y: 0 }
    }

    container?.addEventListener("mousemove", handleMouseMove)
    container?.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove)
      container?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef])

  return mousePositionRef
}
