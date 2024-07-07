import React, { useState } from 'react';

const TextInput = ({ id, name, value, onChange, placeholder }) => (
    <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6 placeholder:text-[16px]"
    />
);

const Textarea = ({ rows, name, id, value, onChange, placeholder, minLength }) => (
    <textarea
        rows={rows}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="block resize-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6 placeholder:text-[16px]"
        placeholder={placeholder}
        minLength={minLength}
    />
);

const Label = ({ htmlFor, children, CustomStyleProp }) => (
    <label
        htmlFor={htmlFor}
        className={`block text-base font-medium leading-5 text-neutral-700 m-1 ${CustomStyleProp}`}
    >
        {children}
    </label>
);

const TagInput = ({ id, tags, onTagsChange, placeholder }) => {
    const [typingStarted, setTypingStarted] = useState(false);

    const handleInputChange = (e) => {
        setTypingStarted(true);
        const inputText = e.target.value;
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputText.trim() !== '') {
                if (tags.length < 10) {
                    onTagsChange([...tags, inputText.trim()]);
                }
            }
            e.target.value = '';
        }
    };

    const handleTagRemove = (tagIndex) => {
        const newTags = [...tags];
        newTags.splice(tagIndex, 1);
        onTagsChange(newTags);
    };

    return (
        <div>
            <div className="mt-1 flex flex-wrap gap-2">

                <input
                    type="text"
                    id={id}
                    placeholder={placeholder}
                    onKeyPress={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-theme-blue sm:text-lg sm:leading-6 placeholder:text-[16px]"
                />
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded-md flex items-center"
                    >
                        <span className="text-sm">{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleTagRemove(index)}
                            className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            {typingStarted && tags.length < 3 && (
                <p className="text-sm text-red-500 mt-1">
                    Please add at least 3 skill tags.
                </p>
            )}
            {typingStarted && tags.length >= 10 && (
                <p className="text-sm text-red-500 mt-1">
                    Maximum of 10 skill tags allowed.
                </p>
            )}
        </div>
    );
};

export { TextInput, Textarea, Label, TagInput }