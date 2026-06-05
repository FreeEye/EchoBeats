import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListMusic, Plus, Trash2 } from 'lucide-react'
import { Button, Input, Modal, message } from 'antd'
import { useState } from 'react'
import { useLocalPlaylistStore } from '@/stores/useLocalPlaylistStore'

export default function Playlists() {
  const navigate = useNavigate()
  const { playlists, createPlaylist, deletePlaylist } =
    useLocalPlaylistStore()
  const [newName, setNewName] = useState('')

  useEffect(() => {
    document.title = 'EchoBeats - 我的歌单'
  }, [])

  const handleCreate = () => {
    const name = newName.trim()
    if (!name) return
    createPlaylist(name)
    message.success(`歌单「${name}」已创建`)
    setNewName('')
  }

  const handleDelete = (id, name) => {
    Modal.confirm({
      title: '删除歌单',
      content: `确定要删除歌单「${name}」吗？`,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => {
        deletePlaylist(id)
        message.success('歌单已删除')
      },
    })
  }

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          padding: '36px 20px 24px',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 8px',
            color: '#f0f0f0',
          }}
        >
          我的歌单
        </h2>
        <p style={{ color: '#8c8c8c', fontSize: 14, margin: 0 }}>
          管理你的专属歌单
        </p>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginBottom: 20 }}>
          <Input.Search
            placeholder="新歌单名称"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onSearch={handleCreate}
            enterButton={
              <Button type="primary" icon={<Plus size={14} />}>
                创建歌单
              </Button>
            }
          />
        </div>

        {playlists.length === 0 ? (
          <div
            className="white-card"
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#8c8c8c',
            }}
          >
            <ListMusic size={48} style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 15 }}>还没有歌单</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              点击歌曲旁的 + 按钮添加到歌单
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {playlists.map((pl) => (
              <div
                key={pl.id}
                className="white-card"
                onClick={() => navigate(`/playlist/${pl.id}`)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(255,165,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(255,255,255,0.06)'
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#f0f0f0',
                      marginBottom: 4,
                    }}
                  >
                    {pl.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                    {pl.songs.length} 首歌曲
                  </div>
                </div>
                <Button
                  type="text"
                  danger
                  icon={<Trash2 size={16} />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(pl.id, pl.name)
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
