// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import { useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import './reports.css';
// import {
//     getDatabase,
//     ref as databaseRef,
//     push,
//     onValue,
//     remove,
//     set,
//     update,
// } from 'firebase/database';
// import { useAuth } from '../../AuthContext';
// import { ToastContainer, toast } from 'react-toastify';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Navbar from '../pages/Navbar';

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
// }));

// const MAX_FILE_SIZE_MB = 5;

// const Reports = () => {
//     const { id } = useParams();
//     const { user } = useAuth();

//     const getUserId = () => id || user?.uid || user?.userId;

//     const [file, setFile] = useState(null);
//     const [description, setDescription] = useState('');
//     const [reports, setReports] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [editingReportId, setEditingReportId] = useState(null);
//     const [editedDescription, setEditedDescription] = useState('');

//     const database = getDatabase();

//     // ── Load reports ──────────────────────────────────────────
//     useEffect(() => {
//         const uid = getUserId();
//         if (!uid) return;

//         const reportsRef = databaseRef(database, `users/${uid}/reports`);
//         const unsubscribe = onValue(reportsRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const arr = Object.entries(data).map(([key, val]) => ({
//                     reportId: key,
//                     ...val,
//                 }));
//                 setReports(arr.sort((a, b) =>
//                     new Date(b.uploadedAt) - new Date(a.uploadedAt)
//                 ));
//             } else {
//                 setReports([]);
//             }
//         });

//         return () => unsubscribe();
//     }, [id, user]);

//     // ── Convert file to Base64 ────────────────────────────────
//     const fileToBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = reject;
//             reader.onprogress = (e) => {
//                 if (e.lengthComputable) {
//                     setUploadProgress(Math.round((e.loaded / e.total) * 60));
//                 }
//             };
//             reader.readAsDataURL(file);
//         });
//     };

//     // ── Upload ────────────────────────────────────────────────
//     const handleUpload = async () => {
//         const uid = getUserId();

//         if (!uid) { toast.error('User not identified. Please log in again.'); return; }
//         if (!file) { toast.error('Please select a file first.'); return; }

//         const sizeMB = file.size / (1024 * 1024);
//         if (sizeMB > MAX_FILE_SIZE_MB) {
//             toast.error(`File too large! Max ${MAX_FILE_SIZE_MB}MB. Your file is ${sizeMB.toFixed(1)}MB.`);
//             return;
//         }

//         setUploading(true);
//         setUploadProgress(0);

//         try {
//             const base64Data = await fileToBase64(file);
//             setUploadProgress(70);

//             const newRef = push(databaseRef(database, `users/${uid}/reports`));
//             await set(newRef, {
//                 reportId: newRef.key,
//                 fileData: base64Data,
//                 fileName: file.name,
//                 fileType: file.type,
//                 fileSizeMB: sizeMB.toFixed(2),
//                 description: description.trim() || 'No description',
//                 uploadedAt: new Date().toISOString(),
//             });

//             setUploadProgress(100);
//             toast.success('File uploaded successfully!');
//             setFile(null);
//             setDescription('');
//             setUploadProgress(0);
//             setUploading(false);
//             const fileInput = document.getElementById('report-file-input');
//             if (fileInput) fileInput.value = '';

//         } catch (error) {
//             console.error('Upload error:', error);
//             toast.error('Upload failed: ' + error.message);
//             setUploading(false);
//             setUploadProgress(0);
//         }
//     };

//     // ── View file ─────────────────────────────────────────────
//     const handleView = (report) => {
//         if (!report.fileData) { toast.error('File data not available.'); return; }
//         const win = window.open();
//         if (report.fileType === 'application/pdf') {
//             win.document.write(
//                 `<iframe src="${report.fileData}" style="width:100%;height:100vh;border:none;"></iframe>`
//             );
//         } else {
//             win.document.write(
//                 `<img src="${report.fileData}" style="max-width:100%;display:block;margin:auto;" />`
//             );
//         }
//         win.document.title = report.fileName || 'Report';
//     };

//     // ── Download ──────────────────────────────────────────────
//     const handleDownload = (report) => {
//         if (!report.fileData) return;
//         const link = document.createElement('a');
//         link.href = report.fileData;
//         link.download = report.fileName || 'report';
//         link.click();
//     };

