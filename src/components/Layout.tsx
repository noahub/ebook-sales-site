import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>;

export const Layout = ({
  children,
  title = "Ebook Sales with Nextjs and Stripe",
  description = "Ebook Sales with Nextjs and Stripe",
  className,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="p-5 flex justify-between">
        <Link href="/" className="text-sm font-bold uppercase hover:underline">
          📖 Ebook Landing Page
        </Link>
        <div className="flex gap-2">
          <Link href="/">
            <Image
              src="/book-open.svg"
              alt="github icon"
              height={20}
              width={20}
            />
          </Link>
          <Link href="https://github.com/noahub/ebook-sales-site">
            <Image src="/github.svg" alt="github icon" height={20} width={20} />
          </Link>
        </div>
      </nav>
      <main className={className}>{children}</main>
    </>
  );
};
