import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Course = () => {
    const [Book, setBook] = useState([])
    useEffect(() => {
        const Book = () => {
            axios.get("http://localhost:5001/books").then((res) => {
                console.log(res.data);
                setBook(res.data)
            }).catch(() => {
                console.log("errr occurs");
            })

        }
        Book();
    }, [])
    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="mt-10 items-center justify-center text-center ">
                    <h1 className="text-2xl md:text-4xl dark:bg-slate-900 dark:text-white pt-10 pb-5">
                        We're delighted to have you{" "}
                        <span className="text-pink-500"> Here! :)</span>
                    </h1>
                    <p className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, assumenda?
                        Repellendus, iste corrupti? Tempore laudantium repellendus accusamus
                        accusantium sed architecto odio, nisi expedita quas quidem nesciunt debitis
                        dolore non aspernatur praesentium assumenda sint quibusdam, perspiciatis,
                        explicabo sequi fugiat amet animi eos aut. Nobis quisquam reiciendis sunt
                        quis sed magnam consequatur!
                    </p>
                    <Link to="/">
                        <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
                {Book.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}

export default Course
