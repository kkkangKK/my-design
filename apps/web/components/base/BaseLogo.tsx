import { cn } from "@/lib/utils";
import { Link } from "@/utils/i18n/routing";
import Image from "next/image";

interface LogoProps {
  [index: string]: unknown;
  className?: string;
  size?: "small" | "large";
}

const BaseLogo: React.FC<LogoProps> = ({ size = "large", className, ...props }) => {
  return (
    <div className="w-1/3 flex items-center">
      <Link
        href="/"
        className={cn("flex logo flex-shrink-0 items-center gap-3 outline-none", className)}
        {...props}
      >
        <Image
          src="/favicon.png"
          width={size === "small" ? 32 : 40}
          height={size === "small" ? 28 : 32}
          alt="Poster Craft Logo"
        />
        {size === "large" && (
          <button
            className="project-title h-7 pl-5 text-xl"
            data-text="Awesome"
          >
            <span
              className="  actual-text t"
              style={{ color: "#EE6363" }}
            >
              &nbsp;PosterCraft&nbsp;
            </span>
            <span
              aria-hidden="true"
              className="text-red hover-text"
            >
              &nbsp;PosterCraft&nbsp;
            </span>
          </button>
        )}
      </Link>
    </div>
  );
};

export default BaseLogo;
