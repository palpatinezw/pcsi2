import { useEffect, useState } from "react";
import "./App.css";
import type { ColleDoc, Subj, DocType } from "./types";

const stylemap: { [key in Subj]: string } = {
    math: "bg-green-400",
    phys: "bg-red-400",
    chem: "bg-blue-400",
};
const subjNameMap: { [key in Subj]: string } = {
    math: "math",
    phys: "phys",
    chem: "chi",
};
const docTypeNameMap: { [key in DocType]: string } ={
    colle: "Programmes de colle",
    other: "Documents divers"
}


function App() {
    const [data, setData] = useState<ColleDoc[]>([]);
    const [imptData, setImptData] = useState<ColleDoc[]>([]);

    // 🔍 Filters
    const [subjectFilter, setSubjectFilter] = useState<Subj[]>([]);
    const [typeFilter, setTypeFilter] = useState<DocType[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const apiurl = import.meta.env.VITE_API_URL;
        fetch(apiurl + "get_docs")
            .then((res) => res.json())
            .then((res) => {
                return res.body as ColleDoc[]
            }).then((res) => {
                console.log(res)
                setData(res)
            })
        ;
    }, []);
    useEffect(() => {
        const apiurl = import.meta.env.VITE_API_URL;
        fetch(apiurl + "get_impt_docs")
            .then((res) => res.json())
            .then((res) => {
                return res.body as ColleDoc[]
            }).then((res) => {
                console.log(res)
                setImptData(res)
            })
        ;
    }, []);

    // 🔁 Toggle helpers
    function toggleSubject(subj: Subj) {
        setSubjectFilter((prev) =>
            prev.includes(subj)
                ? prev.filter((s) => s !== subj)
                : [subj]
        );
    }

    function toggleType(type: DocType) {
        setTypeFilter((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [type]
        );
    }

    function clearFilters() {
        setSubjectFilter([]);
        setTypeFilter([]);
        setSearch("");
    }

    // 🧠 Filtering logic
    const filteredData = data.filter((doc) => {
        const matchesSubject =
            subjectFilter.length === 0 || subjectFilter.includes(doc.subject);

        const matchesType =
            typeFilter.length === 0 || typeFilter.includes(doc.type);

        const matchesSearch =
            doc.title.toLowerCase().includes(search.toLowerCase());

        return matchesSubject && matchesType && matchesSearch;
    });

    return (
        <div className="m-auto max-w-7xl">
            <h1 className="text-2xl font-semibold mb-6">Documents</h1>

            {/* IMPORTANT */}
            {imptData.length > 0 && <div className="overflow-x-auto rounded-2xl shadow-sm border border-red-900 border-5 mb-5">
                <table className="w-full border-collapse table-fixed">
                    <tbody className="divide-y">
                        {imptData.map((doc, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition"
                            >
                                {/* Subject */}
                                <td className="px-2 py-4 w-20">
                                    <div
                                        className={`rounded-xl w-full text-center text-white ${stylemap[doc.subject]}`}
                                    >
                                        {doc.subject}
                                    </div>
                                </td>

                                {/* Type indicator */}
                                <td className="py-4 w-4">
                                    {doc.type === "colle" && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="py-4 truncate text-blue-500 hover:text-blue-800 text-left hover:font-bold">
                                    <a
                                        href={doc.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {doc.title}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            {/* 🔍 FILTER BAR */}
            <div className="flex mb-4 h-12">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-3 py-2 flex-1 xl:flex-2"
                />
            </div>
            <div className="flex flex-col gap-2 mb-6 lg:flex-row">
                <div className="flex flex-2 flex-col sm:flex-row gap-2">
                    {/* Subjects */}
                    <div className="p-2 rounded-lg border flex-5">
                        <div className="flex gap-2 flex-wrap">
                            {(["math", "chem"] as Subj[]).map((subj) => (
                                <button
                                    key={subj}
                                    onClick={() => toggleSubject(subj)}
                                    className={`px-3 py-1 rounded-xl text-sm transition flex-1 ${
                                        subjectFilter.includes(subj) || subjectFilter.length === 0
                                            ? `${stylemap[subj]} text-white`
                                            : "bg-gray-200 text-gray-400 border-gray-300"
                                    }`}
                                >
                                    {subjNameMap[subj]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-4 flex-col sm:flex-row gap-2">   
                    {/* Types */}
                    <div className="p-2 rounded-lg border flex-4 gap-2">
                        <div className="flex gap-2 flex-wrap">
                            {(["colle", "other"] as DocType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => toggleType(type)}
                                    className={`px-3 py-1 rounded-full text-xs border transition flex-1 ${
                                        typeFilter.includes(type) || typeFilter.length === 0
                                            ? "bg-gray-800 text-white border-transparent"
                                            : "bg-gray-200 text-gray-400 border-gray-300"
                                    }`}
                                >
                                    {docTypeNameMap[type]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear button */}
                    <div className="flex-1">
                        <button
                            onClick={clearFilters}
                            className="bg-black text-sm text-red-500 hover:text-red-700 underline h-full w-full"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>

            {/* 📄 TABLE */}
            <div className="overflow-x-auto rounded-2xl shadow-sm bg-white">
                <table className="w-full border-collapse table-fixed">
                    <tbody className="divide-y">
                        {filteredData.map((doc, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition"
                            >
                                {/* Subject */}
                                <td className="px-2 py-4 w-20">
                                    <div
                                        className={`rounded-xl w-full text-center text-white ${stylemap[doc.subject]}`}
                                    >
                                        {subjNameMap[doc.subject]}
                                    </div>
                                </td>

                                {/* Type indicator */}
                                <td className="py-4 w-4">
                                    {doc.type === "colle" && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="py-4 truncate text-blue-500 hover:text-blue-800 text-left hover:font-bold">
                                    <a
                                        href={doc.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {doc.title}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* No results */}
            {filteredData.length === 0 && (
                <p className="mt-4 text-gray-500">
                    Aucun document trouvé
                </p>
            )}
        </div>
    );
}

export default App;