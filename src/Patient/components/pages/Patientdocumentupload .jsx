// import { useState, useRef, useCallback, useEffect } from "react";
// import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
// import { ref as dbRef, push, set, onValue, remove } from "firebase/database";
// import { storage, database } from "../../config/Firebase/firebase.config"; // ← adjust path to your firebase.js
// import { useAuth } from "../../AuthContext";

// // ─── Styles ────────────────────────────────────────────────────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

//   :root {
//     --teal: #1a8a8a;
//     --teal-dark: #0d5f5f;
//     --teal-light: #e8f5f5;
//     --navy: #1b2c4e;
//     --accent: #f0a500;
//     --success: #2ecc71;
//     --danger: #e74c3c;
//     --gray: #f4f7fa;
//     --border: #dde4ec;
//     --text: #2d3748;
//     --muted: #8898aa;
//   }

//   * { box-sizing: border-box; margin: 0; padding: 0; }

//   .pdu-wrap {
//     font-family: 'DM Sans', sans-serif;
//     color: var(--text);
//     min-height: 100vh;
//     background: linear-gradient(135deg, #f0f9f9 0%, #eaf3fb 100%);
//     padding: 32px 16px;
//   }

//   .pdu-card {
//     max-width: 820px;
//     margin: 0 auto;
//     background: #fff;
//     border-radius: 20px;
//     box-shadow: 0 8px 40px rgba(26,138,138,0.10), 0 2px 8px rgba(0,0,0,0.04);
//     overflow: hidden;
//   }

//   .pdu-header {
//     background: linear-gradient(135deg, var(--navy) 0%, var(--teal-dark) 100%);
//     padding: 28px 36px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//   }

//   .pdu-header-icon {
//     width: 52px; height: 52px;
//     background: rgba(255,255,255,0.15);
//     border-radius: 14px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 26px;
//   }

//   .pdu-header h2 {
//     font-family: 'Sora', sans-serif;
//     color: #fff;
//     font-size: 1.45rem;
//     font-weight: 700;
//   }

//   .pdu-header p { color: rgba(255,255,255,0.70); font-size: 0.875rem; margin-top: 3px; }

//   .pdu-body { padding: 32px 36px; }

//   .drop-zone {
//     border: 2.5px dashed var(--teal);
//     border-radius: 16px;
//     background: var(--teal-light);
//     padding: 44px 24px;
//     text-align: center;
//     cursor: pointer;
//     transition: all 0.22s ease;
//   }

//   .drop-zone.drag-over { border-color: var(--accent); background: #fff8e6; transform: scale(1.01); }
//   .drop-zone:hover { background: #ddf0f0; }
//   .drop-icon { font-size: 48px; margin-bottom: 12px; display: block; }

//   .drop-zone h3 { font-family: 'Sora', sans-serif; font-size: 1.1rem; color: var(--navy); margin-bottom: 6px; }
//   .drop-zone p { color: var(--muted); font-size: 0.875rem; }

//   .browse-btn {
//     display: inline-block; margin-top: 14px; padding: 9px 22px;
//     background: var(--teal); color: #fff; border-radius: 8px;
//     font-size: 0.875rem; font-weight: 600; border: none; pointer-events: none;
//   }

//   .allowed-formats { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 16px; }
//   .fmt-tag { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 3px 12px; font-size: 0.78rem; color: var(--teal-dark); font-weight: 500; }

//   .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
//   @media (max-width: 540px) { .meta-grid { grid-template-columns: 1fr; } }

//   .field-group { display: flex; flex-direction: column; gap: 6px; }
//   .field-group.full { grid-column: 1 / -1; }
//   .field-group label { font-size: 0.82rem; font-weight: 600; color: var(--navy); text-transform: uppercase; letter-spacing: 0.4px; }

//   .field-group select,
//   .field-group textarea,
//   .field-group input[type="text"] {
//     padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 10px;
//     font-size: 0.92rem; font-family: 'DM Sans', sans-serif; color: var(--text);
//     background: var(--gray); outline: none; transition: border 0.18s, box-shadow 0.18s;
//   }

