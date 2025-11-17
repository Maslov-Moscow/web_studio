import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'WebStudio - Professional Web Development Studio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020617 0%, #1e293b 100%)',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            W
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            WebStudio
          </div>
        </div>

        <div
          style={{
            fontSize: '36px',
            color: 'white',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Professional Web Development Studio
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: '20px',
          }}
        >
          SEO • Digital Marketing • Software Development • AI Integration
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
