import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const allTasks = tasks.map(task => ({ ...task }));
    let tasksExists = '';

    allTasks.find(task => {
      if (task.title == newTaskTitle) {
        tasksExists = 'yes';
      }
    });

    if (tasksExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar mais de uma task com o mesmo nome'
      );
    } else {
      const newTask = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      };

      setTasks(allTasks => [...allTasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    updatedTasks.find(task => {
      if (task.id == id) {
        task.done == false ? (task.done = true) : (task.done = false);
      }
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(allTasks => allTasks.filter(task => task.id != id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
