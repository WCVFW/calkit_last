import React, { useEffect, useState } from "react";
import { CloudUpload, Download, FileText, X, Trash2, Replace } from 'lucide-react'; 
import { docsAPI } from "../../lib/api"; 
import { getUser } from "../../lib/auth"; 

/**
 * A utility to format file size in a human-readable way.
 * @param {number} bytes - The size in bytes.
 * @returns {string} The formatted size string.
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function DocumentsPage() {
  const user = getUser();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingDocs, setLoadingDocs] = useState(false);
  // State for replacement: stores the document being replaced
  const [docToReplace, setDocToReplace] = useState(null); 

  useEffect(() => {
    fetchDocs();
  }, []);

  // --- Core API Handlers ---

  async function fetchDocs() {
    setLoadingDocs(true);
    setMessage("");
    try {
      const r = await docsAPI.listMyDocs();
      setDocs(r.data || []);
    } catch (err) {
      console.warn("Failed to fetch user documents:", err);
      const status = err?.response?.status;
      const body = err?.response?.data;
      setMessage(`Could not load documents${status ? ` (HTTP ${status})` : ''}${body ? `: ${JSON.stringify(body)}` : ''}`);
    } finally {
      setLoadingDocs(false);
    }
  }

  async function handleUpload() {
    if (!files.length) return setMessage("Please select files to upload.");
    if (!user || !user.id) return setMessage("Not authenticated. Please login.");

    setUploading(true);
    setMessage("");

    try {
      // Logic for replacing an existing document
      if (docToReplace) {
        if (files.length !== 1) {
            throw new Error("Only one file can be selected when replacing an existing document.");
        }
        
        const fileToUpload = files[0];
        const fd = new FormData();
        fd.append('file', fileToUpload);
        fd.append('ownerUserId', String(user.id));
        
        // Assuming docsAPI.replace handles the update using the document ID
        // The API would likely use docToReplace.id in its URL or body
        await docsAPI.replace(docToReplace.id, fd); 

        setMessage(`✅ Document '${docToReplace.filename}' replaced successfully!`);
        setDocToReplace(null); // Clear replacement state
      } 
      // Logic for a new batch upload
      else {
        await Promise.all(files.map(async (f) => {
          const fd = new FormData();
          fd.append('file', f);
          fd.append('ownerUserId', String(user.id));
          await docsAPI.upload(fd);
        }));

        setMessage("✅ Files uploaded successfully!");
      }

      setFiles([]);
      await fetchDocs();
    } catch (err) {
      console.error("Upload/Replace failed:", err);
      const status = err?.response?.status;
      const body = err?.response?.data;
      setMessage(`❌ Action failed${status ? ` (HTTP ${status})` : ''}${body ? `: ${JSON.stringify(body)}` : `: ${err?.message}`}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(doc) {
    if (!window.confirm(`Are you sure you want to delete the document '${doc.filename}'? This action cannot be undone.`)) {
      return;
    }
    
    setMessage("");
    try {
      await docsAPI.deleteDocument(doc.id);
      setMessage(`✅ Document '${doc.filename}' deleted successfully.`);
      await fetchDocs();
    } catch (err) {
      console.error("Delete failed:", err);
      const status = err?.response?.status;
      const body = err?.response?.data;
      setMessage(`❌ Delete failed${status ? ` (HTTP ${status})` : ''}${body ? `: ${JSON.stringify(body)}` : `: ${err?.message}`}`);
    }
  }
  
  async function handleDownload(doc) {
    try {
      setMessage(""); 
      const r = await docsAPI.downloadDocument(doc.id);
      const blob = r.data instanceof Blob ? r.data : await r.data.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.filename || 'file'; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("Failed to download document:", err);
      const status = err?.response?.status;
      const body = err?.response?.data;
      setMessage(`Could not download file${status ? ` (HTTP ${status})` : ''}${body ? `: ${JSON.stringify(body)}` : ''}`);
    }
  }

  // --- UI/State Handlers ---

  function handleSelect(e) {
    // When replacing, only allow one file
    const newFiles = Array.from(e.target.files || []);
    
    if (docToReplace) {
        if (newFiles.length > 1) {
            setMessage("Only one file is allowed when replacing a document.");
            return;
        }
        setFiles(newFiles); // Replace the array with the single file
    } else {
        // Standard merge for new upload
        const filteredFiles = newFiles.filter(newFile => 
            !files.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
        );
        setFiles((f) => [...f, ...filteredFiles]);
    }
    e.target.value = null;
  }

  function handleRemoveFile(fileToRemove) {
    setFiles(files.filter(f => f !== fileToRemove));
  }

  function initiateReplace(doc) {
    setDocToReplace(doc);
    setFiles([]); // Clear any previously selected files
    setMessage(`Ready to replace document: ${doc.filename}. Select a new file.`);
  }

  function cancelReplace() {
    setDocToReplace(null);
    setFiles([]);
    setMessage("");
  }
  
  // --- Utility for Status Message Styling ---
  const getMessageStyles = (msg) => {
    if (msg.startsWith('✅')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (msg.startsWith('❌') || msg.toLowerCase().includes('failed') || msg.toLowerCase().includes('could not')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };
  // ------------------------------------------

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold text-gray-900">
          <FileText className="w-8 h-8 text-indigo-600" />
          Document Center
        </h1>
        <p className="mt-2 text-gray-500 text-md">
          Securely manage your uploaded certificates and supporting files.
        </p>

        {/* Status Message Display */}
        {message && (
          <div className={`mt-4 p-3 text-sm rounded-lg border ${getMessageStyles(message)}`} role="alert">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
          
          {/* Upload/Replace Panel */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
              <h2 className="pb-3 mb-4 text-xl font-semibold text-gray-800 border-b">
                {docToReplace ? (
                  <span className="flex items-center text-orange-500">
                    <Replace className="inline w-5 h-5 mr-2" /> Replace Document
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CloudUpload className="inline w-5 h-5 mr-2 text-indigo-500" /> New Upload
                  </span>
                )}
              </h2>

              {docToReplace && (
                <div className="p-3 mb-4 text-sm border border-orange-200 rounded-lg bg-orange-50">
                    **Replacing:** {docToReplace.filename}
                    <button onClick={cancelReplace} className="ml-3 font-medium text-orange-600 hover:text-orange-800">
                        (Cancel)
                    </button>
                </div>
              )}

              {/* File Input */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 transition duration-150 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to select file(s)</span> or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, JPG, PNG, up to 10MB each</p>
                  </div>
                  <input id="file-upload" type="file" multiple={!docToReplace} onChange={handleSelect} className="hidden" />
                </label>
              </div>


              {/* Files List */}
              {files.length > 0 && (
                <div className="mt-6">
                  <div className="mb-2 text-sm font-medium text-gray-700">Selected File(s) ({files.length})</div>
                  <ul className="pr-2 space-y-2 overflow-auto max-h-40">
                    {files.map((f, i) => (
                      <li key={i} className="flex items-center justify-between p-2 text-sm border border-indigo-200 rounded bg-indigo-50">
                        <span className="flex-1 font-medium text-gray-800 truncate">{f.name}</span>
                        <div className="flex items-center gap-2 ml-4 text-xs text-indigo-600">
                          <span className="text-gray-500">{formatFileSize(f.size)}</span>
                          <button 
                            onClick={() => handleRemoveFile(f)} 
                            className="p-1 text-red-500 transition rounded-full hover:text-red-700 hover:bg-white"
                            title="Remove file"
                            disabled={uploading}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpload}
                  disabled={uploading || files.length === 0}
                  className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition duration-150 ease-in-out ${
                    uploading || files.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {uploading ? (
                    <>
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {docToReplace ? 'Replacing...' : 'Uploading...'}
                    </>
                  ) : (
                    docToReplace ? `Replace with ${files.length} File` : `Upload ${files.length} File(s)`
                  )}
                </button>
                <button
                  onClick={docToReplace ? cancelReplace : () => setFiles([])}
                  disabled={uploading || files.length === 0}
                  className="px-4 py-2 text-gray-700 transition bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  {docToReplace ? 'Cancel' : 'Clear'}
                </button>
              </div>
            </div>
          </div>

          {/* Documents List Panel */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Your Documents</h2>
                <div className="text-sm font-medium text-indigo-600">
                  {loadingDocs ? 'Loading Documents...' : `${docs.length} Documents`}
                </div>
              </div>

              {loadingDocs && (
                <div className="py-8 text-center text-gray-500">
                  {/* Loading spinner SVG */}
                  <p className="mt-2 text-sm">Fetching your documents...</p>
                </div>
              )}

              {!loadingDocs && docs.length === 0 ? (
                <div className="py-10 text-center border border-gray-200 border-dashed rounded-lg bg-gray-50">
                  <FileText className="w-10 h-10 mx-auto text-gray-400" />
                  <p className="mt-3 text-sm font-medium text-gray-500">You haven't uploaded any documents yet.</p>
                  <p className="mt-1 text-xs text-gray-400">Use the panel on the left to get started.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {docs.map((d) => (
                    <li key={d.id} className="flex items-center justify-between p-4 transition duration-150 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
                      
                      <div className="flex items-center min-w-0 gap-4">
                        <FileText className="flex-shrink-0 w-6 h-6 text-indigo-500" />
                        
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-800 truncate" title={d.filename}>{d.filename}</div>
                          <div className="text-xs text-gray-500 mt-0.5 space-x-2">
                            <span>{d.contentType || 'Unknown Type'}</span>
                            <span className="text-gray-300">|</span>
                            <span>{d.sizeBytes ? formatFileSize(d.sizeBytes) : '—'}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-500">Uploaded: {new Date(d.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center flex-shrink-0 ml-4 space-x-2">
                        {/* Replace Button */}
                        <button
                          onClick={() => initiateReplace(d)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-orange-600 transition duration-150 bg-orange-100 rounded-lg hover:bg-orange-200"
                          title="Replace Document"
                        >
                          <Replace className="w-4 h-4" />
                        </button>

                        {/* Download Button */}
                        <button
                          onClick={() => handleDownload(d)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-white transition duration-150 bg-green-600 rounded-lg shadow-md hover:bg-green-700"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(d)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-red-600 transition duration-150 bg-red-100 rounded-lg hover:bg-red-200"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="pt-4 mt-8 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">
            By uploading documents you confirm you have the right to share them with our platform. 
            Sensitive information will be handled in accordance with our <a href="#" className="text-indigo-600 hover:underline">privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}