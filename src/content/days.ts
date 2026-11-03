import type { PostKey } from './posts';
export type DayExtra =
  | { kind: 'stamp'; items: string[]; numbered?: boolean; caption?: string }
  | { kind: 'cooking' };
export type Day = {
  day: number;
  date: string;
  type: 'ship' | 'reset';
  summary: string;
  status: string;
  beats?: PostKey[];
  caption?: string;
  extra?: DayExtra;
};
const ships = new Set([1, 3, 4, 5, 7, 9, 11, 12, 14, 16, 19, 22, 24, 25, 26]);
const summaries = [
  'Default Astra and Sol speeds, 50% faster.',
  'Four ships. The community voted reset anyway.',
  'GPT-6 in Chat. A bonus reset banked.',
  'Instant steering. Sol Ultrafast, up to 8× faster.',
  'Composer predictions. Dots on mobile.',
  'Global reset. A familiar turn of phrase.',
  'Sol context: 272K → 500K.',
  'A reset, with a side order.',
  'Desktop disk state, 60% smaller.',
  'The button was never missing.',
  'Fewer capacity errors. Tasks continue on their own.',
  'Better context reuse, caching and routing.',
  'Le limit reset.',
  'Edit previous messages in desktop threads.',
  'A brief change of kitchen status.',
  '12-hour API caching. Persistent cache for signed-in users.',
  'They remembered.',
  'Decisions API GA. OpenResponses. Uber. Still a reset.',
  'Faster calls. Better cache. Updated CLI.',
  'Rest and reset.',
  'Seven days remaining.',
  'Terra returns. Twice the usage of Sol.',
  'The iCloud fake-out.',
  'Text your dot over iMessage or RCS.',
  'Usage limits doubled.',
  'Switch accounts on mobile. Two resets banked.',
  'Banked 1/2',
  'Day 28/ Banked 2/2',
];
const statuses = [
  '2107158998495748264',
  '2107676072871600470',
  '2107913674593644711',
  '2108275041276420573',
  '2108645667451318747',
  '2109045220411351517',
  '2109430343346581527',
  '2109812216212099456',
  '2110151780478927344',
  '2110595484180214059',
  '2110750421367287996',
  '2111244596131111253',
  '2111492673890824348',
  '2111990254408434095',
  '2112432076767289678',
  '2112712984644784534',
  '2113162277688070445',
  '2113492187770175603',
  '2113770573994299544',
  '2114200152701575656',
  '2114588174249071102',
  '2114800277677092936',
  '2115273064481218829',
  '2115622002581188681',
  '2115850175868727621',
  '2116405414921384099',
  '2116692529970311254',
  '2117035794678546764',
];
const beats: Partial<Record<number, PostKey[]>> = {
  1: ['temu', 'fear2', 'resets'],
  2: ['rigged', 'bag'],
  6: ['bag2'],
  8: ['side', 'mashed', 'back'],
  10: ['lost'],
  12: ['facts'],
  14: ['street'],
  15: ['cooking', 'cooked'],
  17: ['forgot'],
  18: ['yes'],
  19: ['tool', 'potato'],
  20: ['rest'],
  21: ['seven'],
  23: ['kidding'],
  26: ['bank'],
};
const extras: Partial<Record<number, DayExtra>> = {
  2: {
    kind: 'stamp',
    numbered: true,
    items: [
      'Auto-review, free.',
      'API tiers: 5 → 3.',
      'Meetings plugin.',
      'Decisions API.',
    ],
  },
  15: { kind: 'cooking' },
  18: {
    kind: 'stamp',
    items: [
      'Decisions API → GA',
      'OpenResponses → Linux Foundation',
      'Performance improvements → shipped',
      'Uber → all in',
    ],
    caption: 'STILL A RESET.',
  },
};
const captions: Partial<Record<number, string>> = {
  6: 'HE ADOPTED THE LINE.',
  8: 'THE TIMELINE HAD THEORIES.',
  10: '855K VIEWS. BUTTON ACCOUNTED FOR.',
  25: 'GRADUATION FOLLOWS.',
};
export const days: Day[] = summaries.map((summary, i) => ({
  day: i + 1,
  date: new Date(Date.UTC(2026, 9, 5 + i)).toISOString().slice(0, 10),
  type: ships.has(i + 1) ? 'ship' : 'reset',
  summary,
  status: statuses[i],
  beats: beats[i + 1],
  extra: extras[i + 1],
  caption: captions[i + 1],
}));
export const weeks = [
  { title: 'THE GAME IS RIGGED', subtitle: 'FOUR SHIPS. ONE RESET.', start: 1 },
  { title: 'MASHED', subtitle: 'SERVICE CONTINUES.', start: 8 },
  { title: 'WE’RE COOKED', subtitle: 'AN UPDATE FROM THE KITCHEN.', start: 15 },
  { title: 'THE TOKEN COMPANY', subtitle: 'THE FINAL SEVEN.', start: 22 },
];
