
import React, { useState, useEffect } from 'react';
import { Task, useTaskContext } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import { cn } from '@/lib/utils';

const TaskList: React.FC = () => {
  const { tasks, filter } = useTaskContext();
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [animateList, setAnimateList] = useState(false);
  
  // Filter and sort tasks when tasks or filter changes
  useEffect(() => {
    let filteredTasks = [...tasks];
    
    // Apply filters
    if (filter.priority !== "all") {
      filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
    }
    
    if (filter.completed !== "all") {
      filteredTasks = filteredTasks.filter(
        task => task.completed === filter.completed
      );
    }
    
    if (filter.category !== "all") {
      filteredTasks = filteredTasks.filter(
        task => task.category === filter.category
      );
    }
    
    // Sort by priority and completion status
    filteredTasks.sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    });
    
    setSortedTasks(filteredTasks);
    
    // Add animation when filter changes
    setAnimateList(true);
    const timer = setTimeout(() => setAnimateList(false), 500);
    
    return () => clearTimeout(timer);
  }, [tasks, filter]);
  
  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4 animate-bounce-slight">✨</div>
        <h2 className="text-2xl font-bold mb-2">No tasks found</h2>
        <p className="text-gray-500">
          {tasks.length === 0
            ? "Add your first task to get started!"
            : "Try changing your filters to see more tasks."}
        </p>
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-4", animateList && "animate-scale-up")}>
      {sortedTasks.map((task, index) => (
        <div
          key={task.id}
          style={{ 
            animationDelay: `${index * 0.1}s`,
          }}
          className="animate-scale-up"
        >
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
