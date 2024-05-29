import { Tooltip } from '@repo/ui/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';

export default function SponsoredBySection() {
  return (
    <div className="bg-black py-16">
      <h1 className="text-center text-4xl uppercase">SPONSORED BY</h1>
      <div className="mt-16">
        <div className="md:grid-clos-8 grid justify-center gap-4 sm:grid-cols-4 lg:grid-cols-11">
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://twitter.com/AllWorldGaming">
                <Image src="/static/images/sponsors/White.png" alt="" height={80} width={80} />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://twitter.com/SafariLegion">
                <Image
                  src="/static/images/sponsors/lion-logo_Black.png"
                  alt=""
                  height={60}
                  width={60}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://discord.gg/vistaesc">
                <Image
                  src="/static/images/sponsors/VISTA_White.png"
                  alt=""
                  height={60}
                  width={80}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://discord.gg/EGCNvVGFE">
                <Image
                  src="/static/images/sponsors/Ottawa_Warriors_Whitte.png"
                  alt=""
                  height={80}
                  width={80}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://twitter.com/EvilConnections">
                <Image
                  src="/static/images/sponsors/ECE_Logomark_White.png"
                  alt=""
                  height={80}
                  width={100}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://www.redbull.com/us-en/energydrink">
                <Image
                  src="/static/images/sponsors/red-bull-white.png"
                  alt=""
                  height={60}
                  width={140}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://twitter.com/EsportsTempr">
                <Image
                  src="/static/images/sponsors/Tempr Esports Logo.webp"
                  alt=""
                  height={60}
                  width={100}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="#">
                <Image src="/static/images/sponsors/OSG Logo.webp" alt="" height={80} width={80} />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="#">
                <Image
                  src="/static/images/sponsors/Krysos Logo White.webp"
                  alt=""
                  height={80}
                  width={80}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto">
            <Tooltip>
              <Link href="https://twitter.com/ChaosNationGG">
                <Image
                  src="/static/images/sponsors/Chaos Nation II White.webp"
                  alt=""
                  height={80}
                  width={80}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="mx-auto self-center">
            <Tooltip>
              <Link href="https://twitter.com/SilentSinsLLC">
                <Image
                  src="/static/images/sponsors/Silent Sins White.webp"
                  alt=""
                  height={80}
                  width={140}
                />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
