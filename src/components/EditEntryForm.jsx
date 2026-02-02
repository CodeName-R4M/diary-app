import { useState } from 'react';
import { updateDiaryEntry, deleteDiaryEntry } from '../api';
import './NewEntryForm.css';

function EditEntryForm({ entry, onClose, onEntryUpdated, onDeleted }) {
  const [title, setTitle] = useState(entry.title || '');
  const [content, setContent] = useState(entry.content || '');
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [removingExisting, setRemovingExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // If user selects a new image, cancel removing existing
      setRemovingExisting(false);
    }
  };

  const handleRemoveExisting = () => {
    if (newImage) {
      setNewImage(null);
      setNewImagePreview(null);
      return;
    }
    setRemovingExisting(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Please write something in your diary!');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title);
      if (newImage) {
        formData.append('image', newImage);
      }
      if (removingExisting) {
        formData.append('deleteImage', 'true');
      }

      await updateDiaryEntry(entry.id, formData);
      onEntryUpdated();
      onClose();
    } catch (err) {
      console.error('[EditEntryForm] Update failed:', err);
      alert('Failed to update entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this diary entry?')) return;
    setDeleting(true);
    try {
      await deleteDiaryEntry(entry.id);
      onDeleted();
      onClose();
    } catch (err) {
      console.error('[EditEntryForm] Delete failed:', err);
      alert('Failed to delete entry.');
    } finally {
      setDeleting(false);
    }
  };

  const currentImageUrl = entry.imageUrl;

  return (
    <div className="new-entry-overlay">
      <div className="new-entry-form">
        <div className="form-header">
          <h2>Edit Entry</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title (Optional)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your day a title..."
              className="title-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">What happened today? *</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-textarea"
              rows="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />

            {newImagePreview && (
              <div className="image-preview">
                <img src={newImagePreview} alt="Preview" />
                <button type="button" onClick={() => { setNewImage(null); setNewImagePreview(null); }} className="remove-image-btn">Remove</button>
              </div>
            )}

            {!newImagePreview && currentImageUrl && !removingExisting && (
              <div className="image-preview">
                <img src={currentImageUrl} alt="Current" />
                <button type="button" onClick={handleRemoveExisting} className="remove-image-btn">Remove</button>
              </div>
            )}

            {removingExisting && (
              <div className="image-preview">
                <p>Existing image will be removed.</p>
                <button type="button" onClick={() => setRemovingExisting(false)} className="remove-image-btn">Undo</button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" disabled={submitting} className="submit-btn">{submitting ? 'Saving...' : '💾 Save Changes'}</button>
          </div>

          <hr />

          <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
            <button type="button" onClick={handleDelete} disabled={deleting} className="cancel-btn" style={{ background: '#ff6b6b' }}>{deleting ? 'Deleting...' : '🗑️ Delete Entry'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEntryForm;
