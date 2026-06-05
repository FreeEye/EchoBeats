import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Music, ListMusic } from 'lucide-react'
import SearchBar from './SearchBar'

const tabs = [
  { key: '/', label: '首页' },
  { key: '/new-songs', label: '新歌' },
  { key: '/artists', label: '艺人' },
  { key: '/mv', label: 'MV' },
  { key: '/playlists', label: '歌单' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname === '/' ? '/' : `/${location.pathname.split('/')[1]}`

  return (
    <header
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 1040,
        top: 0,
        background: 'rgba(18, 18, 18, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Top row: Logo + Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '8px 24px',
        }}
      >
        <Link
          to="/"
          style={{
            flex: '0 0 auto',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FF6B35, #FFA500, #FFD700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(255, 107, 53, 0.3)',
            }}
          >
            <Music size={19} color="#fff" />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFA500, #FF6B35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            EchoBeats
          </h1>
        </Link>
        <div style={{ flex: 1, maxWidth: 500 }}>
          <SearchBar />
        </div>
        <Link
          to="/playlists"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: currentPath === '/playlists' ? '#FFA500' : '#bfbfbf',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            transition: 'all 0.2s',
            flexShrink: 0,
            background: currentPath === '/playlists' ? 'rgba(255,165,0,0.1)' : 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFA500'
            e.currentTarget.style.background = 'rgba(255,165,0,0.1)'
          }}
          onMouseLeave={(e) => {
            if (currentPath !== '/playlists') {
              e.currentTarget.style.color = '#bfbfbf'
              e.currentTarget.style.background = 'transparent'
            }
          }}
        >
          <ListMusic size={18} />
          <span>我的歌单</span>
        </Link>
      </div>

      {/* Bottom row: Navigation tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '0 24px 4px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = currentPath === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.key)}
              style={{
                padding: '8px 18px',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#FFA500' : '#8c8c8c',
                background: isActive ? 'rgba(255,165,0,0.1)' : 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#d9d9d9'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#8c8c8c'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
