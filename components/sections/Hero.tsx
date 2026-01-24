import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
            {/* Desktop Banner - Hidden on mobile, shown on md and up */}
            <Image
                src="/images/Banner/3.jpeg"
                alt="Ambika Surgicals"
                fill
                priority
                className="hidden md:block object-cover"
                sizes="100vw"
            />
            {/* Mobile Banner - Shown on mobile, hidden on md and up */}
            <Image
                src="/images/Banner/4.png"
                alt="Ambika Surgicals"
                fill
                priority
                className="block md:hidden object-cover"
                sizes="100vw"
            />
        </section>
    );
}
