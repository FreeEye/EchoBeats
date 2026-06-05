import { Loader, LoaderCircle } from 'lucide-react'

const ICON_MAP = {
  ui: <LoaderCircle className="animate-spin" size={30} color="#FFA500" />,
  data: <Loader className="animate-spin" size={30} color="#FFA500" />,
}

export default function Loading({ kind = 'ui' }) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ padding: '40px 0' }}
    >
      {ICON_MAP[kind]}
    </div>
  )
}
