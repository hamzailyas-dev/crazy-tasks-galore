
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  category?: string;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, priority: Task["priority"], category?: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string, priority: Task["priority"], category?: string) => void;
  filter: {
    priority: Task["priority"] | "all";
    completed: boolean | "all";
    category: string | "all";
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      priority: Task["priority"] | "all";
      completed: boolean | "all";
      category: string | "all";
    }>
  >;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Design crazy UI for the todo app",
      completed: true,
      priority: "high",
      category: "Design",
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "Add animations to task cards",
      completed: false,
      priority: "medium",
      category: "Development",
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "Create custom emoji reactions",
      completed: false,
      priority: "low",
      category: "Fun",
      createdAt: new Date(),
    },
  ]);

  const [filter, setFilter] = useState<{
    priority: Task["priority"] | "all";
    completed: boolean | "all";
    category: string | "all";
  }>({
    priority: "all",
    completed: "all",
    category: "all",
  });

  const addTask = (text: string, priority: Task["priority"], category?: string) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      category,
      createdAt: new Date(),
    };
    
    setTasks([...tasks, newTask]);
    toast("Task added!", {
      description: text,
      action: {
        label: "Undo",
        onClick: () => {
          setTasks(tasks);
        },
      },
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast(task.completed ? "Task marked as incomplete" : "Task completed!", {
        description: task.text
      });
    }
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    
    if (taskToDelete) {
      toast("Task deleted", {
        description: taskToDelete.text,
        action: {
          label: "Undo",
          onClick: () => {
            setTasks(prev => [...prev, taskToDelete]);
          },
        },
      });
    }
  };

  const editTask = (id: string, text: string, priority: Task["priority"], category?: string) => {
    if (!text.trim()) return;
    
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text, priority, category }
          : task
      )
    );
    
    toast("Task updated!", {
      description: text
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        editTask,
        filter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
