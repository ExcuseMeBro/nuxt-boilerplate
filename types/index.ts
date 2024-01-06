// interfaces here
export interface IProducts {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: {
        id: number;
        name: string;
        image: string;
        creationAt: string;
        updatedAt: string;
    };
}

export interface ICreateProduct {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}