import { Link } from "react-router-dom";
import { useAuthStore } from "../../store";
export default function Hero({ image, title, link, buttonName }) {
  const { isAuthenticated } = useAuthStore();
  return (
    <section
      className="bg-[#E9E9E9] px-4 py-24"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // This ensures the image covers the entire section
        backgroundPosition: "center", // This centers the image in the section
        backgroundRepeat: "no-repeat", // This prevents the image from repeating
        color: "#fff", // Optional: change text color for better readability on the image
      }}
    >
      <h1 className="text-center">{title}</h1>
      {!isAuthenticated && (
        <div className="text-center py-12">
          <Link to="/register" className="btn bg-white text-[#161616]">
            {buttonName}
          </Link>
        </div>
      )}
    </section>
  );
}
