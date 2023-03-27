import React, { useEffect, useState } from "react";
import axios from "axios";
// import NewsList from "../../../assets/NewsList.json";

// console.log(NewsList[0].newsDate);
// const newsList = useEffect(() => {
//   axios
//     .get(
//       "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
//         "country=" +
//         "&item=" +
//         "&StartDate=" +
//         "&EndDate="
//     )
//     .then((response) => console.log(response));
// }, []);

// const news = NewsList[0].map((news, index) => (
//   <div>
//     <li key={index}>{news.newsPress}</li>
//     <li key={index}>{news.newsDate}</li>
//     <li key={index}>{news.newsTitle}</li>
//     <li key={index}>{news.newsContent}</li>
//     <li key={index}>{news.newsLink}</li>
//   </div>
// ));

function News() {
  const url =
    "http://ssafycnt.site:8000/ssafycnt-news-service/api/news?" +
    "country=" +
    "&item=" +
    "&startDate=" +
    "&endDate=";
  // console.log(url);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => setNewsData(response.data));
  }, []);
  // console.log(newsData[0]);

  return (
    <div>
      {newsData.map((news, index) => (
        <a
          // key={index}
          href={news.newsLink}
          target="_blank"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5>{news.newsPress}</h5>
          <h5>{news.newsDate}</h5>
          <h5
            // key={index}
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {news.newsTitle}
          </h5>
          <p
            // key={index}
            className="font-normal text-gray-700 dark:text-gray-400"
          >
            {news.newsContent}
          </p>
        </a>
      ))}
    </div>
  );
}
export default News;
