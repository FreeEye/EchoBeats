import { useState } from 'react'
import { ListPlus, Plus } from 'lucide-react'
import { Modal, Input, Button, List, message } from 'antd'
import { useLocalPlaylistStore } from '@/stores/useLocalPlaylistStore'

function AddToPlaylist({ song }) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const { playlists, createPlaylist, addSongToPlaylist } =
    useLocalPlaylistStore()

  const handleAdd = (playlistId) => {
    if (!song) return
    addSongToPlaylist(playlistId, song)
    message.success('已添加到歌单')
    setOpen(false)
  }

  const handleCreate = () => {
    const name = newName.trim()
    if (!name) return
    const playlist = createPlaylist(name)
    addSongToPlaylist(playlist.id, song)
    message.success(`已创建歌单「${name}」并添加歌曲`)
    setNewName('')
    setOpen(false)
  }

  return (
    <>
      <ListPlus
        className="icon"
        title="添加到歌单"
        onClick={() => setOpen(true)}
      />
      <Modal
        title="添加到歌单"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={380}
      >
        <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="新建歌单名称"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onSearch={handleCreate}
            enterButton={
              <Button type="primary" icon={<Plus size={14} />}>
                新建
              </Button>
            }
          />
        </div>
        {playlists.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: '#8c8c8c',
              padding: '24px 0',
              fontSize: 14,
            }}
          >
            还没有歌单，创建一个吧
          </div>
        ) : (
          <List
            dataSource={playlists}
            renderItem={(pl) => (
              <List.Item
                onClick={() => handleAdd(pl.id)}
                style={{
                  cursor: 'pointer',
                  padding: '10px 12px',
                  borderRadius: 8,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div>
                  <div style={{ fontSize: 14, color: '#f0f0f0' }}>
                    {pl.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
                    {pl.songs.length} 首歌曲
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </>
  )
}

export default AddToPlaylist
