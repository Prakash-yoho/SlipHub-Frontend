// DrawerForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DrawerForm: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={openDrawer}
                className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
            >
                View
            </button>

            {/* AnimatePresence handles mount/unmount animation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl z-50 flex flex-col p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-teal-700">Salary Detail Form</h2>
                                <button
                                    onClick={closeDrawer}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Form */}
                            <form className="flex flex-col gap-4 flex-grow">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <input
                                        type="text"
                                        placeholder="Enter role"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Actual Salary</label>
                                    <input
                                        type="number"
                                        placeholder="Enter actual salary"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Total Salary</label>
                                    <input
                                        type="number"
                                        placeholder="Enter total salary"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="mt-auto">
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
