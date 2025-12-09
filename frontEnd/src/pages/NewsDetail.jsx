import { useParams } from "react-router-dom";
import { Heart, MessageSquare, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";



const NewsDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const { id } = useParams();
  const [news, setNews] = useState(null);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/news/${id}`)
    .then((res) => res.json())
    .then((res) => {
      const item = res.data;
      setNews({
        judul: item.title,
        gambar: `https://api.hmtppns.my.id/storage/${item.image}`,
        paragraf: item.content,
        tanggal: item.published_at,
        penulis: "Admin Hima",
      });
    })
    .catch((err) => console.error("Failed to fetch news detail", err));
}, [id]);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim() && commentInput.trim()) {
      const newComment = {
        name: nameInput,
        text: commentInput,
        time: new Date().toLocaleString(),
      };
      setComments([newComment, ...comments]);
      setCommentInput("");
      setNameInput("");
    }
  };
  
  if (!news) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  );
}


  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <div className="top-0">
        <NavBar />
      </div>

      <div className="items-center justify-center max-w-[75%] mx-auto mt-4 md:mt-12 mb-14 opacity-0 animate-[fadeIn_0.5s_forwards]">
        <img
          src={news.gambar}
          alt={news.judul}
          className="w-full max-h-44 md:max-h-66 lg:max-h-88 rounded-lg object-cover mb-6"
        />
        <h1 className="text-base sm:text-lg lg:text-2xl text-center font-bold mb-2">
          {news.judul}
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2">
          <p className="text-xs sm:text-sm text-center font-light text-[#F66951]">
            {news.penulis}
          </p>
          <span className="hidden md:block text-xs sm:text-sm text-center font-extralight mb-4">
            -
          </span>
          <p className="text-xs sm:text-sm text-center font-extralight mb-4">
            {news.tanggal}
          </p>
        </div>

        <p className="text-justify items-center justify-center mx-auto indent-12 max-w-[85%] text-sm md:text-base text-white">
          {news.paragraf}
        </p>
        
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};
export default NewsDetail;