//   .field-group select:focus,
//   .field-group textarea:focus,
//   .field-group input[type="text"]:focus {
//     border-color: var(--teal); background: #fff; box-shadow: 0 0 0 3px rgba(26,138,138,0.10);
//   }

//   .field-group textarea { resize: vertical; min-height: 80px; }

//   .file-queue { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }

//   .file-item {
//     display: flex; align-items: center; gap: 14px; padding: 12px 16px;
//     background: var(--gray); border-radius: 12px; border: 1.5px solid var(--border);
//   }

//   .file-thumb { width: 44px; height: 44px; border-radius: 10px; background: var(--teal-light); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
//   .file-info { flex: 1; min-width: 0; }
//   .file-name { font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .file-size { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
//   .file-remove { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 18px; }
//   .file-remove:hover { color: var(--danger); }

//   .file-status { font-size: 0.78rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; flex-shrink: 0; }
//   .status-pending { background: #fff3cd; color: #856404; }
//   .status-uploading { background: #cfe2ff; color: #0a58ca; }
//   .status-success { background: #d1e7dd; color: #0a5c36; }
//   .status-error { background: #f8d7da; color: #842029; }

//   .progress-bar-wrap { height: 4px; background: var(--border); border-radius: 4px; margin-top: 5px; }
//   .progress-bar-fill { height: 100%; background: var(--teal); border-radius: 4px; transition: width 0.3s ease; }

//   .upload-btn {
//     margin-top: 28px; width: 100%; padding: 14px;
//     background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%);
//     color: #fff; font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700;
//     border: none; border-radius: 12px; cursor: pointer;
//     transition: opacity 0.18s, transform 0.18s;
//     display: flex; align-items: center; justify-content: center; gap: 10px;
//   }

//   .upload-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
//   .upload-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

//   .share-toggle {
//     display: flex; align-items: center; gap: 8px; font-size: 0.82rem;
//     margin-top: 24px; background: var(--gray); border-radius: 12px; padding: 12px 16px;
//   }

//   .toggle-switch { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
//   .toggle-switch input { display: none; }
//   .toggle-slider { position: absolute; inset: 0; background: var(--border); border-radius: 20px; cursor: pointer; transition: background 0.2s; }
//   .toggle-slider::before { content: ''; position: absolute; width: 16px; height: 16px; left: 3px; top: 3px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
//   .toggle-switch input:checked + .toggle-slider { background: var(--teal); }
//   .toggle-switch input:checked + .toggle-slider::before { transform: translateX(18px); }

//   .section-title {
//     font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: var(--navy);
//     margin: 32px 0 14px; display: flex; align-items: center; gap: 8px;
//   }

//   .section-title span { background: var(--teal); color: #fff; border-radius: 20px; padding: 2px 10px; font-size: 0.78rem; font-weight: 600; }

//   .record-list { display: flex; flex-direction: column; gap: 10px; }

//   .record-item {
//     display: flex; align-items: center; gap: 14px; padding: 14px 16px;
//     border: 1.5px solid var(--border); border-radius: 14px; background: #fff;
//     transition: box-shadow 0.18s, border 0.18s;
//   }

//   .record-item:hover { box-shadow: 0 4px 16px rgba(26,138,138,0.09); border-color: var(--teal); }

//   .record-thumb { width: 48px; height: 48px; border-radius: 12px; background: var(--teal-light); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
//   .record-info { flex: 1; min-width: 0; }
//   .record-name { font-weight: 600; font-size: 0.92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .record-meta { font-size: 0.78rem; color: var(--muted); margin-top: 3px; }
//   .record-badge { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: var(--teal-light); color: var(--teal-dark); flex-shrink: 0; }
//   .record-actions { display: flex; gap: 8px; align-items: center; }

//   .icon-btn {
//     width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid var(--border);
//     background: #fff; cursor: pointer; font-size: 16px;
//     display: flex; align-items: center; justify-content: center; transition: all 0.15s;
//   }

//   .icon-btn:hover { border-color: var(--teal); background: var(--teal-light); }

