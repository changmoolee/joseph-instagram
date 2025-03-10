import Image from "next/image";

interface IProfileImageProps {
  src?: string;
}

/**
 * 프로필 이미지 컴포넌트
 */
export default function BigProfileImage({ src }: IProfileImageProps) {
  return (
    <section className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gradient-to-tr from-[#ffe17d] from-30% via-[#eb4141] via-[#fa9137] via-[#ffcd69] to-[#c33cbe] to-95%">
      <div className="relative box-border flex h-[95px] w-[95px] items-center justify-center overflow-hidden rounded-full border-solid bg-white">
        <Image
          src={src ? src : "/images/user.png"}
          alt="profile-image"
          fill
          className="scale-[1.2] object-cover"
        />
      </div>
    </section>
  );
}
