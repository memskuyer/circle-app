import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          value: '#00ffff',
        },
        secondary: {
          value: '#909090',
        },
        background: {
          value: '#262626',
        },
        outline: {
          value: '#3F3F3F',
        },
        shadX: {
          value: '0 20px 25px rgba(0, 255, 255, 0.5)',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
