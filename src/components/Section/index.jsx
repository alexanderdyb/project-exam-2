export default function Section({ children, background }) {
  const sectionStyle = {
    backgroundColor: background || "#fff", // Default background if none provided
  };
  return (
    <section className="py-12 px-4" style={sectionStyle}>
      {children}
    </section>
  );
}
