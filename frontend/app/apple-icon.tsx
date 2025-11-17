import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Icon component
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          W
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
