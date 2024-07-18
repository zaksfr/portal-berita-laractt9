import NewsList from "@/Components/Homepage/NewsList";
import Navbar from "@/Components/navbar";
import { Link, Head } from "@inertiajs/react";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex flex-col justify-center items-center gap-4 p-4 lg:flex-row lg:flex-wrap lg:items-stretch">
                <NewsList news={props.news.data} />
            </div>
            <div className="flex justify-center item-center">
                <Paginator meta={props.news.meta} />
            </div>
        </div>
    );
}
