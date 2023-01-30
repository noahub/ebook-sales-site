import Head from "next/head";
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
      <nav className="p-4">
        <Link href="/" className="text-sm font-bold uppercase hover:underline">
          📖 Ebook Landing Page
        </Link>
      </nav>
      <main className={className}>{children}</main>
    </>
  );
};
