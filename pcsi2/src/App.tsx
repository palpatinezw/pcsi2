import { useEffect, useState } from "react";
import "./App.css";
import type { ColleDoc, Subj } from "./types";

const stylemap:{[index:string]:string} = {
    "math":"bg-green-400",
    "chem":"bg-blue-400"
}

function App() {
    const [data, setData] = useState<Array<ColleDoc>>([]);

    useEffect(() => {
        const apiurl = import.meta.env.VITE_API_URL
        console.log(apiurl)
        fetch(apiurl + "get_docs").then((res) => {
            console.log(res)
            return res.json()
        }).then((res) => {
            setData(res.body)
        })
    }, []);

    return (
        <div className="m-5">
            <h1 className="text-2xl font-semibold mb-6">Documents</h1>
            <div className="overflow-x-auto rounded-2xl shadow-sm bg-white">
                <table className="w-full max-w-full border-collapse table-fixed">
                    {/* <thead>
                        <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
                            <th className="px-6 py-3 text-center">Title</th>
                            <th className="px-6 py-3 text-center">Link</th>
                        </tr>
                    </thead> */}
                    <tbody className="divide-y">
                        {data.map((doc, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className={`px-2 py-4 min-w-sm text-black w-20`}>
                                    <div className={`rounded-xl w-full ${stylemap[doc.subject]}`}>
                                        {doc.subject}
                                    </div>
                                </td>
                                <td className="py-4 min-w-xs text-black w-4">
                                    {doc.type === 'colle' && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                                </td>
                                <td className="py-4 truncate text-blue-500 hover:text-blue-800 text-left hover:font-bold">
                                    <a
                                        href={doc.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        {doc.title}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
