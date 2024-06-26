import Image from "next/image";

interface IProfileImageProps {
  src?: string;
}

/**
 * 프로필 이미지 컴포넌트
 */
export default function ProfileImage({ src }: IProfileImageProps) {
  return (
    <section className="w-[50px] h-[50px] flex justify-center items-center bg-gradient-to-tr from-[#ffe17d] from-30% via-[#ffcd69] via-[#fa9137] via-[#fa9137] via-[#eb4141] to-[#c33cbe] to-95% rounded-full">
      <div className="relative w-[45px] h-[45px] flex justify-center items-center border-solid rounded-full box-border overflow-hidden bg-white">
        <Image
          src={src ? src : "/images/user.png"}
          alt="profile-image"
          fill
          className="rounded-full object-cover"
        />
      </div>
    </section>
  );
}
