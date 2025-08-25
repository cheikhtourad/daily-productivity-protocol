'use client';

import React, { useState, useRef } from 'react';
import { useTasks } from '@/contexts/TasksContext';
import { useLanguage } from '@/contexts/LanguageContext';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface BulkTaskImportProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImportTask {
  title: string;
  description?: string;
  category: string;
  startTime: string;
  endTime: string;
}

export default function BulkTaskImport({ isOpen, onClose }: BulkTaskImportProps) {
  const { addTask } = useTasks();
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'file' | 'text' | 'template'>('file');
  const [bulkText, setBulkText] = useState('');
  const [parsedTasks, setParsedTasks] = useState<ImportTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['work', 'health', 'education', 'family', 'hobbies', 'personal', 'other'];

  const validateTask = (task: Record<string, unknown>): ImportTask | null => {
    if (!task.title || typeof task.title !== 'string' || !task.title.trim()) {
      return null;
    }

    const title = task.title.trim();
    const description = task.description ? task.description.toString().trim() : '';
    const categoryValue = task.category?.toString().toLowerCase() || '';
    const category = categories.includes(categoryValue) ? categoryValue : 'personal';
    const startTime = (task.startTime || task.start_time || task['Start Time'] || '').toString();
    const endTime = (task.endTime || task.end_time || task['End Time'] || '').toString();

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return null;
    }

    // Validate that end time is after start time
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    if (end <= start) {
      return null;
    }

    return {
      title,
      description,
      category,
      startTime,
      endTime
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setParsedTasks([]);

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'csv') {
        // Handle CSV files
        const text = await file.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validTasks: ImportTask[] = [];
            results.data.forEach((row: unknown) => {
              const task = validateTask(row as Record<string, unknown>);
              if (task) {
                validTasks.push(task);
              }
            });
            setParsedTasks(validTasks);
            if (validTasks.length === 0) {
              setError(t('import.no_valid_tasks'));
            }
            setIsLoading(false);
          },
          error: () => {
            setError(t('import.file_parse_error'));
            setIsLoading(false);
          }
        });
      } else if (['xlsx', 'xls'].includes(fileExtension || '')) {
        // Handle Excel files
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const validTasks: ImportTask[] = [];
        jsonData.forEach((row: unknown) => {
          const task = validateTask(row as Record<string, unknown>);
          if (task) {
            validTasks.push(task);
          }
        });

        setParsedTasks(validTasks);
        if (validTasks.length === 0) {
          setError(t('import.no_valid_tasks'));
        }
      } else {
        setError(t('import.unsupported_file_type'));
      }
    } catch {
      setError(t('import.file_parse_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextImport = () => {
    if (!bulkText.trim()) {
      setError(t('import.empty_text'));
      return;
    }

    setIsLoading(true);
    setError('');
    setParsedTasks([]);

    try {
      const lines = bulkText.trim().split('\n');
      const validTasks: ImportTask[] = [];

      lines.forEach((line) => {
        if (!line.trim()) return;

        // Expected format: Title | Description | Category | Start Time | End Time
        // Or: Title | Category | Start Time | End Time (without description)
        const parts = line.split('|').map(part => part.trim());
        
        if (parts.length >= 4) {
          const task: Record<string, string> = {};
          
          if (parts.length === 4) {
            // Without description
            [task.title, task.category, task.startTime, task.endTime] = parts;
          } else if (parts.length >= 5) {
            // With description
            [task.title, task.description, task.category, task.startTime, task.endTime] = parts;
          }

          const validTask = validateTask(task);
          if (validTask) {
            validTasks.push(validTask);
          }
        }
      });

      setParsedTasks(validTasks);
      if (validTasks.length === 0) {
        setError(t('import.no_valid_tasks'));
      }
    } catch {
      setError(t('import.text_parse_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportTasks = () => {
    if (parsedTasks.length === 0) return;

    parsedTasks.forEach(task => {
      addTask(task);
    });

    // Show success message and close
    alert(t('import.success_message', { count: parsedTasks.length }));
    setParsedTasks([]);
    onClose();
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        title: 'Sample Task 1',
        description: 'This is a sample task description',
        category: 'work',
        startTime: '09:00',
        endTime: '10:00'
      },
      {
        title: 'Sample Task 2',
        description: 'Another sample task',
        category: 'personal',
        startTime: '14:00',
        endTime: '15:30'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'task_template.xlsx');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" dir={dir}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              📥 {t('import.bulk_task_import')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('file')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'file'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📄 {t('import.file_upload')}
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'text'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 {t('import.text_input')}
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'template'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 {t('import.template')}
            </button>
          </div>

          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                <p className="mb-2">{t('import.file_upload_instructions')}</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>{t('import.supported_formats')}: Excel (.xlsx, .xls), CSV (.csv)</li>
                  <li>{t('import.required_columns')}: title, startTime, endTime</li>
                  <li>{t('import.optional_columns')}: description, category</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? t('import.processing') : t('import.choose_file')}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  {t('import.drag_drop_hint')}
                </p>
              </div>
            </div>
          )}

          {/* Text Input Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                <p className="mb-2">{t('import.text_format_instructions')}</p>
                <p className="text-xs font-mono bg-gray-100 p-2 rounded">
                  {t('import.text_format_example')}
                </p>
              </div>

              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder={t('import.text_placeholder')}
                dir={dir}
              />

              <button
                onClick={handleTextImport}
                disabled={isLoading || !bulkText.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? t('import.processing') : t('import.parse_text')}
              </button>
            </div>
          )}

          {/* Template Tab */}
          {activeTab === 'template' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="mb-4">{t('import.template_instructions')}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">{t('import.column_descriptions')}:</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>title</strong>: {t('import.column_title_desc')}</li>
                    <li><strong>description</strong>: {t('import.column_description_desc')}</li>
                    <li><strong>category</strong>: {categories.join(', ')}</li>
                    <li><strong>startTime/endTime</strong>: {t('import.column_time_desc')}</li>
                  </ul>
                </div>

                <button
                  onClick={downloadTemplate}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  📥 {t('import.download_template')}
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Parsed Tasks Preview */}
          {parsedTasks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                {t('import.preview_title')} ({parsedTasks.length} {t('import.tasks_found')})
              </h3>
              
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">{t('task.form.title')}</th>
                      <th className="px-3 py-2 text-left">{t('task.form.category')}</th>
                      <th className="px-3 py-2 text-left">{t('task.form.start_time')}</th>
                      <th className="px-3 py-2 text-left">{t('task.form.end_time')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedTasks.map((task, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-3 py-2">{task.title}</td>
                        <td className="px-3 py-2">{t(`category.${task.category}`)}</td>
                        <td className="px-3 py-2">{task.startTime}</td>
                        <td className="px-3 py-2">{task.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setParsedTasks([])}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('import.clear')}
                </button>
                <button
                  onClick={handleImportTasks}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✅ {t('import.import_tasks')} ({parsedTasks.length})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
