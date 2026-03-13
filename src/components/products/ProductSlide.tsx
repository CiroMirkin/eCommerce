"use client"

import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";

interface Props {
    images: string[]
    title: string
    className?: string
}

export function ProductSlide({ images, title, className }: Props){
    return (
        <div className={className}>
            <Swiper
                slidesPerView={1}
                spaceBetween={6}
                mousewheel={true}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Autoplay, Mousewheel]}
                className="mySwiper rounded"
            >
                {images.map(img => (
                    <SwiperSlide key={img} className="flex justify-center items-center">
                        <Image
                            src={`/products/${img}`}
                            alt={title}
                            width={500}
                            height={500}
                            className="w-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}