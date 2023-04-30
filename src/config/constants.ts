export const DEFAULT_PAGE_ROUTE = '/app/me'

export enum PROCESS_ENV {
  DEVELOPMENT = 'development',
  TEST = 'test',
  SIMULATION = 'simulation',
  PRODUCTION = 'production',
}

export enum FRIEND_APPLICATION_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  BLOCKED = 'blocked',
}

export enum FRIEND_APPLICATION_ACTION {
  BLOCK = 'block',
  REVOKE = 'revoke',
  DENY = 'deny',
  ACCEPT = 'accept',
  UNBLOCK = 'unblock',
}

export enum FRIEND_STATUS {
  ONLINE = 'Online',
  ALL = 'All',
  PENDING = 'Pending',
  BLOCKED = 'Blocked',
}

export enum USER_STATUS {
  ONLINE = 'online',
  IN_GAME = 'ingame',
  OFFLINE = 'offline',
  IDLE = 'idle',
}

export enum ImageType {
  JPEG = 'jpeg',
  JPG = 'jpg',
  GIF = 'gif',
  WEBP = 'webp',
  SVG = 'svg',
  PNG = 'png',
}