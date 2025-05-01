
import React, { useState } from 'react';
import { Task, useTaskContext } from '@/context/TaskContext';
import { Check, Trash, Edit, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, editTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category || '');
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveEdit = () => {
    editTask(task.id, editText, editPriority as Task['priority'], editCategory);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditCategory(task.category || '');
    setIsEditing(false);
  };

  const priorityClasses = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  };

  const categoryColors = {
    Design: 'bg-crazy-hotPink',
    Development: 'bg-crazy-electricBlue',
    Fun: 'bg-crazy-neonGreen',
    Work: 'bg-crazy-purple',
    Personal: 'bg-crazy-vibrantOrange',
    default: 'bg-gray-400'
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return categoryColors.default;
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  };

  if (isEditing) {
    return (
      <div className={cn("task-card animate-scale-up", priorityClasses[task.priority])}>
        <div className="mb-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-crazy-purple"
            autoFocus
          />
        </div>
        
        <div className="flex gap-2 mb-3">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
            className="p-2 border-2 border-black rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category"
            className="flex-1 p-2 border-2 border-black rounded"
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleCancelEdit}
            className="bg-red-500 hover:bg-red-600 text-white"
            size="sm"
          >
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            className="bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            <Check className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "task-card",
        priorityClasses[task.priority],
        {
          "opacity-70": task.completed,
          "animate-bounce-slight": isHovered && !task.completed,
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div 
          className={cn(
            "flex-grow cursor-pointer flex items-start gap-3", 
            task.completed && "line-through text-gray-500"
          )}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          <div className={cn(
            "h-6 w-6 border-2 border-black rounded flex items-center justify-center transition-colors", 
            task.completed ? "bg-crazy-purple text-white" : "bg-white"
          )}>
            {task.completed && <Check className="h-4 w-4" />}
          </div>
          <div>
            <p className="font-bold text-lg">{task.text}</p>
            <div className="flex items-center gap-2 mt-2">
              {task.category && (
                <span className={cn("category-pill", getCategoryColor(task.category))}>
                  {task.category}
                </span>
              )}
              <span className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-crazy-electricBlue hover:bg-blue-500 text-white h-8 w-8 p-0"
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => deleteTask(task.id)}
            className="bg-crazy-hotPink hover:bg-red-500 text-white h-8 w-8 p-0"
            size="sm"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div
        className={cn(
          "absolute -right-2 -top-2 h-8 w-8 flex items-center justify-center border-2 border-black rounded-full font-bold text-xs",
          {
            "bg-crazy-hotPink text-white": task.priority === "high",
            "bg-crazy-neonGreen text-black": task.priority === "medium",
            "bg-crazy-purple text-white": task.priority === "low",
          }
        )}
      >
        {task.priority === "high" ? "!" : task.priority === "medium" ? "~" : "-"}
      </div>
    </div>
  );
};

export default TaskCard;
