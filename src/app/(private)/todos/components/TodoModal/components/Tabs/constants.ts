import { TabValue } from './enums';

const TODO_TAB_LABELS = {
  [TabValue.Info]: 'Info',
  [TabValue.Comments]: 'Comments',
};

export const TODO_TABS = Object.values(TabValue).map((tab) => ({
  value: tab,
  label: TODO_TAB_LABELS[tab],
}));
