import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        setSubmitting(true);
        try {
            await onTaskAdded({ title });
            setTitle('');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Nouvelle tâche"
            disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
            {submitting ? 'Ajout...' : 'Ajouter'}
        </button>
        </form>
    );
};

export default TaskForm;