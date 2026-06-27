import React, { useState } from "react";

function WriterAdd() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    Enname: "",
    bio: "", 
  });
  const [image, setImage] = useState(null);
  const [loading,setLoding]= useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("writerImage", image);
    }
    setLoding(true)
    try {
      const response = await fetch(`${API_URL}/zed/writers`, {
        method: "POST",
        body: data,
      });
      

      if (!response.ok) {
        throw new Error("Failed to add writer");
      }

      const result = await response.json();
      alert("✅ লেখক সফলভাবে যোগ হয়েছে!");

      setFormData({ name: "", Enname: "", bio: "" });
      setImage(null);
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
    finally{
      setLoding(false)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md space-y-4 mt-8">
      <h2 className="text-lg sm:text-xl font-bold text-center text-green-700">
        ✍️ নতুন লেখক যুক্ত করুন
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="লেখকের নাম"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="text"
          name="Enname"
          placeholder="লেখকের ইংরেজি নাম"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.Enname}
          required
        />
        <textarea
          name="bio" 
          placeholder="লেখকের বিবরণ"
          className="w-full border p-2 rounded h-28"
          onChange={handleChange}
          value={formData.bio}
          required
        ></textarea>

        <div>
          <p className="font-semibold mb-1">📷 Upload Writer Image</p>
          <label htmlFor="writerImage" className="cursor-pointer block">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://via.placeholder.com/200x250?text=Upload+Image"
              }
              alt="upload"
              className="w-full h-64 object-cover rounded border"
            />
          </label>
          <input
            type="file"
            id="writerImage"
            name="writerImage"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding Writer..." : " ➕ Add Writer"}
        </button>
      </form>
    </div>
  );
}

export default WriterAdd;
