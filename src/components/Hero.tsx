import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;      
  outerClassName?: string;  // 外距等
  titleClass?: string;      // 文字顏色 class（例如 text-yellow-300）
  subtitleClass?: string;
};

export default function Hero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "hero",
  className = "h-[260px] sm:h-[200px]",
  outerClassName = "",
  titleClass = "text-white",
  subtitleClass = "text-white",
}: Props) {
  return (
    <section className={`relative overflow-hidden rounded-none ${outerClassName}`}>
      <div className={`relative ${className} rounded-none`}>
        <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover rounded-xl overflow-hidden" />
        <div className="absolute inset-0 rounded-xl overflow-hidden" />
        <div className="absolute inset-0 flex items-center">
          <div className="not-prose max-w-2xl ps-3 pe-3 sm:ps-6 sm:pe-6 pb-4 sm:pb-8">
            <h1 className={`text-3xl sm:text-4xl font-bold ${titleClass} drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`mt-2 leading-relaxed font-bold ${subtitleClass} drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
