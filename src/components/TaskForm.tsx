
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

const TaskForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [category, setCategory] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask(text, priority, category || undefined);
    setText('');
    setPriority('medium');
    setCategory('');
    setIsFormOpen(false);
  };

  return (
    <div className="mb-8">
      {!isFormOpen ? (
        <div className="flex justify-center">
          <button
            onClick={() => setIsFormOpen(true)}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className={cn(
              "flex items-center justify-center px-6 py-4 rounded-full",
              "bg-crazy-purple text-white font-bold text-lg",
              "border-4 border-black transform transition-all duration-300",
              "shadow-3d hover:shadow-3d-hover active:translate-y-1",
              isButtonHovered && "animate-wiggle"
            )}
          >
            <Plus className="w-6 h-6 mr-2" />
            Add a crazy task!
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "bg-white p-6 rounded-lg border-4 border-black shadow-3d",
            "animate-scale-up transform transition-all duration-300"
          )}
        >
          <h2 className="text-2xl font-crazy font-bold mb-4 text-center">What's your next wild idea?</h2>
          
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter task description..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border-2 border-black rounded text-lg"
                autoFocus
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-bold">Priority Level:</label>
                <div className="flex gap-2">
                  {['high', 'medium', 'low'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p as 'high' | 'medium' | 'low')}
                      className={cn(
                        "flex-1 py-2 px-3 border-2 border-black rounded-lg font-bold transition-all",
                        {
                          "bg-crazy-hotPink text-white": p === 'high' && priority === 'high',
                          "bg-crazy-neonGreen text-black": p === 'medium' && priority === 'medium',
                          "bg-crazy-purple text-white": p === 'low' && priority === 'low',
                          "bg-gray-100": p !== priority,
                          "transform scale-110": p === priority,
                        }
                      )}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-bold">Category:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border-2 border-black rounded"
                >
                  <option value="">No Category</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Fun">Fun</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="border-2 border-black bg-white text-black hover:bg-gray-100"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                className="border-2 border-black bg-crazy-purple hover:bg-crazy-darkPurple text-white font-bold"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
