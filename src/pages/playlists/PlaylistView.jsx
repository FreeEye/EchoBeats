import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Play, Trash2 } from 'lucide-react'
import { Button, message } from 'antd'
import { useLocalPlaylistStore } from '@/stores/useLocalPlaylistStore'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import SongItemWithCover from '@/components/song-item/SongItemWithCover'

export default function PlaylistView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playlists, removeSongFromPlaylist, deletePlaylist } =
    useLocalPlaylistStore()
  const setNewListenlist = useListenlistStore((s) => s.setNewListenlist)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)

  const playlist = playlists.find((p) => p.id === id)

  useEffect(() => {
    if (playlist) {
      document.title = `EchoBeats - ${playlist.name}`
    }
  }, [playlist])

  if (!playlist) {
    return (
      <div
        className="white-card"
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          margin: '40px auto',
          maxWidth: 400,
        }}
      >
        <div style={{ color: '#8c8c8c', fontSize: 15, marginBottom: 16 }}>
          歌单未找到
        </div>
        <Link
          to="/playlists"
          style={{ color: '#FFA500', fontSize: 14 }}
        >
          返回歌单列表
        </Link>
      </div>
    )
  }

  const handlePlayAll = () => {
    if (playlist.songs.length === 0) {
      message.info('歌单中还没有歌曲')
      return
    }
    setNewListenlist(playlist.songs)
    setSongInPlayer(playlist.songs[0])
    message.success(`开始播放「${playlist.name}」`)
  }

  const handleDeletePlaylist = () => {
    deletePlaylist(playlist.id)
    message.success('歌单已删除')
    navigate('/playlists')
  }

  return (
    <div>
      <div style={{ padding: '20px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate('/playlists')}
            style={{ color: '#bfbfbf' }}
          />
          <div style={{ flex: 1 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                color: '#f0f0f0',
              }}
            >
              {playlist.name}
            </h2>
            <span style={{ color: '#8c8c8c', fontSize: 13 }}>
              {playlist.songs.length} 首歌曲
            </span>
          </div>
          <Button
            type="primary"
            icon={<Play size={15} />}
            onClick={handlePlayAll}
            disabled={playlist.songs.length === 0}
          >
            播放全部
          </Button>
          <Button
            danger
            icon={<Trash2 size={15} />}
            onClick={handleDeletePlaylist}
          >
            删除
          </Button>
        </div>

        {playlist.songs.length === 0 ? (
          <div
            className="white-card"
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#8c8c8c',
            }}
          >
            歌单中还没有歌曲，去搜索添加吧
          </div>
        ) : (
          <div className="white-card">
            {playlist.songs.map((song, idx) => (
              <div
                key={song.newId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: '#8c8c8c',
                    fontSize: 13,
                    minWidth: 28,
                    textAlign: 'center',
                  }}
                >
                  {idx + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <SongItemWithCover song={song} />
                </div>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<Trash2 size={14} />}
                  onClick={() => {
                    removeSongFromPlaylist(playlist.id, song.newId)
                    message.success('已从歌单中移除')
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
