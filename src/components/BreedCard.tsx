import React from 'react';
import Link from 'next/link';
import { Breed } from '@/lib/fetchBreeds';

interface BreedCardProps {
    breed: Breed;
    type: 'dog' | 'cat';
}

const BreedCard: React.FC<BreedCardProps> = ({ breed, type }) => {
    return (
        <Link href={`/breed/${type}-${breed.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer p-4">
                {breed.image?.url ? (
                    <img
                        className="w-full h-48 object-cover mb-4"
                        src={breed.image.url}
                        alt={breed.name}
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 mb-4">
                        <span>No Image Available</span>
                    </div>
                )}
                <h2 className="font-bold text-xl mb-2">{breed.name}</h2>
                <p className="text-gray-700">{breed.temperament || 'No description available'}</p>
            </div>
        </Link>
    );
};

export default BreedCard;
