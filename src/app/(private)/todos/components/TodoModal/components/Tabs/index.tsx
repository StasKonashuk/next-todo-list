import { FC, useState } from 'react';
import { Tabs } from '@mantine/core';
import { Todo } from 'lib/features/todos/types';

import TodoComments from '../Comments';
import TodoForm from '../TodoForm';
import { TODO_TABS } from './constants';
import { TabValue } from './enums';

const TodoTabs: FC<Todo> = (props) => {
  const { comments, id } = props;

  const [activeTab, setActiveTab] = useState<string | null>(TabValue.Info);

  const displayedTabs = TODO_TABS.map(({ value, label }) => (
    <Tabs.Tab key={value} value={value}>
      {label}
    </Tabs.Tab>
  ));

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>{displayedTabs}</Tabs.List>

      <Tabs.Panel value={TabValue.Info} pt={16}>
        <TodoForm {...props} />
      </Tabs.Panel>

      <Tabs.Panel value={TabValue.Comments} pt={16}>
        <TodoComments comments={comments} todoId={id} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default TodoTabs;
