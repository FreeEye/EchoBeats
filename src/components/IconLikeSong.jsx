import { Heart } from 'lucide-react'
import usePositionedMessage from '@/hooks/usePositionedMessage'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

function IconLikeSong({ song }) {
  const [showMessage, contextHolder] = usePositionedMessage()
  const favorites = useFavoritesStore((s) => s.favorites)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  if (!song?.newId) {
    return <Heart className="icon" style={{ opacity: 0.3 }} />
  }

  const isLiked = favorites.some((s) => s.newId === song.newId)

  const handleClick = (e) => {
    const added = toggleFavorite(song)
    if (added) {
      showMessage('success', '已收藏', e)
    } else {
      showMessage('info', '已取消收藏', e)
    }
  }

  return (
    <>
      {contextHolder}
      {isLiked ? (
        <Heart
          className="icon"
          onClick={handleClick}
          style={{
            color: 'rgb(254, 44, 85)',
            fill: 'rgb(254, 44, 85)',
          }}
        />
      ) : (
        <Heart className="icon" onClick={handleClick} />
      )}
    </>
  )
}

export default IconLikeSong
