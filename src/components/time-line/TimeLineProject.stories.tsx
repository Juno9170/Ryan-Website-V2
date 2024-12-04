import type { Meta, StoryObj } from "@storybook/react";

import TimeLineProject from "./TimeLineProject";

const meta = {
  component: TimeLineProject,
} satisfies Meta<typeof TimeLineProject>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      slug: "test",
      projectTitle: "Project Name",
      shortDescription: "Project Description",
      githubLink: "https://www.google.com",
      date: "2021-01-01",
      technologies: ["React", "TypeScript"],
      primaryImage: {
        fallbackUrl: "https://placehold.co/600x400",
      },
    },
    hoverable: true,
    index: 0,
  },
};
