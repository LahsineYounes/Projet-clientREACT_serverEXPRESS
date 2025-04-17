import React from 'react';

const TaskList = ({ tasks, loading, error, onDeleteTask }) => {
    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!tasks.length) return <p>Aucune tâche.</p>;

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {task.title}
                    <button onClick={() => onDeleteTask(task.id)} style={{marginLeft: 10}}>Supprimer</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;