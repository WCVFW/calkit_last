import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { orderAPI } from "@/lib/api"; // Assuming orderAPI is correctly configured
import { CloudArrowUpIcon, CheckCircleIcon, CurrencyRupeeIcon, DocumentTextIcon, XCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getUser } from "../../lib/auth";
export default function ServiceOrder() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const title = searchParams.get("title") || "Service";
    const desc = searchParams.get("desc") || "Complete your service order by following the steps below.";

    // Hardcoded for demonstration, in a real app, this should be dynamic
    // and based on the 'title' lookup.
    const MOCK_PRICE = 499.0;

    // --- State ---
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [order, setOrder] = useState(null);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(1);

    // --- Utility Functions ---
    const isOrderCreated = order && order.id;
    const isPaymentCompleted = order && order.status === 'PAYMENT_COMPLETED';
    const areDocsUploaded = uploadedDocs.length > 0;

    // Memoized function to fetch documents
    const fetchDocs = useCallback(async () => {
        if (!order || !order.id) return;
        try {
            const r = await orderAPI.listDocuments(order.id);
            setUploadedDocs(r.data || []);
            // Update step based on uploaded docs
            if (currentStep < 3 && r.data && r.data.length > 0) {
                setCurrentStep(3);
            }
        } catch (err) {
            console.warn("Failed to fetch documents:", err);
        }
    }, [order, currentStep]);

    useEffect(() => {
        // Automatically determine step and fetch docs on order update
        if (order) {
            fetchDocs();
            if (isPaymentCompleted) {
                setCurrentStep(4);
            } else if (isOrderCreated && currentStep < 3) {
                setCurrentStep(2); // Move to upload docs
            }
        }
        // NOTE: In a real app, you would check searchParams for an 'orderId'
        // if the user navigates back to this page, and fetch the existing order.
    }, [order, isOrderCreated, isPaymentCompleted, fetchDocs, currentStep]);


    // --- API Handlers ---
    const handleFiles = (e) => {
        const selected = Array.from(e.target.files || []);
        setFilesToUpload(f => [...f, ...selected]);
    };

    const createOrder = async () => {
        setLoading(true);
        try {
            const user = getUser()
            const r = await orderAPI.create({
                serviceName: title,
                customerEmail: user.email,
                totalAmount: MOCK_PRICE
            });
            setOrder(r.data);
            setMessage(`Order #${r.data.id} created successfully. Proceed to upload documents.`);
            setCurrentStep(2);
        } catch (err) {
            setMessage(err?.response?.data?.message || "Could not create order.");
        } finally { setLoading(false); }
    };

    const uploadDocs = async () => {
        if (!isOrderCreated) return setMessage("Error: Order not created.");
        if (filesToUpload.length === 0) return setMessage("Please select files to upload.");

        setLoading(true);
        try {
            // Upload files sequentially (simpler logic)
            for (const f of filesToUpload) {
                // The orderAPI.addDocument should handle the file upload logic
                await orderAPI.addDocument(order.id, f);
            }
            setFilesToUpload([]);
            await fetchDocs(); // Re-fetch to see uploaded files
            setMessage("Documents uploaded successfully. You can now proceed to payment.");
            setCurrentStep(3);
        } catch (err) {
            setMessage(err?.response?.data?.message || "Document upload failed.");
        } finally { setLoading(false); }
    };

    const pay = async () => {
        if (!isOrderCreated) return setMessage("Create order first.");
        if (currentStep < 3) return setMessage("Please upload documents first.");

        setLoading(true);
        try {
            // Mock payment completion
            await orderAPI.pay(order.id, { paymentId: `MOCK-${Date.now()}` });

            // Refresh order status
            const r = await orderAPI.getById(order.id);
            setOrder(r.data);

            setMessage("Payment completed. Order submitted to the processing team.");
            setCurrentStep(4);

            // Redirect after short delay to dashboard or order history
            setTimeout(() => navigate('/dashboard/user/my-orders'), 1500);
        } catch (err) {
            setMessage("Payment failed. Please try again.");
        } finally { setLoading(false); }
    };

    const downloadInvoice = async () => {
        if (!order || !isPaymentCompleted) return setMessage("Payment not completed.");
        setLoading(true);
        try {
            // Conceptual API call to fetch the invoice as a Blob (PDF/File)
            const r = await orderAPI.downloadInvoice(order.id);

            // This part handles the file download in the browser
            const contentType = r.headers['content-type'] || 'application/pdf';
            const blob = new Blob([r.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Invoice-${order.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setMessage("Invoice download started.");

        } catch (err) {
            setMessage('Failed to download invoice. Please check server logs.');
        } finally { setLoading(false); }
    };


    // --- Render Helpers ---
    const steps = [
        { id: 1, title: "Create Order", icon: DocumentTextIcon },
        { id: 2, title: "Upload Documents", icon: CloudArrowUpIcon },
        { id: 3, title: "Pay & Submit", icon: CurrencyRupeeIcon },
        { id: 4, title: "Order Completed", icon: CheckCircleIcon },
    ];

    const StepIndicator = ({ stepId, title, icon: Icon }) => (
        <div className="flex flex-col items-center">
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep === stepId
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : currentStep > stepId
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-white border-gray-300 text-gray-500'
                    }`}
            >
                {currentStep > stepId ? <CheckCircleIcon className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
            </div>
            <p className={`mt-2 text-xs font-medium text-center whitespace-nowrap ${currentStep >= stepId ? 'text-gray-800' : 'text-gray-500'}`}>{title}</p>
        </div>
    );

    return (
        <div className="max-w-4xl p-6 mx-auto antialiased shadow-2xl bg-gray-50 rounded-xl">
            <div className="p-4 mb-6 bg-white border-l-4 border-blue-600 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
                {isOrderCreated && (
                    <div className="mt-3 text-sm font-medium text-blue-700">
                        Current Order ID: <span className="font-bold">#{order.id}</span> | Status: <span className="font-bold">{order.status.replace('_', ' ')}</span>
                    </div>
                )}
            </div>

            {/* Step Indicators Bar */}
            <div className="flex items-start justify-between p-4 mb-10 bg-white rounded-lg shadow">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <StepIndicator {...step} />
                        {index < steps.length - 1 && (
                            <div className="flex-1 self-center h-0.5 bg-gray-300 mx-1.5" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* --- Main Content by Step --- */}

            {/* 1. Create Order */}
            <div className={`p-5 mb-6 bg-white rounded-lg shadow ${currentStep === 1 ? 'border-2 border-blue-400' : ''}`}>
                <h3 className="flex items-center mb-3 text-lg font-semibold">
                    <span className="flex items-center justify-center w-6 h-6 mr-2 font-bold text-blue-600 bg-blue-100 rounded-full">1</span>
                    Create Order
                </h3>
                {!isOrderCreated ? (
                    <button
                        onClick={createOrder}
                        disabled={loading}
                        className={`px-6 py-2 text-white font-semibold rounded-lg transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Processing...' : `Create Order Now (Service Fee: Rs. ${MOCK_PRICE})`}
                    </button>
                ) : (
                    <p className="font-medium text-green-600">Order created. Proceed to the next step.</p>
                )}
            </div>

            {/* 2. Upload Documents */}
            {isOrderCreated && currentStep < 4 && (
                <div className={`p-5 mb-6 bg-white rounded-lg shadow ${currentStep === 2 ? 'border-2 border-blue-400' : (currentStep > 2 ? 'border-2 border-green-400' : '')}`}>
                    <h3 className="flex items-center mb-3 text-lg font-semibold">
                        <span className="flex items-center justify-center w-6 h-6 mr-2 font-bold text-blue-600 bg-blue-100 rounded-full">2</span>
                        Upload Documents
                    </h3>

                    {/* File Input */}
                    {currentStep === 2 && (
                        <div className="flex items-center mb-4 space-x-4">
                            <input
                                type="file"
                                multiple
                                onChange={handleFiles}
                                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200"
                            />
                            <button
                                onClick={uploadDocs}
                                disabled={loading || filesToUpload.length === 0}
                                className={`px-4 py-2 text-sm text-white font-semibold rounded-lg transition ${loading || filesToUpload.length === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {loading ? 'Uploading...' : `Upload ${filesToUpload.length} File(s)`}
                            </button>
                        </div>
                    )}

                    {/* Upload Queue Preview */}
                    {filesToUpload.length > 0 && (
                        <div className="p-3 mb-4 text-yellow-800 border rounded-lg bg-yellow-50">
                            <h4 className="text-sm font-semibold">Files in Upload Queue:</h4>
                            <ul className="ml-4 text-xs list-disc">
                                {filesToUpload.map((f, idx) => <li key={idx}>{f.name}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Uploaded Documents List (User View) */}
                    <h4 className="pt-3 mt-4 text-base font-semibold border-t">Uploaded Documents Status</h4>
                    {uploadedDocs.length === 0 ? (
                        <p className="mt-2 text-sm text-gray-500">No documents have been uploaded yet.</p>
                    ) : (
                        <ul className="mt-2 space-y-2">
                            {uploadedDocs.map(d => (
                                <li key={d.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                                    <div className="max-w-md text-sm truncate">{d.fileName}</div>
                                    <div className="flex items-center gap-4">
                                        <div className={`text-xs font-semibold flex items-center ${d.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {d.verified ? <CheckCircleIcon className="w-4 h-4 mr-1" /> : <XCircleIcon className="w-4 h-4 mr-1" />}
                                            {d.verified ? 'Verified by Admin' : 'Pending Admin Verification'}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* 3. Payment & Submit */}
            {isOrderCreated && currentStep < 4 && (
                <div className={`p-5 mb-6 bg-white rounded-lg shadow ${currentStep === 3 ? 'border-2 border-blue-400' : ''}`}>
                    <h3 className="flex items-center mb-3 text-lg font-semibold">
                        <span className="flex items-center justify-center w-6 h-6 mr-2 font-bold text-blue-600 bg-blue-100 rounded-full">3</span>
                        Payment & Submit
                    </h3>
                    <div className="p-4 mb-4 border rounded-lg bg-indigo-50">
                        <p className="font-semibold text-gray-800">
                            Total Service Fee Due: <span className="text-2xl font-extrabold text-indigo-700">Rs. {MOCK_PRICE.toFixed(2)}</span>
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                            (Payment is required to officially submit the order to the processing team.)
                        </p>
                    </div>
                    <button
                        onClick={pay}
                        disabled={loading || !areDocsUploaded || isPaymentCompleted}
                        className={`px-6 py-2 text-white font-semibold rounded-lg transition ${loading || !areDocsUploaded ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                        {loading ? 'Processing Payment...' : isPaymentCompleted ? 'Payment Complete' : 'Pay & Submit Order'}
                    </button>
                    {!areDocsUploaded && <p className="mt-2 text-sm text-red-500">Please upload your required documents first.</p>}
                </div>
            )}

            {/* 4. Order Complete */}
            {isPaymentCompleted && currentStep === 4 && order && (
                <div className="p-8 text-center bg-white border-2 border-green-500 rounded-lg shadow-xl">
                    <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500" />
                    <h3 className="mt-3 text-2xl font-bold text-green-700">Order Successfully Submitted!</h3>
                    <p className="mt-2 text-gray-600">Your order **#{order.id}** is now with our processing team. We've notified an expert to begin the work.</p>

                    <div className="flex flex-col justify-center gap-4 mt-6 sm:flex-row">
                        <button
                            onClick={downloadInvoice}
                            disabled={loading}
                            className="flex items-center justify-center px-6 py-2 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            {loading ? 'Downloading...' : 'Download Invoice'}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/user/my-orders')}
                            className="px-6 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Go to My Orders
                        </button>
                    </div>
                </div>
            )}

            {/* Message Area */}
            {message && (
                <div className="p-3 mt-4 text-sm text-white bg-gray-800 rounded">
                    **System Message:** {message}
                </div>
            )}
        </div>
    );
}
