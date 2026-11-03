export type Post = {
  id: string;
  author: 'tibo' | 'poteto' | 'other';
  handle: string;
  name: string;
  text: string;
  date: string;
  likes?: string;
  views?: string;
  url: string;
  receipt?: string;
  search?: boolean;
};
const post = (
  id: string,
  author: Post['author'],
  text: string,
  date: string,
  status?: string,
  likes?: string,
  receipt?: string,
): Post => {
  const handle =
    author === 'tibo'
      ? 'thsottiaux'
      : author === 'poteto'
        ? 'poteto'
        : 'ajambrosino';
  const views: Record<string, string> = {
    cartoon: '643K',
    lost: '855K+',
    double: '6.9M',
  };
  return {
    id,
    author,
    handle,
    name:
      author === 'tibo'
        ? 'Tibo'
        : author === 'poteto'
          ? 'lauren'
          : 'AJ Ambrosino',
    text,
    date: `2026-${date}`,
    likes,
    views: views[id],
    receipt,
    search: !status,
    url: status
      ? `https://x.com/${handle}/status/${status}`
      : `https://x.com/search?q=${encodeURIComponent(`from:${handle} "${text}"`)}&f=live`,
  };
};
export const posts = {
  dots: post(
    'dots',
    'tibo',
    'Pretty sure there are more dots than bots already in this little world.',
    '10-03',
    '2106226725428572371',
  ),
  fear: post(
    'fear',
    'poteto',
    'I smell fear',
    '10-03',
    '2106240418476327389',
    '5.4K',
  ),
  shaking: post(
    'shaking',
    'tibo',
    'The 3-day old dots are shaking and quaking',
    '10-03',
    '2106255580772061332',
  ),
  months: post(
    'months',
    'poteto',
    'I thought you had 6 months?',
    '10-03',
    '2106257026733248993',
  ),
  next: post(
    'next',
    'tibo',
    "You don't know what we're releasing next week",
    '10-03',
    '2106257453679808676',
  ),
  roadmap: post(
    'roadmap',
    'poteto',
    'Let me know if you want to see our roadmap',
    '10-03',
    '2106257796471857457',
  ),
  fries: post(
    'fries',
    'tibo',
    'i had french fries for lunch',
    '10-03',
    '2106499926956060984',
  ),
  cartoon: post(
    'cartoon',
    'poteto',
    'See you soon for more ships from The Ship Company.',
    '10-04',
    '2106836662898897115',
    '6K',
    '01-poteto-cartoon-large-view',
  ),
  kickoff: post(
    'kickoff',
    'tibo',
    "Over the next 28 days, each day we'll either ship one thing that is a clear improvement and relevant for most codex/work users or ship a full reset.",
    '10-04',
    '2106845241357824205',
    undefined,
    '02-kickoff',
  ),
  challenge: post(
    'challenge',
    'tibo',
    'I challenge you to do the same.',
    '10-04',
    '2106845738814849339',
  ),
  battle: post(
    'battle',
    'poteto',
    'only you can win this battle',
    '10-04',
    '2106850325219180624',
  ),
  temu: post(
    'temu',
    'poteto',
    'help me think of some bangers about the temu knockoff of you',
    '10-05',
    '2107286347883180315',
    undefined,
    '04-temu-knockoff',
  ),
  fear2: post(
    'fear2',
    'tibo',
    'I smell fear',
    '10-05',
    '2107294414091759840',
    undefined,
    '04-temu-thread',
  ),
  resets: post(
    'resets',
    'poteto',
    'Maybe you should let me poast while you focus on your 28 days of resets',
    '10-05',
    '2107310695373287731',
  ),
  rigged: post(
    'rigged',
    'tibo',
    "it seems that the game is rigged in reset's favor… the reset has been processed.",
    '10-06',
    '2107676072871600470',
    undefined,
    '05-rigged',
  ),
  bag: post(
    'bag',
    'poteto',
    'just put the reset in the bag bro',
    '10-06',
    '2107383850083230000',
    undefined,
    '06-reset-in-the-bag',
  ),
  bag2: post(
    'bag2',
    'tibo',
    'Put the reset in the bag. All propagated.',
    '10-10',
  ),
  side: post(
    'side',
    'tibo',
    "What would you like with your side of reset? It's done.",
    '10-12',
    '2109873287853707513',
  ),
  mashed: post(
    'mashed',
    'tibo',
    'Mashed @poteto on the house.',
    '10-12',
    '2109873307722121591',
  ),
  back: post(
    'back',
    'poteto',
    'back for more?',
    '10-12',
    '2109876916622872762',
  ),
  lost: post(
    'lost',
    'tibo',
    'The reports of my reset button being lost are greatly exaggerated.',
    '10-14',
    '2110595484180214059',
  ),
  facts: post(
    'facts',
    'tibo',
    'Small @poteto speaks big facts',
    '10-16',
    '2111337472349343856',
  ),
  street: post(
    'street',
    'tibo',
    "People have escaped the TL and are asking me for resets on the street now. I'll make little cards to hand out.",
    '10-18',
  ),
  cooked: post(
    'cooked',
    'tibo',
    "Day 15/ We're cooked",
    '10-19',
    '2112268918681485431',
  ),
  cooking: post(
    'cooking',
    'tibo',
    "Nevermind, we're still cooking… and reset. Enjoy.",
    '10-20',
    '2112432076767289678',
  ),
  forgot: post(
    'forgot',
    'tibo',
    "Bet you thought we forgot, but no, it's reset day today.",
    '10-21',
    '2113162277688070445',
  ),
  yes: post(
    'yes',
    'tibo',
    "But yes… that's a reset!",
    '10-22',
    '2113492187770175603',
  ),
  tool: post(
    'tool',
    'tibo',
    "Don't be a tool.",
    '10-23',
    '2113838156193894447',
  ),
  potato: post(
    'potato',
    'poteto',
    'be a potato instead',
    '10-24',
    '2113896737773617607',
  ),
  rest: post(
    'rest',
    'tibo',
    'Day 20/ Rest and reset',
    '10-24',
    '2114200152701575656',
  ),
  seven: post(
    'seven',
    'tibo',
    'Wonder what happens the remaining seven days. But today is a reset.',
    '10-25',
    '2114588174249071102',
  ),
  kidding: post(
    'kidding',
    'tibo',
    'Just kidding, today is a reset.',
    '10-27',
    '2115273064481218829',
  ),
  domain: post(
    'domain',
    'tibo',
    'poteto.com has landed',
    '10-28',
    '2115297093879472332',
  ),
  afford: post(
    'afford',
    'poteto',
    '💀💀💀 i cant afford tibo.com',
    '10-28',
    '2115305034393252197',
  ),
  views: post(
    'views',
    'tibo',
    'Pretty wild that this site got 3M views.',
    '10-28',
    '2115473170279080149',
  ),
  popular: post(
    'popular',
    'poteto',
    'i guess potetos are just more popular than all your other posts',
    '10-28',
    '2115491614777069746',
  ),
  token: post(
    'token',
    'tibo',
    'Graduating from The Reset Company to The Token Company.',
    '10-29',
    '2115851621137784832',
  ),
  double: post(
    'double',
    'tibo',
    'We are doubling all usage limits for all Pro 100/200/500 tiers and Business Premium, effective today.',
    '10-29',
    '2115850175868727621',
    '38.6K',
  ),
  feedback: post(
    'feedback',
    'tibo',
    'Send your kind feedback to this person',
    '10-29',
    '2115890336107233347',
  ),
  complaints: post(
    'complaints',
    'other',
    'now, send me your complaints',
    '10-29',
  ),
  bank: post(
    'bank',
    'tibo',
    'Next two days will be resets… banked… do with this what you may 👀',
    '10-30',
    '2116405414921384099',
  ),
  game: post(
    'game',
    'poteto',
    "Day 28/ tibo's game has landed. i spent $5.99 on this domain",
    '11-01',
    '2117004709198475365',
  ),
  planned: post(
    'planned',
    'poteto',
    'i swear this was not planned',
    '11-01',
    '2117004816115540021',
  ),
  months2: post(
    'months2',
    'tibo',
    "it's fine to admit we plan these together months in advance",
    '11-01',
    '2117035666332954818',
  ),
  compute: post(
    'compute',
    'tibo',
    'Game so good because poteto used all the compute and forced Elon to pull the plug',
    '11-01',
    '2117151734506397716',
  ),
  finished: post(
    'finished',
    'tibo',
    'I finished it though.',
    '11-01',
    '2117151862705230048',
  ),
};
export type PostKey = keyof typeof posts;
