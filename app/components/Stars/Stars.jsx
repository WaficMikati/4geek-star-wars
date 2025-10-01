import './stars.css'
import { useEffect, useRef } from 'react'

export function Stars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const STAR_COUNT = 1600
    let stars = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // reset stars on resize
      stars = Array.from({ length: STAR_COUNT }, () => new Star())
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)

    class Star {
      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.c = 1
        this.alpha = Math.random() * 0.4
      }
      updatePos() {
        const speed = 0.0001
        this.x += (this.x - window.innerWidth / 2) * speed
        this.y += (this.y - window.innerHeight / 2) * speed
        this.c = Math.min(255, this.c + 2)

        if (
          this.x > window.innerWidth ||
          this.x < 0 ||
          this.y > window.innerHeight ||
          this.y < 0
        ) {
          this.x = Math.random() * window.innerWidth
          this.y = Math.random() * window.innerHeight
          this.c = 0
          this.alpha = Math.random() * 0.5
        }
      }
      draw(ctx) {
        ctx.fillStyle = `rgba(${this.c},${this.c},${this.c},${this.alpha})`
        const s = this.c / 128
        ctx.fillRect(this.x, this.y, s, s)
      }
    }

    // initial size + stars
    resize()

    function loop() {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let star of stars) {
        star.draw(ctx)
        star.updatePos()
      }
      requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id='myCanvas'
      className='z-n1'
    />
  )
}
