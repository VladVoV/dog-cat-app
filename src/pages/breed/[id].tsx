import { GetServerSideProps } from 'next';
import React from 'react';
import { Breed, fetchBreeds, fetchBreedImages } from '@/lib/fetchBreeds';

interface BreedPageProps {
    breed: Breed;
    images: { url: string }[];
}

const BreedPage: React.FC<BreedPageProps> = ({ breed, images }) => {
    if (!breed) {
        return <div>Breed not found.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className="w-full h-64 object-cover"
                        src={image.url}
                        alt={`${breed.name} image ${index + 1}`}
                    />
                ))}
            </div>
            <p><strong>Origin:</strong> {breed.origin || 'Unknown'}</p>
            <p><strong>Temperament:</strong> {breed.temperament || 'No temperament information available'}</p>
            <p><strong>Description:</strong> {breed.description || 'No description available'}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const breeds = await fetchBreeds();
    const breedId = (params?.id as string)?.split('-')[1];
    const breed = breeds.find((b) => `${b.id}` === breedId);

    let images: { url: string }[] = [];

    if (breed) {
        // @ts-ignore
        const type = params?.id?.startsWith('dog') ? 'dog' : 'cat';
        images = await fetchBreedImages(breed.id, type);
    }

    return {
        props: {
            breed: breed || null,
            images,
        },
    };
};

export default BreedPage;
