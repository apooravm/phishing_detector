import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col justify-between text-red-500 h-screen">
            <div className="flex flex-col gap-4 justify-center items-center">
                <span>DETECT PHISHING LINKS NOW!!!</span>
                <span>
                    Sketchy links in your inbox? Tired of clicking on links that
                    lead to nowhere?
                </span>
                <span>Detect them now!</span>
                <span>
                    Possible through our best in class phishing detection
                    technology.
                </span>
            </div>
            <div className="self-center text-xs py-2">
                <span>
                    (No legal advice provided. But we *will* catch those shady
                    links.)
                </span>
            </div>
        </div>
    );
}
