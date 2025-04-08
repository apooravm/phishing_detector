"use client"

import React, { useState } from "react";

export default function Home() {
    const checkURL = async (url: string) => {
        set_url_check_state("Checking...");
        const response = await fetch(
            "https://929flmvksc.execute-api.ap-south-1.amazonaws.com/api/phishing-detection",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: url }),
            }
        );
        const data = await response.json();
        set_url_check_state(data.prediction)
        // console.log(data.prediction);
    };

    const [value, setValue] = useState("");
    const [url_check_state, set_url_check_state] = useState("");

    return (
        <div className="flex flex-col justify-between text-red-500 h-screen bg-black">
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
                <div className="flex flex-col gap-2 justify-center items-center w-full">
                    <input
                        type="text"
                        className="text-white border-red-500 w-1/3 px-5 border"
                        placeholder="Your URL"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            checkURL(value);
                        }}>
                        Check
                    </button>
                    <span>{url_check_state}</span>
                </div>
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
