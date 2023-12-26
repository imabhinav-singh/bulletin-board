import React, { useEffect, useRef, useState } from 'react';
import Note from './Note';
import './BulletinBoard.css';

const BulletinBoard = () => {
  const ref = useRef(null);

  const [notes, setNotes] = useState([
    { id: 1, text: 'Note 1', x: 10, y: 10, isEditing: false, isPinned: false },
    { id: 2, text: 'Note 2', x: 120, y: 120, isEditing: false, isPinned: false },
  ]);

  useEffect(() => {
    const body = ref.current;
    const handleDrop = e => {
      const { id, x, y } = JSON.parse(e.dataTransfer.getData('text/plain'));
      const offsetX = e.clientX - x;
      const offsetY = e.clientY - y;
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? { ...n, x: n.x + offsetX, y: n.y + offsetY } : n))
      );
    };

    const handleDragOver = e => {
      // e.dataTransfer.dropEffect = 'none';
      e.preventDefault();
    }

    body.addEventListener('drop', handleDrop);
    body.addEventListener('dragover', handleDragOver);

    return () => {
      body.removeEventListener('drop', handleDrop);
      body.removeEventListener('dragover', handleDragOver);
    }
  }, [])

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: 'New Note',
      x: 0,
      y: 0,
      isEditing: true,
      isPinned: false,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, isEditing: true };
        }
        return note;
      })
    );
  };

  const handleNoteTextChange = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, text: newText };
        }
        return note;
      })
    );
  };

  const handleTogglePin = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, isPinned: !note.isPinned };
        }
        return note;
      })
    );
  };

  const saveNoteTextChange = id => {
    console.log(notes);
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isEditing: false } : note))
  }

  return (
    <div className="bulletin-board" ref={ref}>
      {notes.map((note) =>
        <Note
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          isEditing={note.isEditing}
          isPinned={note.isPinned}
          handleNoteTextChange={handleNoteTextChange}
          saveNoteTextChange={saveNoteTextChange}
          handleEditNote={handleEditNote}
          handleDeleteNote={handleDeleteNote}
          handleTogglePin={handleTogglePin}
        />
      )}
      <button className="add-button" onClick={handleAddNote}>
        +
      </button>
    </div>
  );
};

export default BulletinBoard;