//   .toast {
//     position: fixed; bottom: 28px; right: 28px; padding: 14px 22px;
//     border-radius: 12px; font-weight: 600; font-size: 0.9rem;
//     box-shadow: 0 6px 24px rgba(0,0,0,0.14); z-index: 9999;
//     animation: slideUp 0.3s ease;
//   }

//   .toast-success { background: var(--success); color: #fff; }
//   .toast-error { background: var(--danger); color: #fff; }

//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   .loading-state { text-align: center; padding: 32px; color: var(--muted); }
// `;

// // ─── Helpers ───────────────────────────────────────────────────────────────
// const FILE_ICONS = {
//   pdf: "📄", jpg: "🖼️", jpeg: "🖼️", png: "🖼️", gif: "🖼️",
//   doc: "📝", docx: "📝", xls: "📊", xlsx: "📊",
//   mp4: "🎥", mp3: "🎵", zip: "🗜️", default: "📎"
// };

// function getIcon(filename) {
//   const ext = filename?.split(".").pop().toLowerCase();
//   return FILE_ICONS[ext] || FILE_ICONS.default;
// }

// function formatSize(bytes) {
//   if (bytes < 1024) return `${bytes} B`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//   return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
// }

// function formatDate(iso) {
//   return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// }

// // ─── Component ─────────────────────────────────────────────────────────────
// export default function PatientDocumentUpload() {
//   const { user } = useAuth();
//   const patientId = user?.uid;

//   const [files, setFiles]           = useState([]);
//   const [category, setCategory]     = useState("General");
//   const [notes, setNotes]           = useState("");
//   const [recordDate, setRecordDate] = useState("");
//   const [doctorAccess, setDoctorAccess] = useState(true);
//   const [progress, setProgress]     = useState({});
//   const [statuses, setStatuses]     = useState({});
//   const [records, setRecords]       = useState([]);
//   const [dragOver, setDragOver]     = useState(false);
//   const [uploading, setUploading]   = useState(false);
//   const [loadingRecords, setLoadingRecords] = useState(true);
//   const [toast, setToast]           = useState(null);
//   const inputRef = useRef();

//   // ── Load patient's documents from Firebase on mount ──
//   useEffect(() => {
//     if (!patientId) return;
//     const docsRef = dbRef(database, `users/${patientId}/documents`);
//     const unsub = onValue(docsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
//         setRecords(list.reverse()); // newest first
//       } else {
//         setRecords([]);
//       }
//       setLoadingRecords(false);
//     });
//     return () => unsub();
//   }, [patientId]);

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3500);
//   };

//   const addFiles = useCallback((newFiles) => {
//     const arr = Array.from(newFiles);
//     setFiles(prev => [...prev, ...arr]);
//     const init = {};
//     arr.forEach(f => { init[f.name + f.size] = "pending"; });
//     setStatuses(prev => ({ ...prev, ...init }));
//   }, []);

//   const removeFile = (key) => {
//     setFiles(prev => prev.filter(f => (f.name + f.size) !== key));
//     setStatuses(prev => { const c = { ...prev }; delete c[key]; return c; });
//     setProgress(prev => { const c = { ...prev }; delete c[key]; return c; });
//   };

//   const handleDrop = (e) => {
//     e.preventDefault(); setDragOver(false);
//     addFiles(e.dataTransfer.files);
//   };

//   // ── Upload a single file to Firebase Storage + save metadata to RTDB ──
//   const uploadFileToFirebase = (file, meta) => {
//     return new Promise((resolve, reject) => {
//       const key = file.name + file.size;

//       // Save file under: patientDocuments/{patientId}/{filename}
//       const fileRef = storageRef(storage, `patientDocuments/${patientId}/${Date.now()}_${file.name}`);
//       const uploadTask = uploadBytesResumable(fileRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           setProgress(prev => ({ ...prev, [key]: pct }));
//         },
//         (error) => {
//           console.error("Upload error:", error);
//           reject(error);
//         },
//         async () => {
//           // Get the download URL after upload completes
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//           // Save document metadata to Realtime Database
//           const docMetadata = {
//             filename: file.name,
//             size: file.size,
//             fileType: file.type,
//             category: meta.category,
//             notes: meta.notes,
//             recordDate: meta.recordDate,
//             doctorAccess: meta.doctorAccess,
//             uploadedAt: new Date().toISOString(),
//             downloadURL,
//             storagePath: uploadTask.snapshot.ref.fullPath,
//           };

