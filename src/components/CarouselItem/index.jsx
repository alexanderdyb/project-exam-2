export default function CarouselItem({ image, name, onNext, onPrev, length }) {
  console.log(length);
  return (
    <div className="carousel-item relative w-full">
      <img src={image} className="w-full object-cover" alt={name} />
      {length > 1 && (
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button onClick={onPrev} className="btn btn-circle">
            ❮
          </button>
          <button onClick={onNext} className="btn btn-circle">
            ❯
          </button>
        </div>
      )}
    </div>
  );
}
