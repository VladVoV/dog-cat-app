export interface Breed {
    id: string;
    name: string;
    image?: { url: string };
    reference_image_id?: string;
    description?: string;
    temperament?: string;
    origin?: string;
}

const API_KEY_DOGS = 'YOUR_DOG_API_KEY';
const API_KEY_CATS = 'YOUR_CAT_API_KEY';

export async function fetchBreeds(): Promise<Breed[]> {
    const dogBreedsResponse = await fetch(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
            'x-api-key': API_KEY_DOGS,
        },
    });
    const catBreedsResponse = await fetch(`https://api.thecatapi.com/v1/breeds`, {
        headers: {
            'x-api-key': API_KEY_CATS,
        },
    });
    const dogBreeds = await dogBreedsResponse.json();
    const catBreeds = await catBreedsResponse.json();

    const dogBreedsWithImages = dogBreeds.map((breed: Breed) => ({
        ...breed,
        image: {
            url: breed.reference_image_id
                ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                : '',
        },
    }));
    const catBreedsWithImages = catBreeds.map((breed: Breed) => ({
        ...breed,
        image: {
            url: breed.reference_image_id
                ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
                : '',
        },
    }));

    const allBreeds = [...dogBreedsWithImages, ...catBreedsWithImages];
    allBreeds.sort(() => Math.random() - 0.5);

    return allBreeds;
}

export async function fetchBreedImages(breedId: string, type: 'dog' | 'cat'): Promise<{ url: string }[]> {
    const apiUrl = type === 'dog'
        ? `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=8`
        : `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=8`;

    const response = await fetch(apiUrl, {
        headers: {
            'x-api-key': type === 'dog' ? API_KEY_DOGS : API_KEY_CATS,
        },
    });

    const images = await response.json();
    return images.map((img: { url: string }) => ({ url: img.url }));
}

export async function fetchRandomBreeds(count: number = 10): Promise<Breed[]> {
    const allBreeds = await fetchBreeds();
    return allBreeds.slice(0, count);
}