//           // Push under: users/{patientId}/documents/{autoId}
//           const docsRef = dbRef(database, `users/${patientId}/documents`);
//           const newDocRef = push(docsRef);
//           await set(newDocRef, docMetadata);

//           resolve(docMetadata);
//         }
//       );
//     });
//   };

//   const handleUpload = async () => {
//     if (!files.length) { showToast("Please select at least one file.", "error"); return; }
//     if (!patientId)    { showToast("You must be logged in.", "error"); return; }

//     setUploading(true);
//     const meta = { category, notes, recordDate, doctorAccess };
//     let successCount = 0;

//     for (const file of files) {
//       const key = file.name + file.size;
//       setStatuses(prev => ({ ...prev, [key]: "uploading" }));
//       try {
//         await uploadFileToFirebase(file, meta);
//         setStatuses(prev => ({ ...prev, [key]: "success" }));
//         successCount++;
//       } catch {
//         setStatuses(prev => ({ ...prev, [key]: "error" }));
//         showToast(`Failed to upload ${file.name}`, "error");
//       }
//     }

//     setUploading(false);
//     if (successCount > 0) {
//       showToast(`✅ ${successCount} document(s) uploaded successfully!`);
//       setTimeout(() => {
//         setFiles([]);
//         setStatuses({});
//         setProgress({});
//         setNotes("");
//         setRecordDate("");
//       }, 1200);
//     }
//   };

//   // ── Delete a record from Storage + RTDB ──
//   const deleteRecord = async (record) => {
//     try {
//       // Delete from Firebase Storage
//       if (record.storagePath) {
//         const fileRef = storageRef(storage, record.storagePath);
//         await deleteObject(fileRef);
//       }
//       // Delete metadata from RTDB
//       const docRef = dbRef(database, `users/${patientId}/documents/${record.id}`);
//       await remove(docRef);
//       showToast("Document deleted.", "error");
//     } catch (err) {
//       console.error(err);
//       showToast("Failed to delete document.", "error");
//     }
//   };

//   const STATUS_LABELS = {
//     pending: "Pending",
//     uploading: "Uploading…",
//     success: "Uploaded ✓",
//     error: "Failed ✗",
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="pdu-wrap">
//         <div className="pdu-card">

//           {/* Header */}
//           <div className="pdu-header">
//             <div className="pdu-header-icon">🏥</div>
//             <div>
//               <h2>My Health Documents</h2>
//               <p>Upload and manage your medical records — saved securely to Firebase</p>
//             </div>
//           </div>

//           <div className="pdu-body">

//             {/* Drop Zone */}
//             <div
//               className={`drop-zone ${dragOver ? "drag-over" : ""}`}
//               onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={handleDrop}
//               onClick={() => inputRef.current.click()}
//             >
//               <input
//                 ref={inputRef}
//                 type="file"
//                 multiple
//                 accept="*/*"
//                 onChange={(e) => addFiles(e.target.files)}
//                 style={{ display: "none" }}
//               />
//               <span className="drop-icon">📂</span>
//               <h3>Drag & Drop Your Health Documents Here</h3>
//               <p>or click to browse your device</p>
//               <div className="allowed-formats">
//                 {["PDF", "JPG", "PNG", "DOCX", "XLSX", "Any Format"].map(f => (
//                   <span key={f} className="fmt-tag">{f}</span>
//                 ))}
//               </div>
//               <span className="browse-btn">Browse Files</span>
//             </div>

