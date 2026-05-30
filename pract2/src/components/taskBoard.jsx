import React, { useState } from 'react';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Вивчити React', tags: ['навчання', 'react'], createdAt: Date.now() - 10000 },
    { id: 2, text: 'Зробити ДЗ з ВМПтФ', tags: ['хнуре', 'ВМПтФ'], createdAt: Date.now() },
  ]);
  
  const [newTaskText, setNewTaskText] = useState('');
  const [newTags, setNewTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const tagsArray = newTags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag);
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      tags: tagsArray.length > 0 ? tagsArray : ['без тегу'],
      createdAt: Date.now(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTags('');
  };

  const allTags = [...new Set(tasks.flatMap(task => task.tags))];

  let processedTasks = [...tasks];

  if (searchQuery) {
    processedTasks = processedTasks.filter(task => 
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filterTag) {
    processedTasks = processedTasks.filter(task => task.tags.includes(filterTag));
  }

  processedTasks.sort((a, b) => {
    if (sortBy === 'newest') return b.createdAt - a.createdAt;
    if (sortBy === 'oldest') return a.createdAt - b.createdAt;
    if (sortBy === 'alphabetical') return a.text.localeCompare(b.text);
    return 0;
  });

  return (
    <div style={styles.card}>
      <h3 style={{ color: 'palevioletred', marginTop: 0 }}>Рівні 3 та 4: Інтерактивна дошка завдань</h3>

      <form onSubmit={handleAddTask} style={styles.formGroup}>
        <input 
          type="text" placeholder="Що потрібно зробити?" 
          value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} style={styles.input}
        />
        <input 
          type="text" placeholder="Теги (через кому)" 
          value={newTags} onChange={(e) => setNewTags(e.target.value)} style={styles.input}
        />
        <button type="submit" style={styles.buttonAdd}>Додати завдання</button>
      </form>

      <div style={styles.toolbar}>
        <input 
          type="text" placeholder="Пошук завдань..." 
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.input}
        />
        
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} style={styles.input}>
          <option value="">Всі теги (Фільтр)</option>
          {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.input}>
          <option value="newest">Спочатку нові (Сортування)</option>
          <option value="oldest">Спочатку старі</option>
          <option value="alphabetical">За алфавітом</option>
        </select>
      </div>

      <div style={styles.board}>
        {processedTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rosybrown' }}>Завдань не знайдено.</p>
        ) : (
          processedTasks.map(task => (
            <div key={task.id} style={styles.taskItem}>
              <strong>{task.text}</strong>
              <div style={styles.tagContainer}>
                {task.tags.map(tag => (
                  <span key={tag} style={styles.tag}>#{tag}</span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  card: { border: '1px solid palevioletred', padding: '20px', borderRadius: '8px', backgroundColor: 'seashell', color: 'maroon' },
  formGroup: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  toolbar: { display: 'flex', gap: '10px', padding: '15px', backgroundColor: 'lavenderblush', borderRadius: '8px', marginBottom: '20px', flexWrap: 'wrap', border: '1px solid lightpink' },
  input: { padding: '8px', border: '1px solid rosybrown', borderRadius: '4px', flex: 1, minWidth: '150px', color: 'maroon' },
  buttonAdd: { padding: '8px 15px', backgroundColor: 'hotpink', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  board: { display: 'flex', flexDirection: 'column', gap: '10px' },
  taskItem: { padding: '15px', border: '1px solid lightpink', borderLeft: '5px solid hotpink', borderRadius: '4px', backgroundColor: 'white' },
  tagContainer: { display: 'flex', gap: '5px', marginTop: '10px', flexWrap: 'wrap' },
  tag: { fontSize: '12px', backgroundColor: 'lightpink', padding: '4px 10px', borderRadius: '12px', color: 'maroon', fontWeight: 'bold' }
};

export default TaskBoard;