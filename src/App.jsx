import { Layout, ConfigProvider, theme } from 'antd'
import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Player from './components/player/player'
import ListenlistWindow from '@/components/listenlist-window/ListenlistWindow'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from '@/components/ui/loading'
import { useListenlistOpenStore } from '@/stores/useListenlistOpenStore'
import './App.css'

const Home = lazy(() => import('./pages/home/Home'))
const Search = lazy(() => import('./pages/Search'))
const Playlists = lazy(() => import('./pages/playlists/Playlists'))
const PlaylistView = lazy(() => import('./pages/playlists/PlaylistView'))
const NewSongs = lazy(() => import('./pages/NewSongs'))
const Artists = lazy(() => import('./pages/Artists'))
const ArtistView = lazy(() => import('./pages/ArtistView'))
const MVPage = lazy(() => import('./pages/MVPage'))
const { Content } = Layout

function App() {
  const isListenlistOpen = useListenlistOpenStore((s) => s.isListenlistOpen)

  return (
    <ErrorBoundary>
      <HashRouter>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: '#FFA500',
              colorLink: '#ffffff',
              colorLinkHover: 'orange',
            },
            components: {
              Menu: {
                itemPaddingInline: 10,
              },
            },
          }}
        >
          <Layout>
            <Header />
            <Content
              className="container"
              style={{
                marginTop: 90,
                marginBottom: 74,
              }}
            >
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="search/:keyword" element={<Search />} />
                  <Route path="playlists" element={<Playlists />} />
                  <Route path="playlist/:id" element={<PlaylistView />} />
                  <Route path="new-songs" element={<NewSongs />} />
                  <Route path="artists" element={<Artists />} />
                  <Route path="artist/:name" element={<ArtistView />} />
                  <Route path="mv" element={<MVPage />} />
                </Routes>
              </Suspense>
            </Content>
            <Player />
            {isListenlistOpen && <ListenlistWindow />}
          </Layout>
        </ConfigProvider>
      </HashRouter>
    </ErrorBoundary>
  )
}

export default App
