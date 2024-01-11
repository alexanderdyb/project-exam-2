import { Link } from "react-router-dom";
import Card from "../../components/Card";

export default function Home() {
  return (
    <>
      <section className="bg-[#E9E9E9] px-4 py-24">
        <h1 className="text-center">Book venue now</h1>
        <div className="text-center py-12">
          <Link className="btn">Register</Link>
        </div>
      </section>
      <section className="py-24 px-4">
        <div className="gap-4 grid mx-auto justify-center lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
}
