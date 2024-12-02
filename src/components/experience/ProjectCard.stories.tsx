import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProjectCard from "./ProjectCard";

const meta = {
  component: ProjectCard,
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projectTitle: "Project XYZ",
    date: new Date(),
    shortDescription:
      "Project XYZ is a cutting-edge web application that revolutionizes the way users interact with data. It provides real-time analytics and intuitive visualizations, making complex information easily digestible.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    slug: "project-xyz",
    projectLink: "https://project-xyz.com",
    primaryImage: {
      alt: "Project XYZ",
      avifUrl: "https://via.placeholder.com/1920",
      webpUrl: "https://via.placeholder.com/1920",
      jpgUrl: "https://via.placeholder.com/1920",
      fallbackUrl: "https://via.placeholder.com/1920",
    },
  },
};
