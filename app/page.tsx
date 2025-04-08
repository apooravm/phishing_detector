"use client";

import { useState } from "react";

const Home = () => {
    const checkURL = async (url: string) => {
        set_url_check_state("");
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
        set_url_check_state(data.prediction);
        console.log(data.prediction);
    };

    const [value, setValue] = useState("");
    const [url_check_state, set_url_check_state] = useState("");

    return (
        <div className="h-screen flex flex-col gap-5 px-8 py-4">
            <div className="flex flex-col gap-4">
                <span className="font-bold text-2xl">
                    Phishing URL detection through classification model
                </span>
                <div className="flex flex-col items-start gap-2">
                    <input
                        type="text"
                        className="border-2 border-gray-400 rounded-lg px-2 py-2 w-full"
                        placeholder="Enter your URL"
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                    <div className="flex flex-row">
                        <button
                            className={`border-0 font-medium border-gray-200 rounded-l-lg cursor-pointer px-2 py-2 bg-pink-300 hover:bg-gray-800 hover:text-white w-40 ${
                                value === "" &&
                                " pointer-events-none opacity-50 "
                            }`}
                            onClick={() => {
                                checkURL(value);
                            }}>
                            {" "}
                            Check
                        </button>
                        <button
                            className={`font-medium rounded-r-lg pointer-events-none px-2 py-2 border-y-2 border-r-2 border-gray-200 bg-gray-200 opacity-50 w-48 ${
                                url_check_state === ""
                                    ? " border-2 bg-gray-200 opacity-50 "
                                    : url_check_state === "Phishing"
                                    ? "border-red-400 bg-red-400 opacity-100"
                                    : "border-green-400 bg-green-400 opacity-100"
                            } `}>
                            {url_check_state === ""
                                ? "Status"
                                : url_check_state + " URL"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-2/3">
                <span>
                    Our model is trained on the{" "}
                    <a
                        className="text-blue-600 font-bold"
                        rel="stylesheet"
                        href="https://www.kaggle.com/datasets/hassaanmustafavi/phishing-urls-dataset">
                        Kaggle Phishing URLs classification dataset
                    </a>{" "}
                    . This dataset comprises of over 40,000 URLs, with 20,000
                    phishing and 20,000 legitimate URLs. We utilise the
                    scikit-learn library to train our model.
                </span>
                <span>
                    After training and testing the model, we have dockerized it
                    into a container and saved it on AWS Elastic Container
                    Registry (ECR). This container is made use of by an AWS
                    Lambda function. The lambda function works with an API
                    gateway, responds to the requests containing the target
                    URLs, and classifies them as phishing or not.
                </span>
                <span>
                    Apart from that, we have deployed this webapp through Vercel to
                    make use of the API.
                </span>
            </div>
        </div>
    );
};

export default Home;
