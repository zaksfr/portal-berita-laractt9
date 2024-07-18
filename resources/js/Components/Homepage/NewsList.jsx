import React from "react";

const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div key={i} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={`/storage/images/${data.image}`}
                        alt={data.title}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">
                            {data.category}
                        </div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        );
    });
};

const NoNews = () => {
    return <div> Saat ini tidak ada berita tersedia</div>;
};

const NewsList = ({ news }) => {
    return !news ? <NoNews /> : isNews(news);
};

export default NewsList;
