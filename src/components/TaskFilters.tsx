
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const TaskFilters: React.FC = () => {
  const { filter, setFilter, tasks } = useTaskContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get unique categories from tasks
  const categories = [...new Set(tasks.map(task => task.category).filter(Boolean))];
  
  const handlePriorityChange = (priority: typeof filter.priority) => {
    setFilter(prev => ({ ...prev, priority }));
  };
  
  const handleCompletionChange = (completed: typeof filter.completed) => {
    setFilter(prev => ({ ...prev, completed }));
  };
  
  const handleCategoryChange = (category: typeof filter.category) => {
    setFilter(prev => ({ ...prev, category }));
  };
  
  const clearFilters = () => {
    setFilter({
      priority: "all",
      completed: "all",
      category: "all",
    });
  };
  
  // Check if any filters are active
  const hasActiveFilters = 
    filter.priority !== "all" || 
    filter.completed !== "all" || 
    filter.category !== "all";
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-lg font-bold flex items-center"
        >
          <span>Filter Tasks</span>
          <span className="ml-2 text-2xl transform transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▾
          </span>
        </button>
        
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      {isExpanded && (
        <div className="bg-white p-4 rounded-lg border-2 border-black animate-scale-up">
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Priority Filter */}
            <div>
              <h3 className="font-bold mb-2">Priority</h3>
              <div className="space-y-2">
                {["all", "high", "medium", "low"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => handlePriorityChange(priority as typeof filter.priority)}
                    className={cn(
                      "flex items-center w-full py-2 px-3 rounded-lg border-2 border-black transition-all",
                      {
                        "bg-black text-white": filter.priority === priority,
                        "bg-white": filter.priority !== priority,
                      }
                    )}
                  >
                    <div className="flex-1 text-left">
                      {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </div>
                    {filter.priority === priority && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Completion Filter */}
            <div>
              <h3 className="font-bold mb-2">Status</h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Tasks" },
                  { value: false, label: "Active" },
                  { value: true, label: "Completed" },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    onClick={() => handleCompletionChange(option.value as typeof filter.completed)}
                    className={cn(
                      "flex items-center w-full py-2 px-3 rounded-lg border-2 border-black transition-all",
                      {
                        "bg-black text-white": String(filter.completed) === String(option.value),
                        "bg-white": String(filter.completed) !== String(option.value),
                      }
                    )}
                  >
                    <div className="flex-1 text-left">{option.label}</div>
                    {String(filter.completed) === String(option.value) && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <h3 className="font-bold mb-2">Category</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={cn(
                    "flex items-center w-full py-2 px-3 rounded-lg border-2 border-black transition-all",
                    {
                      "bg-black text-white": filter.category === "all",
                      "bg-white": filter.category !== "all",
                    }
                  )}
                >
                  <div className="flex-1 text-left">All Categories</div>
                  {filter.category === "all" && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "flex items-center w-full py-2 px-3 rounded-lg border-2 border-black transition-all",
                      {
                        "bg-black text-white": filter.category === category,
                        "bg-white": filter.category !== category,
                      }
                    )}
                  >
                    <div className="flex-1 text-left">{category}</div>
                    {filter.category === category && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