//     // ── Delete ────────────────────────────────────────────────
//     const handleDelete = async (reportId) => {
//         const uid = getUserId();
//         if (!uid) return;
//         try {
//             await remove(databaseRef(database, `users/${uid}/reports/${reportId}`));
//             toast.success('Report deleted.');
//         } catch (error) {
//             toast.error('Failed to delete: ' + error.message);
//         }
//     };

//     // ── Edit ──────────────────────────────────────────────────
//     const handleEdit = (report) => {
//         setEditingReportId(report.reportId);
//         setEditedDescription(report.description);
//     };

//     const handleSaveEdit = async (reportId) => {
//         const uid = getUserId();
//         if (!uid) return;
//         try {
//             await update(databaseRef(database, `users/${uid}/reports/${reportId}`), {
//                 description: editedDescription.trim(),
//             });
//             setEditingReportId(null);
//             setEditedDescription('');
//             toast.success('Description updated.');
//         } catch (error) {
//             toast.error('Failed to update.');
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <Box sx={{ display: 'flex' }} style={{ width: '100vw' }}>
//                 <div className="mx-auto w-100">
//                     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                         <div className="container-sm mx-auto">
//                             <ToastContainer />
//                             <h1>Medical History</h1>

//                             {/* ── Upload Form ── */}
//                             <div className="childContainer mt-3">
//                                 <h4 className="text-primary">Upload your medical history</h4>

//                                 <div style={{
//                                     background: '#fff3cd', border: '1px solid #ffc107',
//                                     borderRadius: 8, padding: '10px 14px', marginBottom: 16,
//                                     fontSize: 13, color: '#856404'
//                                 }}>
//                                     ⚠️ Max file size: <strong>{MAX_FILE_SIZE_MB}MB</strong> &nbsp;|&nbsp;
//                                     Supported: PDF, JPG, PNG, WEBP, DOC, DOCX
//                                 </div>

//                                 <Form className="mx-auto">
//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Select File</Form.Label>
//                                         <Form.Control
//                                             id="report-file-input"
//                                             type="file"
//                                             accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
//                                             onChange={(e) => {
//                                                 const f = e.target.files[0];
//                                                 if (f) {
//                                                     const sizeMB = f.size / (1024 * 1024);
//                                                     if (sizeMB > MAX_FILE_SIZE_MB) {
//                                                         toast.error(`File too large! Max ${MAX_FILE_SIZE_MB}MB allowed.`);
//                                                         e.target.value = '';
//                                                         setFile(null);
//                                                     } else {
//                                                         setFile(f);
//                                                     }
//                                                 }
//                                             }}
//                                         />
//                                         {file && (
//                                             <Form.Text className="text-muted">
//                                                 {file.name} — {(file.size / (1024 * 1024)).toFixed(2)}MB
//                                             </Form.Text>
//                                         )}
//                                     </Form.Group>

//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Description</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="e.g. Blood test report – Jan 2026"
//                                             value={description}
//                                             onChange={(e) => setDescription(e.target.value)}
//                                         />
//                                     </Form.Group>

//                                     {uploading && (
//                                         <div className="mb-3">
//                                             <div style={{
//                                                 height: 8, borderRadius: 4,
//                                                 background: '#e0e0e0', overflow: 'hidden'
//                                             }}>
//                                                 <div style={{
//                                                     height: '100%', borderRadius: 4,
//                                                     width: `${uploadProgress}%`,
//                                                     background: '#1976d2',
//                                                     transition: 'width 0.3s'
//                                                 }} />
//                                             </div>
//                                             <small className="text-muted">
//                                                 {uploadProgress}% — {
//                                                     uploadProgress < 70 ? 'Reading file...' :
//                                                     uploadProgress < 100 ? 'Saving to database...' : 'Done!'
//                                                 }
//                                             </small>
//                                         </div>
//                                     )}

//                                     <Button
//                                         variant="primary"
//                                         onClick={handleUpload}
//                                         disabled={uploading || !file}
//                                     >
//                                         {uploading ? `Uploading… ${uploadProgress}%` : 'Upload'}
//                                     </Button>
//                                 </Form>
//                             </div>

//                             {/* ── Reports Table ── */}
//                             <div className="w-100 mx-auto childContainer mt-4"
//                                 style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                 <h3 style={{ marginTop: '3vh' }}>Medical History</h3>

