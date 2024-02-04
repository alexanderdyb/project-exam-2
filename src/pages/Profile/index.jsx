import Section from "../../components/Section";
import useApi from "../../hooks/useApi";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

export default function Profile() {
  const { userName, token, venueManager, isAuthenticated } = useAuthStore();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/profiles/${userName}`;

  const { data } = useApi(url, token);
  console.log(data);
  return (
    <Section>
      {isAuthenticated ? (
        <div className="max-w-[700px] flex-col sm:flex-row mx-auto justify-center">
          <div className="max-w-[100px] h-[100px]">
            {data.avatar ? (
              <img className="object-cover w-full" src="" alt="avatar" />
            ) : (
              <img
                className="object-cover w-full"
                src="./noimage.webp"
                alt="avatars"
              />
            )}
          </div>
          <div>
            <p>Name</p>
            <p>Email</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center py-20">
          <h1 className="mb-8">You are not logged in</h1>
          <p>
            <Link to={"/login"} className="underline">
              Login
            </Link>
            or
            <Link to={"/register"} className="underline">
              Register
            </Link>
          </p>
        </div>
      )}
    </Section>
  );
}
