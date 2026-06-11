import { X, Lightbulb, Target, BookOpen } from 'lucide-react';
import type { Task, Phase } from '../data/gtmData';

interface TaskDrawerProps {
  task: Task | null;
  phase: Phase | null;
  onClose: () => void;
}

export function TaskDrawer({ task, phase, onClose }: TaskDrawerProps) {
  if (!task || !phase) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: phase.color }}
        />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div
                className="text-xs font-medium mb-2 flex items-center gap-1.5"
                style={{ color: phase.color }}
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.number}
                </span>
                {phase.name}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                {task.label}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">What this means</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{task.description}</p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Why it matters</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{task.whyItMatters}</p>
            </section>

            {task.examples.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Examples</h3>
                </div>
                <div className="space-y-2">
                  {task.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-3 rounded-lg text-sm text-gray-700 leading-relaxed"
                      style={{ backgroundColor: phase.lightColor }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                        style={{ backgroundColor: phase.color }}
                      >
                        {i + 1}
                      </span>
                      {ex}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
