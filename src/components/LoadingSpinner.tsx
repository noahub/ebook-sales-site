import Image from "next/image";

export const LoadingSpinner = ({
  size = "default",
}: {
  size?: "default" | "large";
}) => (
  <Image
    alt="loader"
    src="/loading-spinner.svg"
    height={size === "default" ? 20 : 32}
    width={size === "default" ? 20 : 32}
    className="animate-spin self-center"
  />
);
