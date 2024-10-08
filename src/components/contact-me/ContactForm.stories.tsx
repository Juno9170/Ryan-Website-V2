import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ContactForm from './ContactForm';

const meta = {
    component: ContactForm,
  } satisfies Meta<typeof ContactForm>;
  
  export default meta;
  
  type Story = StoryObj<typeof meta>;

  
export const Default: Story = {};