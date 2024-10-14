'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';  

type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
}

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
        try {
            const response = await axiosInstance.get('/books');
            setBooks(response.data.books); 
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-blue-500"><span className="text-lg font-semibold text-white">Loading...</span></div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-5">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-blue-500 text-white">
            <div className="container mx-auto py-10">
                <h1 className="text-5xl font-bold text-center mb-10">List of Books</h1>
                {books.length === 0 ? (
                    <div className="text-center text-gray-100">No books found</div>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <li key={book.id} className="bg-white text-blue-900 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4 text-blue-800">{book.title}</h2>
                                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author}</p>
                                    <p className="text-gray-700 mb-2"><strong>Genre:</strong> {book.genre}</p>
                                    <p className="text-gray-700 mb-2"><strong>Year:</strong> {book.year}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
