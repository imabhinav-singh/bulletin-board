import React, { useEffect, useRef } from 'react';
import pinSvg from './icons/pin-svgrepo-com.svg';
import pinnedSvg from './icons/pin-fill-svgrepo-com.svg';
import crossSvg from './icons/xmark-solid.svg';
import saveSvg from './icons/check-circle-svgrepo-com.svg';

const Note = ({
    id,
    text,
    x,
    y,
    isEditing,
    isPinned,
    handleNoteTextChange,
    saveNoteTextChange,
    handleEditNote,
    handleDeleteNote,
    handleTogglePin
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isEditing) {
            ref.current.innerText = text;
        }
    }, [isEditing]);
    return (
        <div
            key={id}
            className={`note ${isPinned ? 'pinned unselectable' : ''}`}
            style={{ top: y, left: x, cursor: isEditing ? 'text' : 'move' }}
            draggable={!isPinned}
            onDragStart={(e) => {
                if (isPinned) return false;
                e.dataTransfer.setData('text/plain', JSON.stringify({ id: id, x: e.clientX, y: e.clientY }));
            }}
        >
            {isEditing ? (
                <div className='note-edit'>
                    <div ref={ref} className="text-input" contentEditable="true" onInput={(e) => handleNoteTextChange(id, e.target.innerText)} />
                    <span className="save" onClick={() => saveNoteTextChange(id)}>
                        <img alt='save' src={saveSvg} height="25px" width="25px" />
                    </span>
                </div>
            ) : (
                <>
                    <div className='text' onClick={() => handleEditNote(id)}>{text}</div>
                    <span className="delete" onClick={() => handleDeleteNote(id)}>
                        <img alt='delete' src={crossSvg} />
                    </span>
                    <span className="pin" onClick={() => handleTogglePin(id)}>
                        {isPinned ?
                            <img alt='pinned' src={pinnedSvg} height="16px" width="16px" /> :
                            <img alt='pin' src={pinSvg} height="16px" width="16px" />
                        }
                    </span>
                </>
            )}
        </div>
    )
};

export default Note;