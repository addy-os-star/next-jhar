"use client";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import AutoScroll from "embla-carousel-auto-scroll";

export default function BackPlayCard() {
    return (
        <section>
            <Carousel
                opts={{
                    loop: true
                }}
                plugins={[
                    AutoScroll({
                        stopOnMouseEnter: true,
                        stopOnInteraction: false,
                        speed: 4,
                        direction: "backward",
                    })

                ]}
                className="w-full max-w-7xl"
            >
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 mb-8">
                        <div className="p-1">
                            <Card className="bg-white">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <div className="w-[300] h-[300] rounded-lg ">
                                        <div>
                                            <Image src={'/276-img.jpg'} alt="img" layout="cover" width={0} height={0} sizes="100vh" className="h-[250px] w-[500px] -mt-11 rounded-t-xl" />
                                        </div>
                                        <div className=" bg-gray-100 text-black border-t h-[131px] w-[300px] rounded-b-lg">
                                            <div className=" flex flex-col ">
                                                <label className=" text-black text-2xl mt-10 ml-8 " >Statue</label>
                                                <label className="text-lg text-gray-500 ml-2">(19th century)</label>
                                            </div>
                                            <div className="flex justify-end mr-4 -mt-10">
                                                <Link href={'https://www.jharcraft.in/product/dokra-art/'} className="border border-gray-400 p-1 rounded-lg hover:bg-gray-200 " ><FaAnglesRight className="w-6 h-6" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    );
}