import { cn } from "@/lib/utils";
import Image from "next/image";

interface BannerProps {
  className?: string;
  img_url?: string;
}

const Banner: React.FC<BannerProps> = ({ className, img_url }) => {
  return (
    <div className={cn("w-full h-20", className)}>
      <Image
        className="w-full h-full object-cover"
        src={img_url || "/decorate/banner-1.png"}
        alt="Banner"
        width={0}
        height={0}
        sizes="100vh"
      />
    </div>
  );
};

export default Banner;
