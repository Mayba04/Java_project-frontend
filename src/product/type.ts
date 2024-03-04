export interface IProductCreate {
    name: string;
    price: number;
    description: string;
    category_id: number;
    files: File[];
  }
  
export interface IUploadedFile {
    originFileObj: File
}

export interface ICategoryName {
    id: number,
    name: string,
}





export interface IProductItem {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    files: string[],
    category: string,
    categoryId: number,
}

export interface IGetProducts {
    list: IProductItem[],
    totalCount: number
}

export interface IProductSearch {
    name?: string,
    description?: string,
    categoryId?: string,
    page: number,
    size: number
}


export interface ISelectItem {
    id: number,
    name: string
}