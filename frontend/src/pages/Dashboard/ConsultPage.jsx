import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderIcon, DocumentPlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function DocumentsPage() {
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const folders = [
    { id: 1, name: "Zolvit Documents" },
    { id: 2, name: "My Documents" },
    { id: 3, name: "Legal Documents" },
  ];

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
    setMsg(`${e.target.files.length} file(s) added`);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen bg-gray-50">
      
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-slate-600 mt-2">
          Select a folder to view your compliance documents, bills, and related files
        </p>
      </div>

      {/* Folder Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {folders.map((folder, i) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl hover:bg-blue-50 transition"
          >
            <FolderIcon className="w-10 h-10 text-blue-500" />
            <span className="font-medium text-gray-800">{folder.name}</span>
          </motion.div>
        ))}
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold">Upload Documents</h2>
        <p className="text-slate-600">
          Drag & drop files here or click to upload. Supported formats: PDF, DOCX, JPG, PNG
        </p>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          <ArrowUpTrayIcon className="w-12 h-12 text-blue-500 mb-2" />
          <span className="text-gray-500">Click or drag files to upload</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {msg && <div className="text-sm text-green-600">{msg}</div>}

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                <DocumentPlusIcon className="w-5 h-5 text-gray-600" />
                <span className="ml-2 flex-1 text-gray-800">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
