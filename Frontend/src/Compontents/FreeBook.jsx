import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from './Card';
import axios from 'axios';

const FreeBook = () => {
    const [Book,setBook]=useState([])
    useEffect(()=>{
        const Book=()=>{
        axios.get("http://localhost:5001/books").then((res)=>{
        const data = res.data.filter((data) => data.category === "Fiction");
            setBook(data)
            console.log("errr occurs");
        })
         
        }
        Book();
    },[])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 md px-4  flex-col md:flex-row my-10'>
                <div>
                    <h1 className='font-semibold text-xl pb-2 '>Free Offered Courses</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, animi recusandae distinctio consectetur voluptatem tempora optio eveniet id ipsam magnam.</p>

                </div>
                <div>
                    <Slider {...settings}>
                         {Book.map((item)=>(
                            <Card item={item} key={item.id}/>
                        ))}
                    </Slider>

                </div>
            </div>
        </>
    )
}

export default FreeBook
