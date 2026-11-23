export const ICONS = {
  flow: 'M4 12c3-6 5-6 8 0s5 6 8 0',
  menu: 'M4 6h16M4 12h16M4 18h16',
  panel: 'M4 5h16v14H4zM9 5v14',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  bell: 'M6 9a6 6 0 0112 0c0 6 2 7 2 7H4s2-1 2-7zM10 20h4',
  plus: 'M12 5v14M5 12h14',
  chev: 'M9 6l6 6-6 6',
  x: 'M6 6l12 12M18 6L6 18',
  home: 'M4 11l8-7 8 7v9H4z',
  doc: 'M7 3h8l4 4v14H7zM15 3v4h4',
  users: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M17 8a3 3 0 010 6M21 20c0-3-1-5-3-5',
  tag: 'M3 12V4h8l10 10-8 8z',
  card: 'M3 6h18v12H3zM3 10h18',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  chart: 'M4 20V4M4 20h16M8 16v-5M13 16V8M18 16v-9',
  gear: 'M12 9a3 3 0 100 6 3 3 0 000-6zM4 12h2M18 12h2M12 4v2M12 18v2',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  help: 'M9 9a3 3 0 116 0c0 2-3 2-3 4M12 17v.5M12 3a9 9 0 100 18 9 9 0 000-18z',
  out: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9',
} as const;

export type IconName = keyof typeof ICONS;
