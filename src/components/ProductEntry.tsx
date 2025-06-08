import React, { useState } from 'react';
import { Plus, Camera, Upload, Scan } from 'lucide-react';
import { useTransactions } from '../hooks/useData';
import { useAuth } from '../contexts/AuthContext';

const ProductEntry: React.FC = () => {
  const { user } = useAuth();
  const { addTransaction } = useTransactions(user?.id || '');
  const [activeTab, setActiveTab] = useState<'manual' | 'receipt'>('manual');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1,
    category: '',
    brand: '',
    store: ''
  });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');

  const categories = [
    'Fruits', 'Vegetables', 'Meat', 'Dairy', 'Grains', 'Plant-based', 
    'Beverages', 'Snacks', 'Frozen', 'Pantry', 'Other'
  ];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock emissions calculation
    const mockEmissions = Math.random() * 10 + 0.5;
    
    addTransaction({
      userId: user?.id || '',
      productName: formData.productName,
      quantity: formData.quantity,
      category: formData.category,
      brand: formData.brand || undefined,
      emissions: Number(mockEmissions.toFixed(1)),
      date: new Date().toISOString().split('T')[0],
      store: formData.store || 'Unknown Store'
    });

    // Reset form
    setFormData({
      productName: '',
      quantity: 1,
      category: '',
      brand: '',
      store: ''
    });
  };

  const handleReceiptUpload = (file: File) => {
    setUploadStatus('uploading');
    
    // Mock upload process
    setTimeout(() => {
      setUploadStatus('processing');
      setTimeout(() => {
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 2000);
      }, 2000);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleReceiptUpload(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Plus className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Add Purchase</h3>
          <p className="text-sm text-gray-500">Track your shopping impact</p>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'manual'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => setActiveTab('receipt')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'receipt'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Receipt Upload
        </button>
      </div>

      {/* Manual Entry Form */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Organic Bananas"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand (Optional)
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Organic Valley"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store
            </label>
            <input
              type="text"
              value={formData.store}
              onChange={(e) => setFormData(prev => ({ ...prev, store: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Whole Foods"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Calculate Impact & Add
          </button>
        </form>
      )}

      {/* Receipt Upload */}
      {activeTab === 'receipt' && (
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              uploadStatus === 'idle' 
                ? 'border-gray-300 hover:border-green-400' 
                : 'border-green-400'
            }`}
          >
            {uploadStatus === 'idle' && (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your receipt here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports JPG, PNG, PDF files up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleReceiptUpload(e.target.files[0])}
                  className="hidden"
                  id="receipt-upload"
                />
                <label
                  htmlFor="receipt-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Choose File
                </label>
              </>
            )}
            
            {uploadStatus === 'uploading' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Uploading receipt...</p>
              </div>
            )}
            
            {uploadStatus === 'processing' && (
              <div className="text-center">
                <Scan className="w-12 h-12 text-green-600 mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-gray-600">Processing with OCR...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-green-600 h-2 rounded-full w-2/3 animate-pulse"></div>
                </div>
              </div>
            )}
            
            {uploadStatus === 'success' && (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-green-600 font-medium">Receipt processed successfully!</p>
                <p className="text-xs text-gray-500 mt-1">3 products added to your history</p>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Camera className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Take Photo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEntry;