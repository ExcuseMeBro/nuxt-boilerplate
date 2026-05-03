import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

interface IntroCompositionProps {
  title: string
  subtitle: string
}

export const IntroComposition = ({ title, subtitle }: IntroCompositionProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 120
    }
  })
  const opacity = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)',
        color: 'white',
        display: 'flex',
        fontFamily: 'Inter, Arial, sans-serif',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 32,
          boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
          opacity,
          padding: '72px 88px',
          textAlign: 'center',
          transform: `scale(${0.92 + entrance * 0.08}) translateY(${(1 - entrance) * 48}px)`
        }}
      >
        <p
          style={{
            color: '#38bdf8',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 8,
            margin: 0,
            textTransform: 'uppercase'
          }}
        >
          Production Starter
        </p>
        <h1
          style={{
            fontSize: 112,
            letterSpacing: -4,
            lineHeight: 1,
            margin: '28px 0 24px'
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: '#cbd5e1',
            fontSize: 36,
            margin: 0
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  )
}