//                                 {reports.length === 0 ? (
//                                     <p className="text-muted text-center py-4">
//                                         No documents uploaded yet.
//                                     </p>
//                                 ) : (
//                                     <div className="table-container">
//                                         <table className="table w-100 table-responsive">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Description</th>
//                                                     <th>File Name</th>
//                                                     <th>Size</th>
//                                                     <th>Date</th>
//                                                     <th>View</th>
//                                                     <th>Download</th>
//                                                     <th>Edit</th>
//                                                     <th>Delete</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {reports.map((report, index) => (
//                                                     <tr key={report.reportId}
//                                                         className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
//                                                         <td>
//                                                             {editingReportId === report.reportId ? (
//                                                                 <Form.Control
//                                                                     type="text"
//                                                                     value={editedDescription}
//                                                                     onChange={(e) => setEditedDescription(e.target.value)}
//                                                                 />
//                                                             ) : report.description}
//                                                         </td>
//                                                         <td style={{ fontSize: 12, color: '#666' }}>{report.fileName || '—'}</td>
//                                                         <td style={{ fontSize: 12 }}>{report.fileSizeMB ? `${report.fileSizeMB} MB` : '—'}</td>
//                                                         <td style={{ fontSize: 12 }}>
//                                                             {report.uploadedAt ? new Date(report.uploadedAt).toLocaleDateString() : '—'}
//                                                         </td>
//                                                         <td>
//                                                             <Button variant="outline-primary" size="sm" onClick={() => handleView(report)}>
//                                                                 View
//                                                             </Button>
//                                                         </td>
//                                                         <td>
//                                                             <Button variant="outline-success" size="sm" onClick={() => handleDownload(report)}>
//                                                                 Download
//                                                             </Button>
//                                                         </td>
//                                                         <td>
//                                                             {editingReportId === report.reportId ? (
//                                                                 <Button variant="success" size="sm" onClick={() => handleSaveEdit(report.reportId)}>
//                                                                     Save
//                                                                 </Button>
//                                                             ) : (
//                                                                 <Button variant="primary" size="sm" onClick={() => handleEdit(report)}>
//                                                                     Edit
//                                                                 </Button>
//                                                             )}
//                                                         </td>
//                                                         <td>
//                                                             <Button variant="danger" size="sm" onClick={() => handleDelete(report.reportId)}>
//                                                                 Delete
//                                                             </Button>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </Box>
//                 </div>
//             </Box>
//         </>
//     );
// };

// export default Reports;

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './reports.css';
import {
    getDatabase,
    ref as databaseRef,
    push,
    onValue,
    remove,
    set,
    update,
} from 'firebase/database';
import { useAuth } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../pages/Navbar';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const MAX_FILE_SIZE_MB = 5;

// ── Document type options with Hindi labels ──────────────────
const DOCUMENT_TYPES = [
    { value: '', label: '-- Select Document Type --', hindi: '' },
    { value: 'xray',           label: 'X-Ray Report',              hindi: 'एक्स-रे रिपोर्ट' },
    { value: 'blood_report',   label: 'Blood Test Report',         hindi: 'खून की जाँच रिपोर्ट' },
    { value: 'prescription',   label: 'Doctor Prescription',       hindi: 'डॉक्टर का पर्चा' },
    { value: 'discharge',      label: 'Hospital Discharge Summary', hindi: 'अस्पताल छुट्टी सारांश' },
    { value: 'mri_ct',         label: 'MRI / CT Scan',             hindi: 'एमआरआई / सीटी स्कैन' },
    { value: 'urine_report',   label: 'Urine Test Report',         hindi: 'पेशाब की जाँच रिपोर्ट' },
    { value: 'ecg',            label: 'ECG / Heart Report',        hindi: 'ईसीजी / दिल की रिपोर्ट' },
    { value: 'eye_report',     label: 'Eye Test Report',           hindi: 'आँख की जाँच रिपोर्ट' },
    { value: 'vaccination',    label: 'Vaccination Record',        hindi: 'टीकाकरण रिकॉर्ड' },
    { value: 'insurance',      label: 'Health Insurance Document', hindi: 'स्वास्थ्य बीमा दस्तावेज़' },
    { value: 'other',          label: 'Other Document',            hindi: 'अन्य दस्तावेज़' },
];

