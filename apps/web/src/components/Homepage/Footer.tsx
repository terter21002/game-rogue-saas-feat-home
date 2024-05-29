import Image from 'next/image';
// import { Instagram, Twitter, YouTube } from 'react-icons';

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="border-t-2 border-orange-500 pt-5">
        <div className="relative grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="text-center">
            <a href="/">
              <h4 className="text-primary mt-3 py-2 text-xl font-bold">HOME</h4>
            </a>
            <a href="/about">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">ABOUT US</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">TICKETS</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">WIKI</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">FAQS</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">SEARCH</h4>
            </a>
          </div>

          <div className="text-center">
            <a href="/event">
              <h4 className="text-primary mt-3 py-2 text-xl font-bold">EVENTS</h4>
            </a>
            <h4 className="mt-3 py-2 text-xl font-bold text-white">FEATURED</h4>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">LIVE NOW</h4>
            </a>
            <a href="/event/ongoing">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">ONGOING</h4>
            </a>
            <a href="/event/upcoming">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">UPCOMING</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">PAST</h4>
            </a>
          </div>

          <div className="text-center">
            <a href="/shop">
              <h4 className="text-primary mt-3 py-2 text-xl font-bold">SHOP</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">ROGUE MERCH</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">TEAM MERCH</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">CUSTOMIZE</h4>
            </a>
          </div>

          <div className="text-center">
            <a href="/team">
              <h4 className="text-primary mt-3 py-2 text-xl font-bold">MY TEAM</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">MY MATCHES</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">MY PROFILE</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">ARTICLES</h4>
            </a>
            <a href="/sponsor">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">SPONSOR</h4>
            </a>
          </div>

          <div className="text-center">
            <a href="/">
              <h4 className="text-primary mt-3 py-2 text-xl font-bold">ORGANIZER</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">DASHBOARD</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">MATCH CHATS</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">GO LIVE</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">COMMUNITY</h4>
            </a>
            <a href="/">
              <h4 className="mt-3 py-2 text-xl font-bold text-white">CREATE</h4>
            </a>
          </div>
        </div>
        <div className="w-85 mx-30 my-6 flex items-center justify-between">
          <div className="ml-32 flex">
            <Image src="/static/images/home/security.png" alt="" width={60} height={60} />
            <Image src="/static/images/home/lock.png" alt="" width={110} height={60} />
          </div>
          <div className="mr-32 flex">
            <Image src="/static/images/home/paypal.png" alt="" width={150} height={40} />
            <Image src="/static/images/home/card.png" alt="" width={100} height={100} />
          </div>
        </div>
      </div>
      <div className="w-85 border-t-3 mx-32 border-white py-10">
        <div className="flex items-center justify-between">
          <Image src="/static/images/home/gr_letters.png" alt="" width={100} height={100} />
          <div className="items-center justify-center">
            <p className="text-primary-main text-center text-lg font-bold">
              Game Rogue, LLC
              <br />
              2023 &copy;
            </p>
          </div>
          <div className="w-100 flex flex-row-reverse justify-between gap-1">
            <a href="#" className="h-34 bg-foreground rounded-4 flex items-center justify-center">
              <Image
                src="/static/images/home/discord.svg"
                className="h-30"
                alt=""
                width={24}
                height={24}
              />
            </a>
            {/* <a href="#" className="h-34 bg-foreground rounded-4 flex items-center justify-center">
              <YouTube className="text-white" fontSize="large" />
            </a>
            <a
              href="#"
              className="h-34 bg-foreground rounded-4 flex w-40 items-center justify-center"
            >
              <SvgIcon fontSize="large">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                  />
                </svg>
              </SvgIcon>
            </a>
            <a
              href="#"
              className="h-34 bg-foreground rounded-4 flex w-40 items-center justify-center"
            >
              <Twitter className="text-white" fontSize="large" />
            </a>
            <a
              href="#"
              className="h-34 bg-foreground rounded-4 flex w-40 items-center justify-center"
            >
              <Instagram className="text-white" fontSize="large" />
            </a> */}
            <a href="#" className="h-34 bg-foreground rounded-4 flex items-center justify-center">
              <Image
                src="/static/images/home/tiktok.svg"
                className="h-30"
                alt=""
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>

        <div className="w-100 mt-2 text-center">
          <p className="pl-10 text-center text-lg font-bold uppercase text-white">Open Beta 1.0</p>
        </div>
      </div>
    </div>
  );
}
