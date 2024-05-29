import { Button } from '@repo/ui/components/nextui/button';
// import { useRouter } from 'next/router';

export default function NextGenerationSection() {
  // const router = useRouter();

  return (
    <section className="relative bg-black py-16 lg:pb-16">
      <div className="mx-auto px-4 lg:px-20">
        <div className="grid items-center gap-0 lg:grid-cols-2 lg:gap-28">
          <div className="lg:border-3 shadow-2xl lg:rounded-lg lg:border-solid lg:border-orange-400 lg:bg-black lg:p-10 lg:text-center">
            <h3 className="mb-8 text-4xl font-bold text-white">THE NEXT GENERATION OF ESPORTS</h3>
            <p className="mb-8 text-lg text-white">
              Are you an event-hoster looking for an all-in-one package to produce pro-league level
              events from structure to productions?
            </p>
            <p className="mb-8 text-lg text-white">
              Or a team looking to build with the most influential tools to win and grow?
            </p>
            <p className="mb-8 text-lg text-white">
              Maybe you're just a player or content creator looking for casual play or professional
              development?
            </p>
            <p className="mb-8 text-lg text-white">
              We have every feature bundled in low-cost packages with the most fundamental features
              always available for free!
            </p>
            <Button
              variant="solid"
              color="primary"
              className="rounded-none px-12 py-7"
              // onClick={() => {
              //   router.push('/plus-plans');
              // }}
            >
              <h4 className="text-3xl font-bold text-white">VIEW NOW</h4>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative size-96">
              <video
                className="absolute inset-0 size-full object-cover"
                poster="/static/images/home/laptop.png"
                loop
                autoPlay
                muted
              >
                <source src="/static/videos/laptop.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
