import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title);
    const [description, setDescription] = useState(props.myNews.description);
    const [category, setCategory] = useState(props.myNews.category);

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };
        Inertia.post("/news/update", data)
            .then(() => {
                console.log("Update successful");
            })
            .catch((error) => {
                console.error("Update failed", error);
            });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full w-96 bg-base-100 shadow-xl m-2">
                <div className="p-4 text-2xl">Edit Berita</div>
                <div className="card-body">
                    <input
                        type="text"
                        placeholder="Judul"
                        className="m-2 input input-bordered input-info w-full"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="m-2 input input-bordered input-info w-full"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        className="m-2 input input-bordered input-info w-full"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <button
                        className="btn btn-primary m-2"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
