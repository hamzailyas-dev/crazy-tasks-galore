
import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskFilters from '@/components/TaskFilters';
import TaskList from '@/components/TaskList';

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen py-8 px-4 bg-crazy-pattern">
        <div className="max-w-3xl mx-auto">
          <Header />
          
          <div className="relative">
            <TaskForm />
            <TaskFilters />
            <TaskList />
          </div>
          
          <footer className="mt-20 text-center text-sm text-gray-500">
            <p>© 2024 Crazy Tasks • Made with 🤪</p>
          </footer>
        </div>
      </div>
    </TaskProvider>
  );
};

export default Index;
