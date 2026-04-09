import * as migration_20260409_230914 from './20260409_230914';

export const migrations = [
  {
    up: migration_20260409_230914.up,
    down: migration_20260409_230914.down,
    name: '20260409_230914'
  },
];
