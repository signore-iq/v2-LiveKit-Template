import type { RoomOptions } from 'livekit-client'

export type AgentMode = 'pipeline' | 'realtime'

export interface TokenResponse {
  token: string
  url: string
  room: string
  identity: string
  mode: AgentMode
}

export async function fetchToken(room?: string, identity?: string, mode?: AgentMode): Promise<TokenResponse> {
  const resp = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room, identity, mode }),
  })
  if (!resp.ok) throw new Error(`Token fetch failed: ${resp.status}`)
  return resp.json()
}

export function createRoomOptions(): RoomOptions {
  return {
    audioCaptureDefaults: { autoGainControl: true, noiseSuppression: true },
    adaptiveStream: true,
    iceServers: [
      {
        urls: [
          'turn:openrelay.metered.ca:80',
          'turn:openrelay.metered.ca:443',
          'turn:openrelay.metered.ca:80?transport=tcp',
          'turn:openrelay.metered.ca:443?transport=tcp'
        ],
        username: '59379c96146d23fdd91e8989',
        credential: 'nFfVaskf3D8LptJC'
      }
    ]
  }
}
