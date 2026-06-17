import {
  Badge,
  Col,
  ConfigProvider,
  Dropdown,
  message,
  Row,
  Slider,
  Space,
} from 'antd'
import {
  Download,
  Loader,
  Repeat as LoopIcon,
  ListOrdered as OrderIcon,
  ListMusic as PlayingListIcon,
  Music as LyricsIcon,
  Minimize2 as MinimizeIcon,
  Shuffle as ShuffleIcon,
  Repeat1 as SingleIcon,
  SkipBack,
  SkipForward,
  Square,
  Volume2 as VolumeIcon,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import usePositionedMessage from '@/hooks/usePositionedMessage'
import { useListenlistOpenStore } from '@/stores/useListenlistOpenStore'
import { useListenlistStore } from '@/stores/useListenlistStore'
import { usePlayModeStore } from '@/stores/usePlayModeStore'
import { useSongInPlayerStore } from '@/stores/useSongInPlayerStore'
import { useAudioTimeStore } from '@/stores/useAudioTimeStore'
import { useLyricsStore } from '@/stores/useLyricsStore'
import toMinAndSec from '@/utils/toMinAndSec'
import { getSongSource } from '@/services/dataService'
import IconLikeSong from '../IconLikeSong'
import PauseCircleFilled from '../icons/PauseCircleFilled'
import PlayCircleFilled from '../icons/PlayCircleFilled'
import SongWithCover from '../SongWithCover'
import AddToPlaylist from '../song-item/AddToPlaylist'
import { useAudioPiP, MiniPlayer } from './AudioPiP'
import './player.css'

function Player() {
  const songInPlayer = useSongInPlayerStore((s) => s.songInPlayer)
  const setSongInPlayer = useSongInPlayerStore((s) => s.setSongInPlayer)
  const listenlist = useListenlistStore((s) => s.listenlist)
  const filteredListenlist = listenlist.filter((item) => item !== null)
  const currentIndex = filteredListenlist.findIndex(
    (item) => item.newId === songInPlayer?.newId,
  )
  const { isListenlistOpen, setIsListenlistOpen } = useListenlistOpenStore()
  const setCurrentTime = useAudioTimeStore((s) => s.setCurrentTime)
  const { isFloatingOpen, openFloating, closeFloating } = useLyricsStore()
  const { isMini, toggleMini } = useAudioPiP()
  const [showMessage, contextHolder] = usePositionedMessage()
  const [paused, setPaused] = useState(true)
  const [playSignal, setPlaySignal] = useState(false)
  const [playerMessage, setPlayerMessage] = useState('')
  const playMode = usePlayModeStore((s) => s.playMode)
  const setPlayMode = usePlayModeStore((s) => s.setPlayMode)
  const [volume, setVolume] = useState(
    localStorage.getItem('volume')
      ? Number(localStorage.getItem('volume'))
      : 0.7,
  )
  // const [isScrollingLyricsOpen, setIsScrollingLyricsOpen] = useState(false);
  const [sourceGettingStatus, setSourceGettingStatus] = useState('')
  const [mediaLoadingStatus, setMediaLoadingStatus] = useState('')
  const [songSource, setSongSource] = useState(null)
  const [songDuration, setSongDuration] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const isMountedRef = useRef(false)
  const audioRef = useRef(null)
  const intervalRef = useRef(null)
  const retryRef = useRef(false)

  useEffect(() => {
    if (isMountedRef.current) {
      if (songInPlayer?.newId) {
        // audioRef.current.pause();
        setSongSource(null)
        setMediaLoadingStatus('')
        retryRef.current = false
        // setPlayProgress(0);
        setAudioCurrentTime(0)
        setPlaySignal(true)
      }
    } else {
      isMountedRef.current = true
    }
  }, [songInPlayer?.newId]) // 只能有一个 dependency，否则会造成: 打开/关闭 PlayingSidebar 导致重新加载 song source

  useEffect(() => {
    if (songSource) {
      if (playSignal) {
        audioRef.current.play().catch(() => {
          setPaused(true)
        })
      } else {
        audioRef.current.pause()
      }
    } else {
      if (songInPlayer?.newId && playSignal) {
        audioRef.current.pause()
        // 网易云来源的歌曲自带 source，直接使用
        if (songInPlayer.source) {
          setSongSource(songInPlayer.source)
          setSourceGettingStatus('success')
        } else {
          setSourceGettingStatus('getting')
          setPlayerMessage('Getting source...')
          getSongSource(songInPlayer.newId)
            .then((data) => {
              setSongSource(data)
              setSourceGettingStatus('success')
            })
            .catch(() => {
              setSourceGettingStatus('failed')
              setPlayerMessage('Failed to get source.')
              message.info(`无法播放 <${songInPlayer.name}>`)
              // 不再自动切歌，保持当前歌曲让用户重试
            })
        }
      }
    }
  }, [songSource, playSignal, songInPlayer?.newId])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ' && e.target.nodeName === 'BODY') {
      e.preventDefault()
      if (e.target.nodeName === 'INPUT') {
        return
      }
      if (audioRef.current.paused) {
        setPlaySignal(true)
      } else {
        setPlaySignal(false)
      }
    }
  }, [])
  useEffect(() => {
    // 不能用 (e) => {}
    window.addEventListener('keydown', handleKeyDown)
    // return () => {
    //   window.removeEventListener('keydown', handleKeyDown);
    // };
  })

  function onAudioLoadStart() {
    setPlayerMessage('Loading media...')
    // document.title = 'Loading media...';
  }
  function onAudioError() {
    // 如果预缓存的音频 URL 过期，尝试从 API 直接获取新 URL（不读缓存）
    if (!retryRef.current && songInPlayer?.newId) {
      retryRef.current = true
      setPlayerMessage('Retrying source...')

      async function tryFetchSource() {
        // 1. 先尝试上游 API 直接请求
        try {
          const res = await fetch(`https://tonzhon.whamon.com/api/p/${songInPlayer.newId}`)
          const { success, data } = await res.json()
          if (success && data) {
            setSongSource(data)
            setMediaLoadingStatus('')
            return
          }
        } catch (_) { /* 继续尝试其他方式 */ }

        // 2. 降级到相对路径 API（开发/Vercel 代理）
        try {
          const res = await fetch(`/api/p/${songInPlayer.newId}`)
          if (res.ok) {
            const json = await res.json()
            if (json.success && json.data) {
              setSongSource(json.data)
              setMediaLoadingStatus('')
              return
            }
          }
        } catch (_) { /* 继续尝试 */ }

        // 3. 通过 getSongSource 再试一次（会尝试所有降级路径）
        try {
          const src = await getSongSource(songInPlayer.newId)
          if (src) {
            setSongSource(src)
            setMediaLoadingStatus('')
            return
          }
        } catch (_) { /* 所有尝试都失败 */ }

        setMediaLoadingStatus('error')
        setPlayerMessage('Media Load Error')
        retryRef.current = false
      }

      tryFetchSource()
    } else {
      setMediaLoadingStatus('error')
      setPlayerMessage('Media Load Error')
    }
  }
  function onAudioLoadedData() {
    setMediaLoadingStatus('success')
    setSongDuration(audioRef.current.duration)
    // document.title = songInPlayer?.name;
    // sendSongToServer();
  }
  function onAudioPlay() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setPlayProgress(audioRef.current.currentTime)
    }, 1000)
    setPaused(false)
  }
  function onAudioTimeUpdate() {
    const t = audioRef.current.currentTime
    setAudioCurrentTime(t)
    setCurrentTime(t)
  }
  function onAudioPause() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setPaused(true)
  }
  function onAudioEnded() {
    clearInterval(intervalRef.current)
    if (playMode === 'single') {
      playCurrentSongAgain()
    } else {
      playNext()
    }
  }

  function onPlayBtnClick() {
    setPlaySignal(true)
  }
  function onPauseBtnClick() {
    setPlaySignal(false)
  }

  // function sendSongToServer() {
  //   fetch(`/api/songs`, {
  //     method: 'POST',
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //     body: JSON.stringify({
  //       song: songInPlayer
  //     })
  //   });
  // }

  function onPlayProgressSliderChange(value) {
    audioRef.current.currentTime = value
    setPlayProgress(value)
  }

  function onDownloadIconClick(e) {
    if (songSource) {
      const a = document.createElement('a')
      a.href = songSource
      a.download = songInPlayer?.name ? `${songInPlayer.name}.mp3` : 'song.mp3'
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      showMessage('info', '请先播放', e)
    }
  }

  function onVolumeSliderChange(value) {
    audioRef.current.volume = value
    setVolume(value)
    localStorage.setItem('volume', value)
  }

  function onPreviousBtnClick() {
    if (playMode === 'order' || playMode === 'loop') {
      if (currentIndex > 0) {
        setSongInPlayer(filteredListenlist[currentIndex - 1])
      }
    }
  }

  function onNextBtnClick() {
    playNext()
  }

  function playNext() {
    if (currentIndex >= 0) {
      const lengthOfListenlist = filteredListenlist.length
      if (playMode === 'order') {
        if (currentIndex + 1 < lengthOfListenlist) {
          setSongInPlayer(filteredListenlist[currentIndex + 1])
        }
      } else if (playMode === 'loop') {
        if (currentIndex + 1 < lengthOfListenlist) {
          setSongInPlayer(filteredListenlist[currentIndex + 1])
        } else {
          setSongInPlayer(filteredListenlist[0])
        }
      } else if (playMode === 'shuffle') {
        if (lengthOfListenlist > 1) {
          let randomIndex
          do {
            randomIndex = Math.floor(Math.random() * lengthOfListenlist)
          } while (randomIndex === currentIndex)
          setSongInPlayer(filteredListenlist[randomIndex])
        }
      }
    }
  }

  function playCurrentSongAgain() {
    audioRef.current.currentTime = 0
    audioRef.current.play()
    // sendSongToServer(); // 此时不会 load 歌曲，不会触发 loadeddata 事件
  }

  // function onLyricsIconClick() {
  //   setIsScrollingLyricsOpen(!isScrollingLyricsOpen);
  // }

  function onPlayingListBtnClick() {
    setIsListenlistOpen(!isListenlistOpen)
  }

  const playBtn = (
    <PlayCircleFilled
      className="central-icon-in-player play-icon"
      title="空格键"
      onClick={onPlayBtnClick}
    />
  )
  const loadingIcon = (
    <Loader size={40} className="central-icon-in-player animate-spin" />
  )
  const pauseBtn = (
    <PauseCircleFilled
      className="central-icon-in-player pause-icon"
      title="空格键"
      onClick={onPauseBtnClick}
    />
  )
  const iconNoSource = (
    <Square size={40} className="central-icon-in-player error-icon-in-player" />
  )
  const iconLoadError = (
    <XCircle
      size={40}
      className="central-icon-in-player error-icon-in-player"
    />
  )

  const playModeIcons = {
    order: <OrderIcon className="unclickable-icon" />,
    loop: <LoopIcon className="unclickable-icon" />,
    single: <SingleIcon className="unclickable-icon" />,
    shuffle: <ShuffleIcon className="unclickable-icon" />,
  }

  return (
    <>
      {contextHolder}
      <div id="player" className="fixed">
        <audio
          ref={audioRef}
          src={songSource}
          onLoadStart={onAudioLoadStart}
          onError={onAudioError}
          onLoadedData={onAudioLoadedData}
          onPlay={onAudioPlay}
          onTimeUpdate={onAudioTimeUpdate}
          onPause={onAudioPause}
          onEnded={onAudioEnded}
        />
        {mediaLoadingStatus === 'success' && (
          <ConfigProvider
            theme={{
              components: {
                Slider: {
                  railSize: 2,
                  colorPrimaryBorder: 'orange', // 左侧进度
                  colorPrimaryBorderHover: 'orange', // Hover 后的左侧进度
                  colorBgElevated: 'orange',
                  handleSize: 12,
                  handleSizeHover: 12,
                  handleLineWidth: 0, // 圈的宽度，默认为 2
                  handleLineWidthHover: 0,
                  // colorFillTertiary: '#8c8c8c', // 右侧初始背景色
                  // colorFillTertiary: 'rgba(0, 0, 0, .5)', // 右侧初始背景色
                  // colorFillTertiary: '#d9d9d9', // 右侧初始背景色
                  // colorFillSecondary: '#595959', // 右侧悬浮背景色
                  // colorFillSecondary: 'rgba(0, 0, 0, .7)', // 右侧悬浮背景色
                  colorFillSecondary: '#8c8c8c', // 右侧悬浮背景色
                },
              },
            }}
          >
            <Slider
              min={0}
              max={songDuration ? parseInt(songDuration) : 0}
              value={playProgress}
              tooltip={{ open: false }}
              onChange={onPlayProgressSliderChange}
              // disabled={!songSource}
              style={{
                margin: 0,
                height: 'auto',
              }}
            />
          </ConfigProvider>
        )}
        <div id="below-progress-slider">
          <Row
            id="main-row"
            align="middle"
            justify="space-around"
            style={{
              height: '44px',
            }}
          >
            <Col span={7}>
              {songInPlayer && <SongWithCover song={songInPlayer} />}
            </Col>
            <Col span={3}>
              <Row justify="space-between">
                <Col>
                  <IconLikeSong song={songInPlayer} />
                </Col>
                <Col>
                  <AddToPlaylist song={songInPlayer} disabled={!songInPlayer} />
                </Col>
                <Col>
                  <Download className="icon" onClick={onDownloadIconClick} />
                </Col>
              </Row>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SkipBack className="icon" onClick={onPreviousBtnClick} />
              {sourceGettingStatus === ''
                ? playBtn
                : sourceGettingStatus === 'getting'
                  ? loadingIcon
                  : sourceGettingStatus === 'success'
                    ? mediaLoadingStatus === 'error'
                      ? iconLoadError
                      : mediaLoadingStatus === 'success'
                        ? paused
                          ? playBtn
                          : pauseBtn
                        : loadingIcon
                    : iconNoSource}
              <SkipForward className="icon" onClick={onNextBtnClick} />
            </Col>
            <Col span={10}>
              <Row justify="space-between">
                <Col>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'order',
                          icon: <OrderIcon style={{ fontSize: 20 }} />,
                          label: '顺序',
                        },
                        {
                          key: 'loop',
                          icon: <LoopIcon style={{ fontSize: 20 }} />,
                          label: '列表循环',
                        },
                        {
                          key: 'single',
                          icon: <SingleIcon style={{ fontSize: 20 }} />,
                          label: '单曲重复',
                        },
                        {
                          key: 'shuffle',
                          icon: <ShuffleIcon style={{ fontSize: 20 }} />,
                          label: '随机',
                        },
                      ],
                      onClick: ({ key }) => {
                        setPlayMode(key)
                      },
                    }}
                    placement="top"
                  >
                    {playModeIcons[playMode]}
                  </Dropdown>
                </Col>
                <Col>
                  <Space size={2}>
                    <VolumeIcon className="unclickable-icon" />
                    <ConfigProvider
                      theme={{
                        components: {
                          Slider: {
                            colorFillTertiary: '#d9d9d9', // 初始背景色
                            colorFillSecondary: '#f5f5f5', // 悬浮
                          },
                        },
                      }}
                    >
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={volume}
                        onChange={onVolumeSliderChange}
                        style={{
                          width: 100,
                          margin: 0,
                        }}
                      />
                    </ConfigProvider>
                  </Space>
                </Col>
                <Col>
                  <MinimizeIcon
                    className={isMini ? 'icon is-on' : 'icon'}
                    title="最小化"
                    onClick={toggleMini}
                  />
                </Col>
                <Col>
                  <LyricsIcon
                    className={isFloatingOpen ? 'icon is-on' : 'icon'}
                    title="浮动歌词"
                    onClick={() => {
                      if (isFloatingOpen) {
                        closeFloating()
                      } else {
                        openFloating(songInPlayer)
                      }
                    }}
                  />
                </Col>
                <Col>
                  <Badge
                    count={`${currentIndex + 1} / ${filteredListenlist.length}`}
                    size="small"
                    offset={[15, 0]}
                    style={{
                      backgroundColor: 'orange',
                    }}
                  >
                    <PlayingListIcon
                      className={isListenlistOpen ? 'icon is-on' : 'icon'}
                      onClick={onPlayingListBtnClick}
                    />
                  </Badge>
                </Col>
                <Col id="time-in-player">
                  {mediaLoadingStatus === 'success' ? (
                    <>
                      <span>{toMinAndSec(playProgress)}</span>
                      <span> / {toMinAndSec(songDuration)}</span>
                    </>
                  ) : (
                    playerMessage
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      {/* 迷你悬浮播放条 */}
      {isMini && <MiniPlayer onRestore={toggleMini} onClose={toggleMini} />}
    </>
  )
}

export default Player
