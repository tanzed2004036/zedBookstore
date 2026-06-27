import React, { useEffect, useState } from "react";
import axios from "axios";

const BookRequestList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); 

  // fetch all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/zed/requests`);
        setRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };

    fetchRequests();
  }, []);

  // delete request by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/zed/requests/${id}`);
      setRequests(requests.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Failed to delete request", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        All Book Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-center max-w-[200px] break-words">
                  Book Title
                </th>
                <th className="py-2 px-3 text-center">Author</th>
                <th className="py-2 px-3 text-center">Message</th>
                <th className="py-2 px-3 text-center">Submitted</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRequest(req)}
                >
                  <td className="py-2 px-3 max-w-[200px] break-words text-center">
                    {req.bookTitle}
                  </td>
                  <td className="py-2 px-3 text-center">{req.author}</td>
                  <td className="py-2 px-3 text-center">{req.message}</td>
                  <td className="py-2 px-3 text-sm text-gray-500 text-center">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="py-2 px-3 text-center"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto break-words relative">

            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold pr-2"
            >
              X
            </button>

            <h2 className="text-xl font-semibold text-green-700 mb-3">
              {selectedRequest.bookTitle}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Author:</span>{" "}
              {selectedRequest.author || "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Message:</span>{" "}
              {selectedRequest.message || "—"}
            </p>
            <p className="text-sm text-gray-500">
              Submitted: {new Date(selectedRequest.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRequestList;
