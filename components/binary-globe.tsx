"use client"

import { useEffect, useRef, useCallback } from "react"

interface BinaryGlobeProps {
  size?: number
  className?: string
}

interface Point {
  x: number
  y: number
  z: number
  originalZ: number
  char: string
  shimmerOffset: number
  shimmerSpeed: number
}

export default function BinaryGlobe({ size = 256, className = "" }: BinaryGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const pointsRef = useRef<Point[]>([])
  const rotationRef = useRef(0)
  const timeRef = useRef(0)

  const generateGlobePoints = useCallback((radius: number): Point[] => {
    const points: Point[] = []
    const isSmall = size < 280
    const numLatitudes = isSmall ? 16 : 24
    const numLongitudes = isSmall ? 24 : 36

    for (let lat = 0; lat < numLatitudes; lat++) {
      const theta = (lat / numLatitudes) * Math.PI
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      // Adjust number of points per latitude based on position
      const pointsAtLat = Math.floor(numLongitudes * sinTheta) || 1

      for (let lon = 0; lon < pointsAtLat; lon++) {
        const phi = (lon / pointsAtLat) * Math.PI * 2

        const x = radius * sinTheta * Math.cos(phi)
        const y = radius * cosTheta
        const z = radius * sinTheta * Math.sin(phi)

        points.push({
          x,
          y,
          z,
          originalZ: z,
          char: Math.random() > 0.5 ? "1" : "0",
          shimmerOffset: Math.random() * Math.PI * 2,
          shimmerSpeed: 0.5 + Math.random() * 2,
        })
      }
    }

    // Add some continental patterns - denser cluster regions
    const continentCenters = [
      { lat: 0.4, lon: 0.3, spread: 0.3 }, // North America
      { lat: 0.55, lon: 0.15, spread: 0.25 }, // South America
      { lat: 0.35, lon: 0.55, spread: 0.35 }, // Europe/Africa
      { lat: 0.4, lon: 0.75, spread: 0.35 }, // Asia
      { lat: 0.7, lon: 0.8, spread: 0.2 }, // Australia
    ]

    continentCenters.forEach((continent) => {
      const extraPoints = (isSmall ? 8 : 15) + Math.floor(Math.random() * (isSmall ? 5 : 10))
      for (let i = 0; i < extraPoints; i++) {
        const latVariance = (Math.random() - 0.5) * continent.spread
        const lonVariance = (Math.random() - 0.5) * continent.spread

        const theta = (continent.lat + latVariance) * Math.PI
        const phi = (continent.lon + lonVariance) * Math.PI * 2

        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        const x = radius * sinTheta * Math.cos(phi)
        const y = radius * cosTheta
        const z = radius * sinTheta * Math.sin(phi)

        points.push({
          x,
          y,
          z,
          originalZ: z,
          char: Math.random() > 0.5 ? "1" : "0",
          shimmerOffset: Math.random() * Math.PI * 2,
          shimmerSpeed: 0.5 + Math.random() * 2,
        })
      }
    })

    return points
  }, [size])

  const rotateY = useCallback((point: Point, angle: number): { x: number; y: number; z: number } => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos,
    }
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Clear canvas
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.35

      // Initialize points if not done
      if (pointsRef.current.length === 0) {
        pointsRef.current = generateGlobePoints(radius)
      }

      // Update rotation
      rotationRef.current += 0.015
      timeRef.current += 0.03

      // Project and sort points by z-depth
      const projectedPoints = pointsRef.current
        .map((point) => {
          const rotated = rotateY(point, rotationRef.current)

          // Slight tilt for more dynamic view
          const tiltAngle = 0.2
          const y2 = rotated.y * Math.cos(tiltAngle) - rotated.z * Math.sin(tiltAngle)
          const z2 = rotated.y * Math.sin(tiltAngle) + rotated.z * Math.cos(tiltAngle)

          // Perspective projection
          const perspective = 600
          const scale = perspective / (perspective + z2)

          return {
            screenX: centerX + rotated.x * scale,
            screenY: centerY + y2 * scale,
            z: z2,
            scale,
            char: point.char,
            shimmerOffset: point.shimmerOffset,
            shimmerSpeed: point.shimmerSpeed,
          }
        })
        .filter((p) => p.z > -radius * 0.8) // Only show front-facing points
        .sort((a, b) => a.z - b.z)

      // Draw points
      projectedPoints.forEach((point) => {
        // Calculate shimmer based on time and point's unique offset
        const shimmer = Math.sin(timeRef.current * point.shimmerSpeed + point.shimmerOffset)
        const shimmerIntensity = (shimmer + 1) / 2 // Normalize to 0-1

        // Base opacity based on z-depth (further = dimmer)
        const depthFactor = (point.z + radius) / (radius * 2)
        const baseOpacity = 0.3 + depthFactor * 0.7

        // Combine depth and shimmer for final opacity
        const opacity = baseOpacity * (0.5 + shimmerIntensity * 0.5)

        // Size based on depth and shimmer
        const baseSize = 8 * point.scale
        const fontSize = Math.max(6, baseSize + shimmerIntensity * 2)

        ctx.font = `${fontSize}px "Courier New", monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Shimmer effect - occasionally flash brighter
        const flashChance = Math.sin(timeRef.current * 3 + point.shimmerOffset * 5)
        const isFlashing = flashChance > 0.95

        if (isFlashing) {
          // Bright flash
          ctx.fillStyle = `rgba(255, 255, 255, 1)`
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
          ctx.shadowBlur = 10
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
        }

        // Occasionally change the character for dynamic effect
        let displayChar = point.char
        if (Math.random() < 0.002) {
          displayChar = Math.random() > 0.5 ? "1" : "0"
        }

        ctx.fillText(displayChar, point.screenX, point.screenY)
      })

      // Add subtle glow effect around the globe
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    },
    [generateGlobePoints, rotateY]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1
    const displayWidth = size
    const displayHeight = size

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`
    ctx.scale(dpr, dpr)

    const animate = () => {
      draw(ctx, displayWidth, displayHeight)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, draw])

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}



