import { Debugger } from '@dougkulak/semrel-plugin-creator'

export type TBaseActionOptions = {
  branch: string
  from: string | string[]
  to: string
  message: string
}

export type TUserInfo = {
  name: string
  email: string
}

export type TActionOptionsNormalized = TBaseActionOptions & {
  debug: Debugger
  repo: string
  cwd: string
  temp: string
  user: TUserInfo
}

export type TActionType = 'fetch' | 'push'

export type TActionOptions = Partial<TActionOptionsNormalized> & {
  debug: Debugger
  repo: string
  user: TUserInfo
}

export type TPluginOptions = Partial<TBaseActionOptions> & {
  action: TActionType
}
