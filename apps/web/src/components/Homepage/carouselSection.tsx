import Image from 'next/image';

const CarouselSection = ({}) => {
  return (
    <section className="border-b-3 border-primary relative bg-black px-72 pb-12 pt-10 shadow-2xl">
      <div className="relative mx-auto mt-1">
        <Image
          src="/static/images/home/featured_bg.png"
          alt="Featured Tournament"
          width={1000}
          height={1000}
        />
        <div className="bg-foreground absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 border-2 border-white px-2 py-4 text-center text-white">
          <div className="text-4xl font-bold text-black">$10,000 R6 SUMMER SERIES</div>
          <div className="text-2xl text-white">PC - R6 - OPEN QUALIFIERS I</div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
