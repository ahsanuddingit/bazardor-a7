import { IMarquee } from "@/types/marquee-links-type";
import Link from "next/link";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const marqueeLinks: IMarquee[] = data;
  const unitBn: Record<string, string> = {
    litre: "লিটার",
    piece: "পিস",
    kg: "কেজি",
    dozen: "ডজন",
  };

  return (
    <div className="border-b border-gray-200 py-1 bg-white ">
      <MarqueeText direction="right" duration={16}>
        <div className="flex gap-5 text-[14px]">
          {marqueeLinks.map((marqueeLink) => (
            <div key={marqueeLink.id} className="flex items-center gap-1">
              <Link href={`/details/${marqueeLink.id}`}>
                <span>{marqueeLink.image}</span>
                {marqueeLink.nameBn}

                <span>
                  {marqueeLink.today.toLocaleString("bn-BD")} টাকা/
                  {unitBn[marqueeLink.unit]}{" "}
                  <span
                    className={
                      marqueeLink.today > marqueeLink.yesterday
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {marqueeLink.today > marqueeLink.yesterday ? "▲" : "▼"}{" "}
                    {(
                      ((marqueeLink.today - marqueeLink.yesterday) /
                        marqueeLink.yesterday) *
                      100
                    ).toLocaleString("bn-BD", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