const getDocLabel = (value) => {
    const doc = DOCUMENT_TYPES.find(d => d.value === value);
    if (!doc || !doc.value) return '';
    return doc.hindi ? `${doc.label} (${doc.hindi})` : doc.label;
};

const Reports = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const getUserId = () => id || user?.uid || user?.userId;

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [docType, setDocType] = useState('');
    const [reports, setReports] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [editingReportId, setEditingReportId] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDocType, setEditedDocType] = useState('');

    const database = getDatabase();

    // ── Load reports ──────────────────────────────────────────
    useEffect(() => {
        const uid = getUserId();
        if (!uid) return;

        const reportsRef = databaseRef(database, `users/${uid}/reports`);
        const unsubscribe = onValue(reportsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.entries(data).map(([key, val]) => ({
                    reportId: key,
                    ...val,
                }));
                setReports(arr.sort((a, b) =>
                    new Date(b.uploadedAt) - new Date(a.uploadedAt)
                ));
            } else {
                setReports([]);
            }
        });

        return () => unsubscribe();
    }, [id, user]);

    // ── Convert file to Base64 ────────────────────────────────
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.onprogress = (e) => {
                if (e.lengthComputable) {
                    setUploadProgress(Math.round((e.loaded / e.total) * 60));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // ── Upload ────────────────────────────────────────────────
    const handleUpload = async () => {
        const uid = getUserId();

        if (!uid)     { toast.error('User not identified. Please log in again.'); return; }
        if (!file)    { toast.error('Please select a file first. | पहले फ़ाइल चुनें।'); return; }
        if (!docType) { toast.error('Please select a document type. | दस्तावेज़ का प्रकार चुनें।'); return; }

        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > MAX_FILE_SIZE_MB) {
            toast.error(`File too large! Max ${MAX_FILE_SIZE_MB}MB. Your file is ${sizeMB.toFixed(1)}MB.`);
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            const base64Data = await fileToBase64(file);
            setUploadProgress(70);

            const newRef = push(databaseRef(database, `users/${uid}/reports`));
            await set(newRef, {
                reportId: newRef.key,
                fileData: base64Data,
                fileName: file.name,
                fileType: file.type,
                fileSizeMB: sizeMB.toFixed(2),
                docType: docType,
                description: description.trim() || 'No description',
                uploadedAt: new Date().toISOString(),
            });

            setUploadProgress(100);
            toast.success('File uploaded successfully! | फ़ाइल सफलतापूर्वक अपलोड हो गई!');
            setFile(null);
            setDescription('');
            setDocType('');
            setUploadProgress(0);
            setUploading(false);
            const fileInput = document.getElementById('report-file-input');
            if (fileInput) fileInput.value = '';

        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload failed: ' + error.message);
            setUploading(false);
            setUploadProgress(0);
        }
    };

    // ── View file ─────────────────────────────────────────────
    const handleView = (report) => {
        if (!report.fileData) { toast.error('File data not available.'); return; }
        const win = window.open();
        if (report.fileType === 'application/pdf') {
            win.document.write(
                `<iframe src="${report.fileData}" style="width:100%;height:100vh;border:none;"></iframe>`
            );
        } else {
            win.document.write(
                `<img src="${report.fileData}" style="max-width:100%;display:block;margin:auto;" />`
            );
        }
        win.document.title = report.fileName || 'Report';
    };

    // ── Download ──────────────────────────────────────────────
    const handleDownload = (report) => {
        if (!report.fileData) return;
        const link = document.createElement('a');
        link.href = report.fileData;
        link.download = report.fileName || 'report';
        link.click();
    };

    // ── Delete ────────────────────────────────────────────────
    const handleDelete = async (reportId) => {
        const uid = getUserId();
        if (!uid) return;
        try {
            await remove(databaseRef(database, `users/${uid}/reports/${reportId}`));
            toast.success('Report deleted. | रिपोर्ट हटा दी गई।');
        } catch (error) {
            toast.error('Failed to delete: ' + error.message);
        }
    };

    // ── Edit ──────────────────────────────────────────────────
    const handleEdit = (report) => {
        setEditingReportId(report.reportId);
        setEditedDescription(report.description);
        setEditedDocType(report.docType || '');
    };

    const handleSaveEdit = async (reportId) => {
        const uid = getUserId();
        if (!uid) return;
        try {
            await update(databaseRef(database, `users/${uid}/reports/${reportId}`), {
                description: editedDescription.trim(),
                docType: editedDocType,
            });
            setEditingReportId(null);
            setEditedDescription('');
            setEditedDocType('');
            toast.success('Updated successfully. | सफलतापूर्वक अपडेट हो गया।');
        } catch (error) {
            toast.error('Failed to update.');
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }} style={{ width: '100vw' }}>
                <div className="mx-auto w-100">
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <div className="container-sm mx-auto">
                            <ToastContainer />
                            <h1>
                                Medical History{' '}
                                <span style={{ fontSize: 18, color: '#555', fontWeight: 400 }}>
                                    (चिकित्सा इतिहास)
                                </span>
                            </h1>

                            {/* ── Upload Form ── */}
                            <div className="childContainer mt-3">
                                <h4 className="text-primary">
                                    Upload your medical history{' '}
                                    <span style={{ fontSize: 14, color: '#1565c0' }}>
                                        (अपना चिकित्सा इतिहास अपलोड करें)
                                    </span>
                                </h4>

                                {/* Info banner */}
                                <div style={{
                                    background: '#fff3cd', border: '1px solid #ffc107',
                                    borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                                    fontSize: 13, color: '#856404'
                                }}>
                                    ⚠️ Max file size: <strong>{MAX_FILE_SIZE_MB}MB</strong>{' '}
                                    <span style={{ color: '#5d4037' }}>(अधिकतम फ़ाइल आकार: {MAX_FILE_SIZE_MB}MB)</span>
                                    &nbsp;|&nbsp;
                                    Supported: PDF, JPG, PNG, WEBP, DOC, DOCX{' '}
                                    <span style={{ color: '#5d4037' }}>(समर्थित फ़ाइलें)</span>
                                </div>

                                <Form className="mx-auto">

                                    {/* ── Document Type Dropdown ── */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Document Type{' '}
                                            <span style={{ fontSize: 12, color: '#1565c0' }}>(दस्तावेज़ का प्रकार)</span>
                                            <span style={{ color: 'red' }}> *</span>
                                        </Form.Label>
                                        <Form.Select
                                            value={docType}
                                            onChange={(e) => setDocType(e.target.value)}
                                        >
                                            {DOCUMENT_TYPES.map((dt) => (
                                                <option key={dt.value} value={dt.value}>
                                                    {dt.value === ''
                                                        ? dt.label
                                                        : dt.hindi
                                                            ? `${dt.label} (${dt.hindi})`
                                                            : dt.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    {/* ── File Input ── */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Select File{' '}
                                            <span style={{ fontSize: 12, color: '#1565c0' }}>(फ़ाइल चुनें)</span>
                                        </Form.Label>
                                        <Form.Control
                                            id="report-file-input"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                                            onChange={(e) => {
                                                const f = e.target.files[0];
                                                if (f) {
                                                    const sizeMB = f.size / (1024 * 1024);
                                                    if (sizeMB > MAX_FILE_SIZE_MB) {
                                                        toast.error(`File too large! Max ${MAX_FILE_SIZE_MB}MB allowed.`);
                                                        e.target.value = '';
                                                        setFile(null);
                                                    } else {
                                                        setFile(f);
                                                    }
                                                }
                                            }}
                                        />
                                        {file && (
                                            <Form.Text className="text-muted">
                                                {file.name} — {(file.size / (1024 * 1024)).toFixed(2)}MB
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    {/* ── Description ── */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Description{' '}
                                            <span style={{ fontSize: 12, color: '#1565c0' }}>(विवरण)</span>
                                            <span style={{ fontSize: 11, color: '#999' }}> (optional / वैकल्पिक)</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g. Blood test report – Jan 2026 | उदा. खून की जाँच – जनवरी 2026"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* ── Progress bar ── */}
                                    {uploading && (
                                        <div className="mb-3">
                                            <div style={{
                                                height: 8, borderRadius: 4,
                                                background: '#e0e0e0', overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    height: '100%', borderRadius: 4,
                                                    width: `${uploadProgress}%`,
                                                    background: '#1976d2',
                                                    transition: 'width 0.3s'
                                                }} />
                                            </div>
                                            <small className="text-muted">
                                                {uploadProgress}% —{' '}
                                                {uploadProgress < 70
                                                    ? 'Reading file... (फ़ाइल पढ़ी जा रही है...)'
                                                    : uploadProgress < 100
                                                        ? 'Saving... (सहेजा जा रहा है...)'
                                                        : 'Done! (हो गया!)'}
                                            </small>
                                        </div>
                                    )}

                                    <Button
                                        variant="primary"
                                        onClick={handleUpload}
                                        disabled={uploading || !file}
                                    >
                                        {uploading
                                            ? `Uploading… ${uploadProgress}%`
                                            : 'Upload (अपलोड करें)'}
                                    </Button>
                                </Form>
                            </div>

                            {/* ── Reports Table ── */}
                            <div className="w-100 mx-auto childContainer mt-4"
                                style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <h3 style={{ marginTop: '3vh' }}>
                                    Medical History{' '}
                                    <span style={{ fontSize: 16, color: '#555', fontWeight: 400 }}>
                                        (चिकित्सा इतिहास)
                                    </span>
                                </h3>

                                {reports.length === 0 ? (
                                    <p className="text-muted text-center py-4">
                                        No documents uploaded yet. | अभी तक कोई दस्तावेज़ अपलोड नहीं हुआ।
                                    </p>
                                ) : (
                                    <div className="table-container">
                                        <table className="table w-100 table-responsive">
                                            <thead>
                                                <tr>
                                                    <th>Document Type <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(दस्तावेज़ प्रकार)</small></th>
                                                    <th>Description <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(विवरण)</small></th>
                                                    <th>File Name <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(फ़ाइल का नाम)</small></th>
                                                    <th>Size <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(आकार)</small></th>
                                                    <th>Date <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(तारीख)</small></th>
                                                    <th>View <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(देखें)</small></th>
                                                    <th>Download <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(डाउनलोड)</small></th>
                                                    <th>Edit <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(संपादित करें)</small></th>
                                                    <th>Delete <br /><small style={{ color: '#1565c0', fontWeight: 400 }}>(हटाएँ)</small></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reports.map((report, index) => (
                                                    <tr key={report.reportId}
                                                        className={index % 2 === 0 ? 'even-row' : 'odd-row'}>

                                                        {/* Document Type */}
                                                        <td>
                                                            {editingReportId === report.reportId ? (
                                                                <Form.Select
                                                                    size="sm"
                                                                    value={editedDocType}
                                                                    onChange={(e) => setEditedDocType(e.target.value)}
                                                                >
                                                                    {DOCUMENT_TYPES.map((dt) => (
                                                                        <option key={dt.value} value={dt.value}>
                                                                            {dt.value === ''
                                                                                ? dt.label
                                                                                : dt.hindi
                                                                                    ? `${dt.label} (${dt.hindi})`
                                                                                    : dt.label}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            ) : (
                                                                <span style={{ fontSize: 13 }}>
                                                                    {getDocLabel(report.docType) || (
                                                                        <span className="text-muted">—</span>
                                                                    )}
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Description */}
                                                        <td>
                                                            {editingReportId === report.reportId ? (
                                                                <Form.Control
                                                                    size="sm"
                                                                    type="text"
                                                                    value={editedDescription}
                                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                                />
                                                            ) : report.description}
                                                        </td>

                                                        <td style={{ fontSize: 12, color: '#666' }}>{report.fileName || '—'}</td>
                                                        <td style={{ fontSize: 12 }}>{report.fileSizeMB ? `${report.fileSizeMB} MB` : '—'}</td>
                                                        <td style={{ fontSize: 12 }}>
                                                            {report.uploadedAt ? new Date(report.uploadedAt).toLocaleDateString() : '—'}
                                                        </td>
                                                        <td>
                                                            <Button variant="outline-primary" size="sm" onClick={() => handleView(report)}>
                                                                View
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button variant="outline-success" size="sm" onClick={() => handleDownload(report)}>
                                                                Download
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            {editingReportId === report.reportId ? (
                                                                <Button variant="success" size="sm" onClick={() => handleSaveEdit(report.reportId)}>
                                                                    Save
                                                                </Button>
                                                            ) : (
                                                                <Button variant="primary" size="sm" onClick={() => handleEdit(report)}>
                                                                    Edit
                                                                </Button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Button variant="danger" size="sm" onClick={() => handleDelete(report.reportId)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Reports;