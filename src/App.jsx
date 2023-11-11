import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(true);
    const [symbolAllowed, setSymbolAllowed] = useState(true);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (numberAllowed) char += numbers;
        if (symbolAllowed) char += symbols;

        let pass = "";
        for (let i = 0; i < length; i++) {
            pass += char.charAt(Math.floor(Math.random() * char.length));
        }

        setPassword(pass);
    }, [length, numberAllowed, symbolAllowed, setPassword]);

    const copyPassword = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(function () {
            setCopied(false);
        }, 2500);
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, symbolAllowed, passwordGenerator]);

    return (
        <div className="container grid h-screen px-2 mx-auto font-mono text-center text-white">
            <div className="self-center w-full max-w-lg p-8 mx-auto bg-gray-900 min-w-80 rounded-xl">
                <h2 className="text-3xl font-semibold text-indigo-400">
                    Password Generator
                </h2>
                <div className="flex mt-8">
                    <input
                        type="text"
                        className="w-full px-2 text-lg font-semibold text-black bg-gray-100 rounded-l-lg outline-none selection:bg-indigo-300"
                        value={password}
                        ref={passwordRef}
                        readOnly
                    />
                    <button
                        onClick={copyPassword}
                        className="relative w-10 h-10 bg-indigo-500 rounded-r-lg"
                    >
                        {copied && (
                            <div className="absolute px-2 py-1 bg-gray-600 rounded-lg -left-5 -top-full after:content-[''] after:absolute after:top-full after:left-8 after:border-8 after:border-solid after:border-transparent after:border-t-gray-600">
                                Copied
                            </div>
                        )}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="m-auto bi bi-clipboard2-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
                            <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-wrap gap-5 mt-6">
                    <input
                        type="range"
                        min={6}
                        max={25}
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="flex-grow cursor-pointer accent-indigo-500 hover:accent-indigo-500 active:accent-indigo-700"
                    />
                    <label className="text-lg font-semibold sm:text-right sm:w-32">
                        Length: {length}
                    </label>
                </div>
                <div className="flex flex-wrap justify-between mt-6 text-lg font-semibold gap-x-3">
                    <div className="flex items-center align-middle gap-x-3">
                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            id="numberInput"
                            onChange={() => {
                                setNumberAllowed((prev) => !prev);
                            }}
                            className="w-5 h-5 accent-indigo-500 hover:accent-indigo-500 active:accent-indigo-700"
                        />
                        <label htmlFor="numberInput" className="mt-[2px]">
                            Numbers
                        </label>
                    </div>
                    <div className="flex items-center align-middle gap-x-3">
                        <input
                            type="checkbox"
                            defaultChecked={symbolAllowed}
                            id="characterInput"
                            onChange={() => {
                                setSymbolAllowed((prev) => !prev);
                            }}
                            className="w-5 h-5 accent-indigo-500 hover:accent-indigo-500 active:accent-indigo-700"
                        />
                        <label htmlFor="characterInput" className="mt-[2px]">
                            Symbols
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
