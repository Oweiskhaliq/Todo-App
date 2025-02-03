import React from "react";
import Popup from "reactjs-popup";

const PopUpModel = ({ deleteTodo, todo_id }) => {
  return (
    <Popup
      trigger={
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
          Delete
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure? it will delete permanently.
          </h2>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {/* Confirm Delete */}
            <button
              onClick={() => {
                deleteTodo(todo_id);
                close(); // Close the popup
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>

            {/* Cancel Button */}
            <button
              onClick={close}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopUpModel;
