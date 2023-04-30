import { io } from 'socket.io-client'
import { errorMessage, getUser } from '@/utils'
import store from '@/store'
export default class AppSocket {
  io: any
  #namespace: string = ''
  #socket: any = null
  me: TUser

  static instance: AppSocket
  static accessed: boolean = false

  waitingForReset: boolean = false
  canvasInit: boolean = false
  // currentFrame: Map<number, FrameInfo> = new Map()
  // roles: Role[] = []
  roleUID: Set<number> = new Set()

  blobArray: Blob[] = []
  mediaSource?: MediaSource
  sourceBuffer?: SourceBuffer
  count = 1
  #connected: boolean = false

  private constructor () {
    // MapSocket.accessed = true
    this.me = store.getState().user as TUser
  }

  get connected () {
    return this.#connected
  }

  get namespace () {
    return this.#namespace
  }

  set namespace (namespace: string) {
    this.#namespace = namespace
  }

  get socket () {
    return this.#socket
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new AppSocket()
    }
    return this.instance
  }

  // #region ********* on 事件 *********
  onConnection () {
    // eslint-disable-next-line no-console
    console.log('connected!')
    this.#connected = true
  }

  onReconnection () {
    // eslint-disable-next-line no-console
    console.log('Reconnected!')
  }

  onDisconnect (res: any) {
    // eslint-disable-next-line no-console
    console.log('GOT DISCONNECTED', res)
    errorMessage('与服务器断开连接，请刷新重试')
    this.#connected = false
    this.socket.disconnect()
  }

  onError (res: any) {
    const msg = res.toString()
    this.#connected = false
    errorMessage(msg)
    if (msg == 'Error: Token Not Found.') {
      // token校验失败
    }
  }

  onCurrentActiveUsers (res: SocketResponse<{ id: number }>) {
    //
    
  }

  // #endregion

  /**
   * if socket is not connected, reconnect
   * @returns true if current socket is connected, false otherwise
   */
  initSocket (namespace?: string): boolean {
    const baseUrl = import.meta.env.APTX_BASE_URL.replace('http', 'ws')
    const user = getUser()
    if (!user) {
      errorMessage('您已离线，请重新加载')
      window.open()
      return false
    }
    this.#socket = io(
      baseUrl,
      {
        query: { uid: user.id, username: user.username, avatar: user.avatar },
        auth: { token: localStorage.getItem('token') },
        transports: ['websocket'],
        upgrade: true,
      },
    )

    this.bindSocketEvents()
    return false
  }

  bindSocketEvents () {
    this.socket.on('reconnect', this.onReconnection.bind(this))
    this.socket.on('connect', this.onConnection.bind(this))
    this.socket.on('disconnect', this.onDisconnect.bind(this))
    this.socket.on('connect_error', this.onError.bind(this))
    this.socket.on(ServerEmitEvents.CURRENT_ACTIVE_USERS, this.onCurrentActiveUsers.bind(this))
  }

  disconnect () {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  emitUserJoinMediaChannel (data: { clubId: string, channelId: string, uid: number }) {
    this.socket.emit(ServerEmitEvents.USER_JOIN_MEDIA_CHANNEL, data)
  }

  emitUserLeftMediaChannel (data: { clubId: string, channelId: string, uid: number }) {
    this.socket.emit(ServerEmitEvents.USER_LEFT_MEDIA_CHANNEL, data)
  }

}

export enum ServerEmitEvents {
  UPDATE_USER_STATUS = 'update_user_status',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  CLUB_INFO = 'club_info',
  USER_JOIN_MEDIA_CHANNEL = 'user_join_media_channel',
  USER_LEFT_MEDIA_CHANNEL = 'user_left_media_channel',
  OFFER_CALL = 'offer_call',
  ANSWER_CALL = 'answer_call',
  RTC_CANDIDATE = 'rtc_candidate',
  SCREEN_OFFER_CALL = 'screen_offer_call',
  SCREEN_ANSWER_CALL = 'screen_answer_call',
  SCREEN_RTC_CANDIDATE = 'screen_rtc_candidate',
  PREPARE_STREAMING = 'prepare_streaming',
  STREAMING = 'streaming',
  TOGGLE_MEDIA = 'toggle_media',
  UPDATE_USER_MEDIA_STATUS = 'update_user_media_status',
  REFETCH_CLUB = 'refetch_clubs',
  UPDATE_USER_PROFILE = 'update_user_profile',
  NEW_CHANNEL_MESSAGE = 'new_channel_message',
  CURRENT_ACTIVE_USERS = 'current_active_users',
}