import type { StorybookConfig } from "@storybook/react-vite";
import path from 'node:path'
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@/lib',
            replacement: path.resolve(__dirname, '../src/lib'),
          },
          {
            find: '@/components',
            replacement: path.resolve(__dirname, '../src/components'),
          },
        ],
      },
    }
  },
  
};
export default config;
