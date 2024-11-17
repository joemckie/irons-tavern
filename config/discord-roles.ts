import { standardRanks } from './ranks';

export const discordRoles = {
  Blisterwood: '1275200966181916792',
  Diseased: '1275200867133558876',
  Elite: '846392933556682773',
  Achiever: '845831429514723360',
  Yew: '1275200753778036868',
  Law: '845831852543311872',
  Maple: '845832086690463801',
  Nature: '845832341499019284',
  Willow: '1275199994944688170',
  Earth: '845832454090129428',
  Oak: '846392037099962409',
  Water: '846392447629262868',
  Pine: '845833173416804392',
  Air: '1275198438971146240',
} satisfies Record<keyof typeof standardRanks, string>;
