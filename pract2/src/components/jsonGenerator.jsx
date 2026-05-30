import React, { useState } from 'react';

const JsonGenerator = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateAndDownload = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_data.json';
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.card}>
      <h3 style={{ color: 'palevioletred', marginTop: 0 }}>Рівень 2: Генератор JSON</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input type="text" name="title" placeholder="Назва книги/проекту" value={formData.title} onChange={handleChange} style={styles.input} />
        <input type="text" name="author" placeholder="Автор" value={formData.author} onChange={handleChange} style={styles.input} />
        <input type="number" name="year" placeholder="Рік" value={formData.year} onChange={handleChange} style={styles.input} />
        
        <button onClick={handleGenerateAndDownload} style={styles.button}>
          Згенерувати та завантажити JSON
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: { border: '1px solid palevioletred', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: 'lavenderblush', color: 'maroon' },
  input: { padding: '8px', border: '1px solid rosybrown', borderRadius: '4px', color: 'maroon' },
  button: { padding: '10px', cursor: 'pointer', backgroundColor: 'hotpink', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }
};

export default JsonGenerator;