import Link from 'next/link';

export default function App() {
    return (
        <div className="bg-blue-500 text-white p-4 w-full h-screen flex justify-center items-center flex-col gap-5">
            <h1 className="text-3xl font-bold uppercase">HELLO WORLD</h1>
            <Link href="books" className="bg-white text-blue-500 py-2 px-4 rounded">
                Go to Books Page
            </Link>
        </div>
    );
}
