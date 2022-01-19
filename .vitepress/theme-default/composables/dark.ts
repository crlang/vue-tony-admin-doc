import { useDark } from '@vueuse/core';

export const isDark = useDark({
  storageKey: 'tony-admin-color-scheme',
  valueLight: 'light',
});
