import * as migration_20260409_050851 from './20260409_050851';

export const migrations = [
  {
    up: migration_20260409_050851.up,
    down: migration_20260409_050851.down,
    name: '20260409_050851'
  },
];
