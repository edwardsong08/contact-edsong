import Image from "next/image";
import Link from "next/link";

export default function Portrait({ href }: { href: string }) {
  return <Link className="wordmark portrait-wordmark" href={href} aria-label="Edward Song — home">
    <span className="portrait"><Image src="/portrait.png" width={88} height={88} sizes="44px" alt="" /></span>
    <span>Edward Song</span>
  </Link>;
}
