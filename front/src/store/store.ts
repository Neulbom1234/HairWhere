// src/store/store.ts
import { Comment } from '@/model/Comment';
import {create} from 'zustand';

type PreviewType = {
  dataUrl: string;
  file: File;
};

type StoreState = {
  shop: string;
  setShop: (shop: string) => void;
  shopAddress: string;
  setShopAddress: (shopAddress: string) => void;
  hairName: string;
  setHairName: (hairName: string) => void;
  text: string;
  setText: (text: string) => void;
  preview: PreviewType[];
  setPreview: (value: PreviewType[] | ((prevState: PreviewType[]) => PreviewType[])) => void;
  imgMax: string;
  setImgMax: (imgMax: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  hairLength: string;
  setHairLength: (hairLength: string) => void;
  hairColor: string;
  setHairColor: (hairColor: string) => void;
  photoId: string|undefined;
  setPhotoId: (photoId: string) => void;
  recomment: Comment|undefined;
  setRecomment: (recomment: Comment) => void;
  name: string|undefined;
  setName: (name: string) => void;
  image: File|null;
  setImage: (image: File) => void;
};

export const useStore = create<StoreState>((set) => ({
  shop: '',
  setShop: (shop) => set({ shop }),
  shopAddress: '',
  setShopAddress: (shopAddress) => set({ shopAddress }),
  hairName: '',
  setHairName: (hairName) => set({ hairName }),
  text: '',
  setText: (text) => set({ text }),
  preview: [],
  setPreview: (value) =>
    set((state) => ({
      preview: typeof value === 'function' ? value(state.preview) : value,
    })),
  imgMax: '',
  setImgMax: (imgMax) => set({ imgMax }),
  gender: "",
  setGender: (gender) => set({ gender }),
  hairLength: "",
  setHairLength: (hairLength) => set({ hairLength }),
  hairColor: "",
  setHairColor: (hairColor) => set({ hairColor }),
  photoId: undefined,
  setPhotoId: (photoId) => set({ photoId }),
  recomment: undefined,
  setRecomment: (recomment) => set({ recomment }),
  name: undefined,
  setName: (name) => set({ name }),
  image: null,
  setImage: (image) => set({ image })
}));
