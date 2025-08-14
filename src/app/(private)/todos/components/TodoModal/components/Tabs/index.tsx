import { Tabs } from '@mantine/core';
import { FC, useState } from 'react';
import { TabValue } from './enums';
import { TODO_TABS } from './constants';
import TodoForm from '../TodoForm';
import { Todo } from 'lib/features/todos/types';
import TodoComments from '../Comments';

const TodoTabs: FC<Todo> = (props) => {
  const [activeTab, setActiveTab] = useState<string | null>(TabValue.Info);

  const displayedTabs = TODO_TABS.map(({ value, label }) => {
    return (
      <Tabs.Tab key={value} value={value}>
        {label}
      </Tabs.Tab>
    );
  });

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>{displayedTabs}</Tabs.List>

      <Tabs.Panel value={TabValue.Info} pt={16}>
        <TodoForm {...props} />
      </Tabs.Panel>

      <Tabs.Panel value={TabValue.Comments} pt={16}>
        <TodoComments comments={props.comments} todoId={props.id} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default TodoTabs;
