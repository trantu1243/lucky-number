import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../constants';

interface CodeBlockProps {
    code: string;
    sub?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, sub }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "dark",
        });
    };

    return (
        <p
            style={{
                backgroundColor: theme.colors.mainDark,
                fontSize: 13,
                padding: '3px 0',
                fontStyle: 'italic',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word', 
                cursor: 'pointer',
                display: 'inline'
            }}
            onClick={handleCopy}
        >
            <code>{code}</code>
            {sub && <span style={{
                marginLeft: 3
            }}>{sub}</span>}
            <ToastContainer />
        </p>
    );
};

export default CodeBlock;
