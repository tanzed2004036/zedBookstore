import React, { useState, useRef } from "react"; 
function BookAdd() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    titleBn: "",
    titleEn: "",
    writer: "",
    category: "",
    details: "",
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


const handlePdfChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) { 
    alert("❌ PDF ফাইল সর্বোচ্চ ১০ MB হতে পারবে।");
    e.target.value = ""; 
    return;
  }
  setPdf(file);
};

  // //  Helper function — filename clean

  // const sanitizeFileName = (file) => {
  //   const ext = file.name.split(".").pop();
  //   const nameWithoutExt = file.name.split(".").slice(0, -1).join("."); 

  //   const clean =
  //     nameWithoutExt
  //       .replace(/\[.*?\]/g, "")
  //       .replace(/[^\w\u0980-\u09FF._-]/g, "_")
  //       .replace(/_+/g, "_")
  //       .replace(/^_|_$/g, "")
  //       .trim() || `file_${Date.now()}`;

  //   return new File([file], `${clean}.${ext}`, { type: file.type });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !pdf) {
      alert("❌ দয়া করে ইমেজ এবং পিডিএফ দুটো ফাইলই সিলেক্ট করুন।");
      return;
    }

    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", sanitizeFileName(image));
    data.append("pdf", sanitizeFileName(pdf));

    try {
      const response = await fetch(`${API_URL}/zed/books`, {
        method: "POST",
        body: data,
      });

      //  Read  text first 
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned non-JSON (status ${response.status}). ` +
            `Check your API_URL and server logs.\n\n` +
            text.slice(0, 200), 
        );
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      alert("✅ বই সফলভাবে যোগ করা হয়েছে!");
      setFormData({
        titleBn: "",
        titleEn: "",
        writer: "",
        category: "",
        details: "",
      });
      setImage(null);
      setPdf(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (pdfInputRef.current) pdfInputRef.current.value = "";
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold">নতুন বই যুক্ত করুন</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="titleBn"
          placeholder="বইয়ের বাংলা নাম"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.titleBn}
          required
        />
        <input
          type="text"
          name="titleEn"
          placeholder="বইয়ের ইংরেজি নাম"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.titleEn}
          required
        />
        <input
          type="text"
          name="writer"
          placeholder="লেখকের নাম"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.writer}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="ক্যাটাগরি"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.category}
          required
        />
        <textarea
          name="details"
          placeholder="বইয়ের বিবরণ"
          className="w-full border p-2 rounded h-28"
          onChange={handleChange}
          value={formData.details}
          required
        ></textarea>

        <div>
          <p className="font-semibold">📷 Upload Image</p>
          <label htmlFor="image" className="cursor-pointer block">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://via.placeholder.com/200x250?text=Upload+Cover"
              }
              alt="upload"
              className="w-full h-64 object-cover rounded border"
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            ref={imageInputRef}
            onChange={handleImageChange}
          />

          <p className="font-semibold mt-4">📄 Upload PDF</p>
          <input
            type="file"
            accept="application/pdf"
            ref={pdfInputRef}
            onChange={handlePdfChange}
            className="w-full border p-2 rounded"
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
          {loading ? "Adding Book..." : "📚 Add Book"}
        </button>
      </form>
    </div>
  );
}

export default BookAdd;
