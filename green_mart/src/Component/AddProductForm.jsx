import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        prodName: '',
        description: '',
        price: '',
        offerPrice: '',
        unit: '',
        inStock: true,
        categoryId: '',
        supplierEmail: '', // Use email as unique supplier reference
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [status, setStatus] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('No file chosen');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await axios.get('http://localhost:8080/categories');
                setCategories(catRes.data);

                const supRes = await axios.get('http://localhost:8080/admin/suppliers');
                console.log("Fetched Suppliers:", supRes.data);
                setSuppliers(supRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
            setSelectedFileName(files[0]?.name || 'No file chosen');
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');

        if (!formData.supplierEmail) {
            setStatus('Please select a supplier.');
            return;
        }

        const payload = new FormData();
        payload.append('prodName', formData.prodName);
        payload.append('description', formData.description);
        payload.append('price', formData.price);
        payload.append('offerPrice', formData.offerPrice);
        payload.append('unit', formData.unit);
        payload.append('inStock', formData.inStock);
        payload.append('categoryId', formData.categoryId);
        payload.append('supplierEmail', formData.supplierEmail); // Send email instead of ID
        if (formData.image) {
            payload.append('image', formData.image);
        }

        // Debug
        for (let pair of payload.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        try {
            await axios.post('http://localhost:8080/products', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('Product added successfully!');
            setFormData({
                prodName: '',
                description: '',
                price: '',
                offerPrice: '',
                unit: '',
                inStock: true,
                categoryId: '',
                supplierEmail: '',
                image: null
            });
            setSelectedFileName('No file chosen');
        } catch (err) {
            console.error(err);
            setStatus('Error adding product: ' + err.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <input
                    type="text"
                    name="prodName"
                    value={formData.prodName}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full border px-3 py-2"
                    required
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border px-3 py-2"
                    required
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border px-3 py-2"
                    required
                />

                <input
                    type="number"
                    name="offerPrice"
                    value={formData.offerPrice}
                    onChange={handleChange}
                    placeholder="Offer Price"
                    className="w-full border px-3 py-2"
                />

                <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="Unit (e.g. Kg, Ltr)"
                    className="w-full border px-3 py-2"
                    required
                />

                <label className="block">
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleChange}
                    />
                    <span className="ml-2">In Stock</span>
                </label>

                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full border px-3 py-2"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.catName}
                        </option>
                    ))}
                </select>

                {/* Supplier email select */}
                <Select
                    options={suppliers.map((sup) => ({
                        value: sup.email,
                        label: sup.email
                    }))}
                    value={
                        formData.supplierEmail
                            ? {
                                value: formData.supplierEmail,
                                label: formData.supplierEmail
                            }
                            : null
                    }
                    onChange={(selectedOption) => {
                        setFormData({
                            ...formData,
                            supplierEmail: selectedOption ? selectedOption.value : ''
                        });
                    }}
                    placeholder="Search & select supplier email..."
                    isClearable
                    className="mb-4"
                />

                {/* File upload */}
                <div>
                    <label className="block mb-1 text-sm text-gray-600">Product Image</label>
                    <div className="flex items-center gap-3">
                        <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
                            Choose File
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                        <span className="text-sm text-gray-600">{selectedFileName}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Product
                </button>

                {status && <p className="mt-2 text-sm text-blue-600">{status}</p>}
            </form>
        </div>
    );
};

export default AddProductForm;
