import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] overflow-hidden">
            <Image
                src="/images/Banner/Banner 1.jpg"
                alt="Ambika Surgicals"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
        </section>
    );
}
