import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null); // Tambahkan state untuk gambar

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("image", image); // Tambahkan gambar ke FormData

        Inertia.post("/news", formData);
        setTitle("");
        setDescription("");
        setCategory("");
        setImage(null); // Reset state gambar setelah submit
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Tangkap file gambar yang dipilih
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        return;
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
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
                        <input
                            type="file"
                            className="m-2"
                            onChange={handleImageChange} // Tambahkan event handler untuk input gambar
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full w-96 bg-base-100 shadow-xl m-2"
                                >
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline">
                                                {news.category}
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("edit.news")}
                                                    method="get"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("delete.news")}
                                                    method="post"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p> Kamu belum memiliki berita</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
