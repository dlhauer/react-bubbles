import React, { useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const addColor = e => {
    e.preventDefault();
    // console.log('newColor in addColor: ', newColor);
    axiosWithAuth()
      .post('/colors', newColor)
      .then( res => {
        // console.log('res from .post: ', res);
        updateColors(res.data)
      })
      .catch(err => console.log(err))

    setNewColor(initialColor);
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then( res => {
        updateColors( colors.map( color => {
          return color.id === res.data.id ? res.data : color 
      }))
      })
      .catch(err => console.log(err))

      setEditing(false);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // console.log('color.id in deleteColor', color.id);
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then( res => {
        updateColors( colors.filter( color => {
          return color.id !== res.data
        }))
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => {
            editColor(color)
            }}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <h3>Add a new color</h3>
      <form 
        className='add-color-form'
        onSubmit={addColor}
      >
        <label>
          color name:
          <input 
            type='text'
            value={newColor.color}
            onChange={ e => {
              setNewColor( {
                ...newColor,
                color: e.target.value
              })
            }}
          />
        </label>
        <label>
          hex code:
          <input 
            type='text'
            value={newColor.code.hex}
            onChange={ e => {
              setNewColor( {
                ...newColor,
                code: { hex: e.target.value }
              })
            }}
          />
        </label>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default ColorList;
