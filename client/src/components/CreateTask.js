import React from 'react'

const CreateTask = () => {
  return (
    <div>
        <form>
        <input type="text" placeholder='Task name...' name='task' />

        <select
              name="taskColor"
              type="text"
            >
              <option value="Yellow">Yellow</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Green">Green</option>
            </select>

            <textarea name="task" rows="4" cols="50" placeholder="Add description..."></textarea>

            <select
              name="taskColor"
              type="text"
            >
              <option value="">Assigned to...</option>
              <option value="Ashley">Ashley</option>
              <option value="Ed">Ed</option>
              <option value="Heather">Heather</option>
              <option value="Keith">Keith</option>
              <option value="Scott">Scott</option>
            </select>
            <label>Due Date:</label>
            <input type="date" name='date' />

            <input type="submit" value={'Save & Close'} />
        </form>
    </div>
  )
}

export default CreateTask