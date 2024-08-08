import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { fetchRandomBreeds, Breed } from '@/lib/fetchBreeds';
import BreedCard from '../components/BreedCard';

interface HomePageProps {
    breeds: Breed[];
}

const HomePage: React.FC<HomePageProps> = ({ breeds }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBreeds, setFilteredBreeds] = useState(breeds);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = breeds.filter(breed =>
            breed.name.toLowerCase().includes(value)
        );
        setFilteredBreeds(filtered);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Random Cat and Dog Breeds</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a breed..."
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBreeds.map((breed, index) => (
                    <BreedCard key={index} breed={breed} type={breed.reference_image_id ? 'dog' : 'cat'} />
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const breeds = await fetchRandomBreeds(10);

    return {
        props: {
            breeds,
        },
    };
};

export default HomePage;
