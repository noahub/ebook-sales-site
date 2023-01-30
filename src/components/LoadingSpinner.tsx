import Image from "next/image";

export const LoadingSpinner = () => (
  <Image
    alt="loader"
    src="/loading-spinner.svg"
    height={24}
    width={24}
    className="animate-spin self-center"
  />
);