//             {/* File Queue */}
//             {files.length > 0 && (
//               <div className="file-queue">
//                 {files.map(file => {
//                   const key = file.name + file.size;
//                   const status = statuses[key] || "pending";
//                   const pct = progress[key] || 0;
//                   return (
//                     <div key={key} className="file-item">
//                       <div className="file-thumb">{getIcon(file.name)}</div>
//                       <div className="file-info">
//                         <div className="file-name">{file.name}</div>
//                         <div className="file-size">{formatSize(file.size)}</div>
//                         {status === "uploading" && (
//                           <div className="progress-bar-wrap">
//                             <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
//                           </div>
//                         )}
//                       </div>
//                       <span className={`file-status status-${status}`}>
//                         {STATUS_LABELS[status]}
//                       </span>
//                       <button className="file-remove" onClick={() => removeFile(key)}>✕</button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Metadata */}
//             <div className="meta-grid">
//               <div className="field-group">
//                 <label>Document Category</label>
//                 <select value={category} onChange={e => setCategory(e.target.value)}>
//                   <option>General</option>
//                   <option>Lab Reports</option>
//                   <option>Prescriptions</option>
//                   <option>Radiology / X-Ray</option>
//                   <option>Surgery Records</option>
//                   <option>Vaccination</option>
//                   <option>Dental</option>
//                   <option>Ophthalmology</option>
//                   <option>Cardiology</option>
//                   <option>Insurance</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div className="field-group">
//                 <label>Record Date (optional)</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Jan 2025"
//                   value={recordDate}
//                   onChange={e => setRecordDate(e.target.value)}
//                 />
//               </div>

//               <div className="field-group full">
//                 <label>Notes / Description</label>
//                 <textarea
//                   placeholder="Add any notes about this document (optional)…"
//                   value={notes}
//                   onChange={e => setNotes(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Doctor Access Toggle */}
//             <div className="share-toggle">
//               <label className="toggle-switch">
//                 <input
//                   type="checkbox"
//                   checked={doctorAccess}
//                   onChange={e => setDoctorAccess(e.target.checked)}
//                 />
//                 <span className="toggle-slider" />
//               </label>
//               <div>
//                 <strong>Allow doctors to view this document</strong>
//                 <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: 2 }}>
//                   {doctorAccess
//                     ? "Doctors you consult can see this record during appointments."
//                     : "This document will be private to you only."}
//                 </div>
//               </div>
//             </div>

//             {/* Upload Button */}
//             <button
//               className="upload-btn"
//               onClick={handleUpload}
//               disabled={uploading || files.length === 0}
//             >
//               {uploading ? "⏳ Uploading to Firebase…" : "⬆️ Upload to My Health Records"}
//             </button>

//             {/* Saved Records from Firebase */}
//             <div className="section-title">
//               My Saved Records
//               {!loadingRecords && <span>{records.length}</span>}
//             </div>

//             {loadingRecords ? (
//               <div className="loading-state">⏳ Loading your documents…</div>
//             ) : records.length === 0 ? (
//               <div className="loading-state">No documents uploaded yet.</div>
//             ) : (
//               <div className="record-list">
//                 {records.map(rec => (
//                   <div key={rec.id} className="record-item">
//                     <div className="record-thumb">{getIcon(rec.filename)}</div>
//                     <div className="record-info">
//                       <div className="record-name">{rec.filename}</div>
//                       <div className="record-meta">
//                         {rec.category}
//                         {rec.size ? ` · ${formatSize(rec.size)}` : ""}
//                         {rec.uploadedAt ? ` · ${formatDate(rec.uploadedAt)}` : ""}
//                         {rec.notes ? ` · ${rec.notes}` : ""}
//                         {rec.recordDate ? ` · 📅 ${rec.recordDate}` : ""}
//                       </div>
//                     </div>
//                     <span className="record-badge">
//                       {rec.doctorAccess ? "🩺 Shared" : "🔒 Private"}
//                     </span>
//                     <div className="record-actions">
//                       {rec.downloadURL && (
//                         <a href={rec.downloadURL} target="_blank" rel="noreferrer">
//                           <button className="icon-btn" title="View / Download">👁️</button>
//                         </a>
//                       )}
//                       <button
//                         className="icon-btn"
//                         title="Delete"
//                         onClick={() => deleteRecord(rec)}
//                       >🗑️</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>

//       {toast && (
//         <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
//       )}
//     </>
//   );
// }
import { useState } from "react";
import logo from "../image/mianlogo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Marquee from "./Marquee";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { LuUserCircle2 } from "react-icons/lu";
import { FaUserAltSlash } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

