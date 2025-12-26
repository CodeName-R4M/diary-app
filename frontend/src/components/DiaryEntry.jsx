import { useState } from 'react';
import { deleteDiaryEntry } from '../api';
import './DiaryEntry.css';

function DiaryEntry({ entry, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this diary entry?')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteDiaryEntry(entry.id);
      onDeleted();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry. Please try again.');
      setDeleting(false);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  return (
    <div className="diary-entry">
      <div className="entry-header">
        <div className="entry-date">
          📅 {formatDate(entry.createdAt)}
        </div>
        <button 
          onClick={handleDelete} 
          disabled={deleting}
          className="delete-btn"
          title="Delete entry"
        >
          {deleting ? '⏳' : '🗑️'}
        </button>
      </div>

      {entry.title && (
        <h3 className="entry-title">{entry.title}</h3>
      )}

      {entry.imageUrl && (
        <div className="entry-image">
          <img 
            src={`${API_URL}${entry.imageUrl}`} 
            alt="Diary entry" 
          />
        </div>
      )}

      <div className="entry-content">
        {entry.content}
      </div>

      <div className="entry-footer">
        <span className="entry-time">
          Last updated: {formatDate(entry.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export default DiaryEntry;

