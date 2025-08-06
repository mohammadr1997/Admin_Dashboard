'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bold } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import usePostBanners from '../myComponents/hooks/usePostBanners';
import SideBar from '../myComponents/SideBar';
import useFetchBanner from '../myComponents/hooks/useFetchBanner';
import { Upload } from 'lucide-react';
import { Context } from '../myComponents/Contextprovider';
import { useContext } from 'react';
import { buttonVariants } from '../myComponents/uploadButton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  CardDescription,
  CardTitle,
  Card,
  CardContent,
  CardFooter,
} from '../Components/ui/Card';
import { Button } from '../../components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';

const types = ['JPEG', 'PNG', 'WebP', 'SVG', 'All'];
interface bannerType {
  imageName: string;
  src: string;
  realDate: string;
  date: string;
  isActive: boolean;
  type: string;
  id:number
}
export default function Page() {
  const [filteredByType, setFilteredByType] = useState<bannerType[] | null>(
    null,
  );
  const { postBanner } = usePostBanners();
  const { data, refetch } = useFetchBanner();
  const [banners, setBanners] = useState<bannerType[]>([]);
  const [typeValue, setTypeValue] = useState('');
  const context = useContext(Context);
  const selectedBanners = context?.selectedBanner;
  const setSelectedBanner = context?.setSelectedBanner;
  const [editBanner, setEditBanner] = useState<bannerType | null>(null);
  useEffect(() => {
    if (setSelectedBanner && data) {
      const updatedData = data.map((banner: bannerType, index: number) => ({
        ...banner,
        isActive: index === 0 ? true : false,
      }));
      setSelectedBanner(updatedData);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [selectedBanners]);

  useEffect(() => {
    if (!selectedBanners || !setSelectedBanner) return;
    let updatedBanners;
    const types=selectedBanners.map((banner)=>banner.type)
    const value = typeValue.toLowerCase();
    if (value === 'all') {
      setFilteredByType(selectedBanners);
    } else {
      updatedBanners = selectedBanners.filter(
        (banner: bannerType) => banner.type === value,
      );
      setFilteredByType(updatedBanners);
    }
    console.log(value)
    console.log(types)
  
  }, [typeValue]);

  const handleSave = (e, editBanner: bannerType) => {
    e.preventDefault();
    if (!selectedBanners || !setSelectedBanner || !editBanner) return;
    const changedBanner = selectedBanners.map((banner: bannerType) =>
      banner.id === editBanner.id ? editBanner : banner,
    );
    setSelectedBanner(changedBanner);
    postBanner(changedBanner);
    setEditBanner(null);
  };
  const handleDelete = (name: string) => {
    if (selectedBanners && setSelectedBanner) {
      const updatedBanners = selectedBanners.filter(
        (banner) => banner.imageName !== name,
      );
      setSelectedBanner(updatedBanners);
      postBanner(updatedBanners);
    }
  };

  const handleToggle = (name: string) => {
    if (!selectedBanners || !setSelectedBanner) return;
    const updatedBanner = selectedBanners.map((banner: bannerType) => ({
      ...banner,
      isActive: name == banner.imageName,
    }));
    setSelectedBanner(updatedBanner);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await compressAndConvertToBase64(file);
    const imageDate = new Date();
    const year = imageDate.toLocaleString('en-us', { year: 'numeric' });
    const day = imageDate.toLocaleString('en-us', { day: '2-digit' });
    const month = imageDate.toLocaleString('en-us', { month: 'long' });
    const dateImg = `${day} ${month} ${year}`;
    const imageType = file.type;
    let type = 'unknown';

    if (imageType && imageType.includes('/')) {
      type = imageType.split('/')[1];
    } else if (file.name.includes('.')) {
      type = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    }
    const id=Date.now();
    const imgDetails = {
      imageName: file.name,
      src: base64,
      date: `${day} ${month}`,
      realDate: dateImg,
      isActive: false,
      type,
      id
    };

    if (setSelectedBanner && imgDetails) {
      setSelectedBanner((prev) => [...prev, imgDetails]);
      postBanner(imgDetails);
    }
  };
  const compressAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  return (
    <section className="relative  overflow-x-hidden  grid grid-cols-1  lg:flex-nowrap  w-full text-white  ">
      <SideBar />

      <div className=" text-white   font-bold  gap-4 lg:justify-between p-10  flex flex-col   bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center  justify-around  ">
        <div className="grid grid-cols-1 gap-8 mx-auto text-md lg:text-2xl ">
          <h2 className="text-xl lg:text-3xl">Slide Banner</h2>
          <p>Hi Mohammad manage and publish you Banner visuialy</p>
        </div>
        <div className="flex  bg-black/10  w-64 lg:w-76 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap mx-auto">
          <input
            onChange={handleChange}
            id="trigger-upload"
            type="file"
            className="hidden"
          />
          <label
            className="cursor-pointer  flex flex-row"
            htmlFor="trigger-upload"
          >
            {' '}
            <Upload className="mt-2" />
            <span
              className={`text-white   font-bold text-center   text-sm lg:text-lg hover:!bg-transparent hover:!text-inherit ${buttonVariants({ variant: 'ghost', size: 'lg' })}`}
            >
              Upload New Banner
            </span>
          </label>
        </div>
        <div className="relative  w-full">
          <Select value={typeValue} onValueChange={setTypeValue}>
            <SelectTrigger className="mx-auto lg:absolute lg:right-4 cursor-pointer flex !text-white text-md md:text-lg bg-black/10  w-64 lg:w-72 backdrop-blur-lg border-1  font-bold  border-blue-100  rounded-3xl px-3 py-2 flex-row gap-2 flex-nowrap">
              <SelectValue className="" placeholder="filter by days" />
              {/* <ChevronDown className='absolute right-4 top-3'/> */}
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                {types.map((type, key: number) => {
                  return (
                    <SelectItem
                      className="cursor-pointer"
                      key={key}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="  text-black text-center grid grid-cols-1 md:flex md:flex-row md:flex-wrap justify-center gap-10 mt-14  bg-[#189DAC] min-h-[44rem]">
          {(filteredByType?.length
  ? filteredByType
  : selectedBanners?.length && typeValue===''
  ? selectedBanners
  : []
).map((banner: bannerType, key: number) => {
                return (
                  <div className="mt-2 mb-2" key={key}>
                    <Card className="w-[350px] mx-auto overflow-hidden">
                      <CardTitle></CardTitle>
                      <CardDescription></CardDescription>
                      <CardContent className="w-[350px] grid grid-cols-1">
                        <Image
                          className="w-[350px]  rounded-3xl mt-5 h-[350px] mx-auto cursor-pointer hover:scale-110 transition-all duration-700"
                          src={banner.src}
                          alt={banner.imageName}
                          width={600}
                          height={600}
                        />
                        <CardTitle className="mt-2 text-left p-4 text-md lg:text-xl font-bold">
                          {' '}
                          {banner.imageName}
                        </CardTitle>
                        <div className="grid grid-cols-3 gap-6 mb-4 mt-1">
                          <span>
                            {' '}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
                                  variant="ghost"
                                >
                                  Preview
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle></DialogTitle>
                                <Image
                                  className="w-[450px]h-[450px]"
                                  alt={banner.imageName}
                                  src={banner.src}
                                  width={800}
                                  height={800}
                                />
                              </DialogContent>
                            </Dialog>
                          </span>
                          <span>
                           <Dialog
  open={!!editBanner}
  onOpenChange={(isOpen) => {
    if (!isOpen) setEditBanner(null);
  }}
>
  <DialogTrigger asChild>
    <Button
      onClick={() => setEditBanner(banner)}
      className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
      variant="ghost"
    >
      Edit
    </Button>
  </DialogTrigger>

  {editBanner && (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <form
        className="text-md lg:text-lg font-bold grid grid-cols-1 gap-6"
        onSubmit={(e) => handleSave(e, editBanner)}
      >
        <div className="flex flex-row flex-nowrap w-full justify-around">
          <label className="mx-4 cursor-pointer mt-2" htmlFor="name">
            Image Name
          </label>
          <input
            required
            value={editBanner.imageName}
            onChange={(e) =>
              setEditBanner({
                ...editBanner,
                imageName: e.target.value,
              })
            }
            placeholder={banner.imageName}
            className="rounded-3xl p-3 border-1 border-gray w-1/2"
            type="text"
            id="name"
          />
        </div>

        <div className="flex flex-row flex-nowrap w-full justify-between">
          <label className="cursor-pointer mt-2" htmlFor="source">
            Upload New Image
          </label>
          <input
            required
            className="w-1/2 rounded-3xl p-3 border-1 border-gray"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const compressedSrc = await compressAndConvertToBase64(file);
              setEditBanner({
                ...editBanner,
                src: compressedSrc,
              });
            }}
            id="source"
            type="file"
          />
        </div>

        <button
          type="submit"
          className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </DialogContent>
  )}
</Dialog>

                          </span>
                          <span>
                            <Button
                              onClick={() => handleDelete(banner.imageName)}
                              className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
                              variant="ghost"
                            >
                              Delete
                            </Button>
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-row justify-between gap-5">
                        <div className="font-bold text-md lg:text-lg justify-start items-start relative  ">
                          {/* <span className='absolute left-4 -top-3 mt-1'>Uploaded at :</span> */}
                          <span className="p-4">{banner.date}</span>
                        </div>
                        <div className="p-4">
                          <Toggle
                            pressed={banner.isActive}
                            onPressedChange={() =>
                              handleToggle(banner.imageName)
                            }
                            aria-label="Toggle Active Status"
                            className=" w-22 border cursor-pointer px-4 py-2 rounded-xl text-sm font-bold data-[state=on]:bg-[#189DAC] data-[state=off]:bg-gray-400 !text-black"
                          >
                            {banner.isActive ? 'Active' : 'Inactive'}
                          </Toggle>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })
            }
        </div>
      </div>
    </section>
  );
}