// ── Reusable desktop menu dropdown ──────────────────────────
const MenuDropdown = ({ title, id, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      show={open}
      onToggle={(isOpen) => setOpen(isOpen)}
      className="menu-dropdown"
      id={id}
    >
      <Dropdown.Toggle
        as="button"
        className="menu-link dropdown-toggle"
        id={`${id}-toggle`}
      >
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

// ── Reusable mobile menu dropdown ───────────────────────────
const MobileDropdown = ({ title, id, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      show={open}
      onToggle={(isOpen) => setOpen(isOpen)}
      id={id}
      className="w-100"
    >
      <Dropdown.Toggle
        as="button"
        className="dropdown-toggle nav-link w-100 text-start"
        id={`${id}-toggle`}
      >
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu className="mobile-dropdown-menu">
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

// ── Main Navbar ──────────────────────────────────────────────
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);

  // ✅ If logged-in patient → hide this navbar entirely (PatientLayout handles their UI)
  const isPatient = isAuthenticated && user && user.userRole === "patient";
  if (isPatient) return null;

  return (
    <>
      <div className="navbar-wrapper">

        {/* ── Phone number bar ── */}
        <div className="top-bar d-flex justify-content-end align-items-center px-4 py-2">
          <span className="topbar-link">
            📞 +91 9922514719 / 7756853249
          </span>
        </div>

        {/* ── Logo LEFT | Auth RIGHT ── */}
        <nav className="navbar navbar-expand-lg main-navbar">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Trust Doctor" className="topbar-logo" style={{ width: "190px" }} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleShow}
              aria-label="Open menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Desktop Auth */}
            <div className="auth-section d-none d-lg-flex align-items-center gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="user-info">
                    <span className="d-flex align-items-center gap-1">
                      <LuUserCircle2 />
                      {user.userName || user.userEmail || "User"}
                    </span>
                    <small className="d-block text-end">
                      {user.userRole === "doctor"   ? "Doctor"   :
                       user.userRole === "hospital" ? "Hospital" : "Patient"}
                    </small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                    <FaUserAltSlash /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary auth-btn">
                    <LuUserCircle2 /> Login
                  </Link>
                  <Link to="/register" className="btn btn-primary auth-btn">
                    <FiUserPlus /> Register
                  </Link>
                </>
              )}
            </div>

          </div>
        </nav>

        {/* ════════ NAV BAND ROW 1 ════════ */}
        <div className="menu-row first-menu-row">
          <div className="container-fluid">
            <div className="d-flex align-items-stretch menu-container">

              <Link className="menu-link" to="/">Home</Link>

              <MenuDropdown title="Doctor Career" id="dd-doctor">
                <LinkContainer to="/Doctor/Australia"><Dropdown.Item>Doctor Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/USA"><Dropdown.Item>Doctor Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Germany"><Dropdown.Item>Doctor Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Other"><Dropdown.Item>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Dentist Career" id="dd-dentist">
                <LinkContainer to="/Dentist/Australia"><Dropdown.Item>Dentist Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/USA"><Dropdown.Item>Dentist Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Germany"><Dropdown.Item>Dentist Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Other"><Dropdown.Item>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Physiotherapy" id="dd-physio">
                <LinkContainer to="/physio/Australia"><Dropdown.Item>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/USA"><Dropdown.Item>Physiotherapy in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Germany"><Dropdown.Item>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Other"><Dropdown.Item>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Nurse Career" id="dd-nurse">
                <LinkContainer to="/Nurse/Australia"><Dropdown.Item>Nurse Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/USA"><Dropdown.Item>Nurse Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Germany"><Dropdown.Item>Nurse Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Other"><Dropdown.Item>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

            </div>
          </div>
        </div>

        {/* ════════ NAV BAND ROW 2 ════════ */}
        <div className="menu-row second-menu-row">
          <div className="container-fluid">
            <div className="d-flex align-items-stretch menu-container">

              <MenuDropdown title="Paramedical Career" id="dd-para">
                <LinkContainer to="/Para/Australia"><Dropdown.Item>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/USA"><Dropdown.Item>Paramedical Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Germany"><Dropdown.Item>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Other"><Dropdown.Item>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Language Learning" id="dd-lang">
                <LinkContainer to="/learning/germanlang"><Dropdown.Item>German Language</Dropdown.Item></LinkContainer>
                <LinkContainer to="/learning/toefllang"><Dropdown.Item>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <Link className="menu-link" to="/treatment/india">Treatment in India</Link>
              <Link className="menu-link" to="/ayurveda-wellness">Ayurveda &amp; Wellness</Link>

            </div>
          </div>
        </div>

        {/* ════════ MOBILE OFFCANVAS ════════ */}
        <Offcanvas show={show} onHide={handleClose} placement="end" className="custom-offcanvas">

          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <div className="navbar-nav">

              <Link className="nav-link" to="/" onClick={handleClose}>Home</Link>

              <MobileDropdown title="Doctor Career" id="m-dd-doctor">
                <LinkContainer to="/Doctor/Australia"><Dropdown.Item onClick={handleClose}>Doctor Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/USA"><Dropdown.Item onClick={handleClose}>Doctor Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Germany"><Dropdown.Item onClick={handleClose}>Doctor Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Other"><Dropdown.Item onClick={handleClose}>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Dentist Career" id="m-dd-dentist">
                <LinkContainer to="/Dentist/Australia"><Dropdown.Item onClick={handleClose}>Dentist Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/USA"><Dropdown.Item onClick={handleClose}>Dentist Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Germany"><Dropdown.Item onClick={handleClose}>Dentist Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Other"><Dropdown.Item onClick={handleClose}>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Physiotherapy" id="m-dd-physio">
                <LinkContainer to="/physio/Australia"><Dropdown.Item onClick={handleClose}>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/USA"><Dropdown.Item onClick={handleClose}>Physiotherapy in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Germany"><Dropdown.Item onClick={handleClose}>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Other"><Dropdown.Item onClick={handleClose}>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Nurse Career" id="m-dd-nurse">
                <LinkContainer to="/Nurse/Australia"><Dropdown.Item onClick={handleClose}>Nurse Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/USA"><Dropdown.Item onClick={handleClose}>Nurse Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Germany"><Dropdown.Item onClick={handleClose}>Nurse Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Other"><Dropdown.Item onClick={handleClose}>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Paramedical Career" id="m-dd-para">
                <LinkContainer to="/Para/Australia"><Dropdown.Item onClick={handleClose}>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/USA"><Dropdown.Item onClick={handleClose}>Paramedical Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Germany"><Dropdown.Item onClick={handleClose}>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Other"><Dropdown.Item onClick={handleClose}>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Language Learning" id="m-dd-lang">
                <LinkContainer to="/learning/germanlang"><Dropdown.Item onClick={handleClose}>German Language</Dropdown.Item></LinkContainer>
                <LinkContainer to="/learning/toefllang"><Dropdown.Item onClick={handleClose}>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <Link className="nav-link" to="/treatment/india" onClick={handleClose}>Treatment in India</Link>
              <Link className="nav-link" to="/ayurveda-wellness" onClick={handleClose}>Ayurveda &amp; Wellness</Link>

              {/* Mobile Auth */}
              <div className="mt-4 pt-3 border-top">
                {isAuthenticated && user ? (
                  <>
                    <div className="user-info mb-3">
                      <span className="d-flex align-items-center gap-2">
                        <LuUserCircle2 />
                        <span className="fw-semibold">{user.userName || user.userEmail || "User"}</span>
                      </span>
                      <small className="d-block ms-4 text-muted">
                        {user.userRole === "doctor"   ? "Doctor"   :
                         user.userRole === "hospital" ? "Hospital" : "Patient"}
                      </small>
                    </div>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => { logout(); handleClose(); }}
                    >
                      <FaUserAltSlash /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-primary w-100 mb-2 auth-btn" onClick={handleClose}>
                      <LuUserCircle2 /> Login
                    </Link>
                    <Link to="/register" className="btn btn-primary w-100 auth-btn" onClick={handleClose}>
                      <FiUserPlus /> Register
                    </Link>
                  </>
                )}
              </div>

            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Marquee />
      </div>
    </>
  );
};

export default Navbar;