import React from 'react';
import { motion } from 'framer-motion';
import { PlusOutlined } from '@ant-design/icons';

const Button = ({ onClick, label, className }) => (
    <button
        onClick={onClick}
        type="button"
        className={`absolute right-6 bottom-2 rounded-md bg-theme-blue px-7 py-2 text-lg font-bold text-white shadow-sm hover:bg-theme-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
    >
        {label}
    </button>
);

const AddButton = ({ onClick, label, className01, className02 }) => (
    <motion.button
        whileTap={{ scale: 0.95 }}
        className={`px-[11px] py-2.5 bg-zinc-600 rounded-[130px] justify-center items-center gap-[5px] inline-flex mt-3 w-[30%] ${className01}`}
        onClick={onClick}
    >
        <div className={`text-white text-[14px] font-bold font-['Nunito'] leading-normal flex items-center justify-center ${className02}`}>
            {label} <PlusOutlined className="ml-2" />
        </div>
    </motion.button>
);

export { Button, AddButton };