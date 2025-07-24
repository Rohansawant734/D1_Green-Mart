import React, { useState } from 'react';

const Address = () => {
    const [billingAddress, setBillingAddress] = useState("123, Main Street, Pune");
    const [shippingAddress, setShippingAddress] = useState("456, Shivaji Nagar, Mumbai");

    const [showBillingForm, setShowBillingForm] = useState(false);
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [newBilling, setNewBilling] = useState('');
    const [newShipping, setNewShipping] = useState('');

    const updateBillingAddress = () => {
        if (newBilling.trim() !== '') {
            setBillingAddress(newBilling);
            setNewBilling('');
            setShowBillingForm(false);
        }
    };

    const updateShippingAddress = () => {
        if (newShipping.trim() !== '') {
            setShippingAddress(newShipping);
            setNewShipping('');
            setShowShippingForm(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-white-100 to-green-100 rounded-lg shadow-md space-y-20">

            {/* Billing Address */}
            <div>
                <h2 className="text-3xl  font-bold text-green-600 mb-2">Billing Address</h2>
                <div className="border border-gray-300 p-4 rounded-md">
                    <p >{billingAddress}</p>
                    <button
                        onClick={() => setShowBillingForm(true)}
                        className="mt-3 text-x text-green-600 hover:underline">Edit Billing Address
                    </button>

                    {showBillingForm && (
                        <div className="mt-4 space-y-2">
                            <textarea
                                value={newBilling}
                                onChange={(e) => setNewBilling(e.target.value)}
                                placeholder="Enter new billing address"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={updateBillingAddress}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowBillingForm(false)}
                                    className="bg-gray-300 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Shipping Address */}
            <div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Shipping Address</h2>
                <div className="border border-gray-300 p-4 rounded-md">
                    <p>{shippingAddress}</p>
                    <button
                        onClick={() => setShowShippingForm(true)}
                        className="mt-3 text-x text-green-600 hover:underline"> Edit Shipping Address
                    </button>

                    {showShippingForm && (
                        <div className="mt-4 space-y-2">
                            <textarea
                                value={newShipping}
                                onChange={(e) => setNewShipping(e.target.value)}
                                placeholder="Enter new shipping address"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={updateShippingAddress}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"> Save
                                </button>
                                <button
                                    onClick={() => setShowShippingForm(false)}
                                    className="bg-gray-300 px-4 py-2 rounded-md">Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Address;
