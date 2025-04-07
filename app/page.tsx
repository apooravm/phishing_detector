import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center text-red-500">
            <span>DETECT PHISHING LINKS NOW!!!</span>
            <div className="flex flex-col gap-4 w-full justify-center items-center">
                <span>
                    Sketchy links in your inbox? Tired of clicking on links that lead to nowhere?
                </span>
                <span>Detect them now!</span>
                <span>Possible through our best in class phishing detection technology.</span>
                <span>
                     (No legal advice provided. But we *will* catch those shady links.)
                </span>
            </div>
        </div>
    );
}